import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/api/prisma";
import { getAuthFromRequest } from "@/lib/api/auth-utils";
import { unauthorized, badRequest, serverError } from "@/lib/api/route-utils";

export async function POST(req: NextRequest) {
  try {
    const auth = getAuthFromRequest(req);
    if (!auth) return unauthorized();

    const { focus } = await req.json();
    if (!focus || !["sops", "checklists"].includes(focus)) {
      return badRequest("Focus must be 'sops' or 'checklists'");
    }

    const existing = await prisma.company.findUnique({ where: { id: auth.companyId } });
    const hasExistingCredits = existing?.credits != null && existing.credits > 0;
    const credits = hasExistingCredits ? existing.credits : focus === "sops" ? 30 : 10;
    const hasExistingLifetime = existing?.lifetimeCredits != null && existing.lifetimeCredits > 0;
    const lifetimeCredits = hasExistingLifetime ? existing.lifetimeCredits : credits;

    const company = await prisma.company.update({
      where: { id: auth.companyId },
      data: { focus, credits, lifetimeCredits },
    });

    return NextResponse.json({
      company: {
        id: company.id,
        name: company.name,
        email: company.email,
        tier: company.tier,
        subscriptionActive: company.subscriptionActive,
        stripeCustomerId: company.stripeCustomerId || undefined,
        stripeSubscriptionId: company.stripeSubscriptionId || undefined,
        subscriptionStatus: company.subscriptionStatus || undefined,
        cancelAtPeriodEnd: company.cancelAtPeriodEnd ?? false,
        currentPeriodEnd: company.currentPeriodEnd?.toISOString() || undefined,
        credits: company.credits,
        lifetimeCredits: company.lifetimeCredits,
        createdAt: company.createdAt.toISOString(),
        jurisdiction: company.jurisdiction,
        focus: company.focus,
      },
    });
  } catch (error) {
    return serverError(error);
  }
}
