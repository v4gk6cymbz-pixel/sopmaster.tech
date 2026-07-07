import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/api/stripe";
import { getAuthFromRequest } from "@/lib/api/auth-utils";
import { prisma } from "@/lib/api/prisma";
import { unauthorized, badRequest, serverError } from "@/lib/api/route-utils";

export async function POST(req: NextRequest) {
  try {
    const auth = getAuthFromRequest(req);
    if (!auth) return unauthorized();

    const company = await prisma.company.findUnique({ where: { id: auth.companyId } });
    if (!company) return badRequest("Company not found");

    const origin = process.env["NEXT_PUBLIC_APP_URL"];
    if (!origin) return badRequest("NEXT_PUBLIC_APP_URL is not configured");

    const customers = await getStripe().customers.list({
      email: company.email,
      limit: 1,
    });
    let customerId = customers.data[0]?.id;

    if (!customerId) {
      const customer = await getStripe().customers.create({
        email: company.email,
        name: company.name,
        metadata: { companyId: company.id },
      });
      customerId = customer.id;
    }

    const session = await getStripe().billingPortal.sessions.create({
      customer: customerId,
      return_url: `${origin}/settings`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return serverError(error);
  }
}
