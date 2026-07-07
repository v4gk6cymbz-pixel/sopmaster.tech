import { NextRequest, NextResponse } from "next/server";
import { getStripe, STRIPE_PRICES, STRIPE_CREDIT_PRICES } from "@/lib/api/stripe";
import { getAuthFromRequest } from "@/lib/api/auth-utils";
import { prisma } from "@/lib/api/prisma";
import { unauthorized, badRequest, serverError } from "@/lib/api/route-utils";

export async function POST(req: NextRequest) {
  try {
    const auth = getAuthFromRequest(req);
    if (!auth) return unauthorized();

    const company = await prisma.company.findUnique({ where: { id: auth.companyId } });
    if (!company) return badRequest("Company not found");

    const { type, tier, amount } = await req.json();
    const origin = process.env["NEXT_PUBLIC_APP_URL"];
    if (!origin) return badRequest("NEXT_PUBLIC_APP_URL is not configured");

    if (type === "subscription") {
      const priceId = STRIPE_PRICES[tier];
      if (!priceId) return badRequest("Invalid tier");

      const meta = { companyId: auth.companyId, type: "subscription", tier };
      const session = await getStripe().checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        allow_promotion_codes: true,
        line_items: [{ price: priceId, quantity: 1 }],
        client_reference_id: auth.companyId,
        customer_email: company.email,
        metadata: meta,
        subscription_data: { metadata: meta },
        success_url: `${origin}/?stripe_success=subscription&tier=${tier}&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/settings`,
      });

      return NextResponse.json({ url: session.url });
    }

    if (type === "credits") {
      const priceId = STRIPE_CREDIT_PRICES[amount];
      if (!priceId) return badRequest("Invalid credit amount");

      const session = await getStripe().checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        allow_promotion_codes: true,
        line_items: [{ price: priceId, quantity: 1 }],
        client_reference_id: auth.companyId,
        customer_email: company.email,
        metadata: { companyId: auth.companyId, type: "credits", credits: String(amount) },
        success_url: `${origin}/?stripe_success=credits&amount=${amount}&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/settings`,
      });

      return NextResponse.json({ url: session.url });
    }

    return badRequest("Invalid purchase type");
  } catch (error) {
    return serverError(error);
  }
}
