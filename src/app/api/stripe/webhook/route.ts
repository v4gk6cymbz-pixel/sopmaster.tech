import { NextRequest, NextResponse } from "next/server";
import { getStripe, TIER_CREDITS } from "@/lib/api/stripe";
import { prisma } from "@/lib/api/prisma";
import type Stripe from "stripe";

function toPeriodEndISO(sub: Stripe.Subscription): string | undefined {
  return sub.current_period_end ? new Date(sub.current_period_end * 1000).toISOString() : undefined;
}

export async function POST(req: NextRequest) {
  try {
    const sig = req.headers.get("stripe-signature");
    const webhookSecret = process.env["STRIPE_WEBHOOK_SECRET"];
    if (!sig || !webhookSecret) {
      return NextResponse.json({ error: "Missing signature or webhook secret" }, { status: 400 });
    }

    const body = await req.text();
    const event = getStripe().webhooks.constructEvent(body, sig, webhookSecret);

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const companyId = session.metadata?.companyId;
        if (!companyId) break;

        if (session.metadata?.type === "credits") {
          const credits = parseInt(session.metadata.credits || "0", 10);
          if (credits > 0) {
            await prisma.company.update({
              where: { id: companyId },
              data: {
                credits: { increment: credits },
                lifetimeCredits: { increment: credits },
                stripeCustomerId: session.customer as string,
              },
            });
          }
        } else if (session.metadata?.type === "subscription") {
          const tier = session.metadata.tier || "solo";
          const initialCredits = TIER_CREDITS[tier] || 0;
          let subStatus: string | undefined;
          let cancelAtEnd = false;
          let periodEnd: string | undefined;

          if (session.subscription && typeof session.subscription === "string") {
            try {
              const sub = await getStripe().subscriptions.retrieve(session.subscription);
              subStatus = sub.status;
              cancelAtEnd = sub.cancel_at_period_end ?? false;
              periodEnd = toPeriodEndISO(sub);
            } catch {
              // fallback — proceed without sub details
            }
          }

          await prisma.company.update({
            where: { id: companyId },
            data: {
              subscriptionActive: "yes",
              tier,
              credits: { increment: initialCredits },
              lifetimeCredits: { increment: initialCredits },
              stripeCustomerId: session.customer as string,
              stripeSubscriptionId: session.subscription as string,
              subscriptionStatus: subStatus || "active",
              cancelAtPeriodEnd: cancelAtEnd,
              currentPeriodEnd: periodEnd ? new Date(periodEnd) : undefined,
            },
          });
        }
        break;
      }

      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const sub = event.data.object;
        const companyId = sub.metadata?.companyId;
        if (!companyId) break;
        const active = sub.status === "active" || sub.status === "trialing";
        await prisma.company.update({
          where: { id: companyId },
          data: {
            subscriptionActive: active ? "yes" : "no",
            subscriptionStatus: sub.status,
            cancelAtPeriodEnd: sub.cancel_at_period_end ?? false,
            currentPeriodEnd: toPeriodEndISO(sub) ? new Date(toPeriodEndISO(sub)!) : undefined,
            stripeSubscriptionId: sub.id,
          },
        });
        break;
      }

      case "invoice.paid": {
        const invoice = event.data.object;
        const subscriptionId = invoice.subscription;
        if (subscriptionId && typeof subscriptionId === "string") {
          const subscription = await getStripe().subscriptions.retrieve(subscriptionId);
          const companyId = subscription.metadata?.companyId;
          if (!companyId) break;

          const baseData: any = {
            currentPeriodEnd: toPeriodEndISO(subscription) ? new Date(toPeriodEndISO(subscription)!) : undefined,
            subscriptionStatus: subscription.status,
            cancelAtPeriodEnd: subscription.cancel_at_period_end ?? false,
          };

          if (subscription.metadata?.type === "credits") {
            const credits = parseInt(subscription.metadata.credits || "0", 10);
            if (credits > 0) {
              baseData.credits = { increment: credits };
              baseData.lifetimeCredits = { increment: credits };
            }
          } else {
            const tier = subscription.metadata?.tier || "solo";
            const monthlyCredits = TIER_CREDITS[tier] || 0;
            if (monthlyCredits > 0) {
              baseData.credits = { increment: monthlyCredits };
              baseData.lifetimeCredits = { increment: monthlyCredits };
            }
          }

          await prisma.company.update({ where: { id: companyId }, data: baseData });
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ received: true, error: "Webhook handler failed" });
  }
}
