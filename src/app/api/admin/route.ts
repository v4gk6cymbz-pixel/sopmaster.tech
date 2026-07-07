import { NextRequest } from "next/server";
import { prisma } from "@/lib/api/prisma";
import { getAuthFromRequest, DIRECTOR_EMAIL } from "@/lib/api/auth-utils";
import { ok, unauthorized, serverError } from "@/lib/api/route-utils";

export async function GET(req: NextRequest) {
  try {
    const auth = getAuthFromRequest(req);
    if (!auth || auth.email !== DIRECTOR_EMAIL) return unauthorized();

    const companies = await prisma.company.findMany({
      include: { team: true, profile: true, _count: { select: { vault: true } } },
      orderBy: { createdAt: "desc" },
    });

    return ok(
      companies.map((c) => ({
        id: c.id,
        name: c.name,
        email: c.email,
        tier: c.tier,
        subscriptionActive: c.subscriptionActive,
        stripeCustomerId: c.stripeCustomerId || undefined,
        stripeSubscriptionId: c.stripeSubscriptionId || undefined,
        subscriptionStatus: c.subscriptionStatus || undefined,
        cancelAtPeriodEnd: c.cancelAtPeriodEnd ?? false,
        currentPeriodEnd: c.currentPeriodEnd?.toISOString() || undefined,
        credits: c.credits,
        lifetimeCredits: c.lifetimeCredits,
        createdAt: c.createdAt.toISOString(),
        jurisdiction: c.jurisdiction,
        team: c.team,
        sopCount: c._count.vault,
      }))
    );
  } catch (error) {
    return serverError(error);
  }
}
