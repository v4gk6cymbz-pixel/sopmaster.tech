import { NextRequest } from "next/server";
import { prisma } from "@/lib/api/prisma";
import { getAuthFromRequest } from "@/lib/api/auth-utils";
import { ok, unauthorized, serverError } from "@/lib/api/route-utils";

export async function GET(req: NextRequest) {
  try {
    const auth = getAuthFromRequest(req);
    if (!auth) return unauthorized();

    const company = await prisma.company.findUnique({
      where: { id: auth.companyId },
      include: { team: true, profile: true },
    });
    if (!company) return unauthorized();

    const vault = await prisma.sOP.findMany({ where: { companyId: auth.companyId } });

    return ok({
      session: auth,
      company: {
        id: company.id,
        name: company.name,
        email: company.email,
        tier: company.tier,
        subscriptionActive: company.subscriptionActive,
        credits: company.credits,
        lifetimeCredits: company.lifetimeCredits,
        createdAt: company.createdAt.toISOString(),
        jurisdiction: company.jurisdiction,
        team: company.team,
        profile: company.profile,
      },
      vault,
    });
  } catch (error) {
    return serverError(error);
  }
}
