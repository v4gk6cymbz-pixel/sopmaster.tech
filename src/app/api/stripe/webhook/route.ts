import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/api/stripe";
import { prisma } from "@/lib/api/prisma";

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
              data: { credits: { increment: credits }, lifetimeCredits: { increment: credits } },
            });
          }
        } else if (session.metadata?.type === "subscription") {
          await prisma.company.update({
            where: { id: companyId },
            data: { subscriptionActive: "yes", tier: session.metadata.tier || "solo" },
          });
        }
        break;
      }

      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        const companyId = subscription.metadata?.companyId;
        if (!companyId) break;
        const active = subscription.status === "active" || subscription.status === "trialing";
        await prisma.company.update({
          where: { id: companyId },
          data: { subscriptionActive: active ? "yes" : "no" },
        });
        break;
      }

      case "invoice.paid": {
        const invoice = event.data.object;
        const subscriptionId = invoice.subscription;
        if (subscriptionId && typeof subscriptionId === "string") {
          const subscription = await getStripe().subscriptions.retrieve(subscriptionId);
          const companyId = subscription.metadata?.companyId;
          if (companyId && subscription.metadata?.type === "credits") {
            const credits = parseInt(subscription.metadata.credits || "0", 10);
            if (credits > 0) {
              await prisma.company.update({
                where: { id: companyId },
                data: { credits: { increment: credits }, lifetimeCredits: { increment: credits } },
              });
            }
          }
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
