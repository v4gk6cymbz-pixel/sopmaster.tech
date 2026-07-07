import { NextRequest } from "next/server";
import { prisma } from "@/lib/api/prisma";
import { verifyPin, signToken, DIRECTOR_EMAIL } from "@/lib/api/auth-utils";
import { ok, badRequest, serverError } from "@/lib/api/route-utils";

export async function POST(req: NextRequest) {
  try {
    const { companyName, pin, memberName, memberRole, director } = await req.json();

    let company;

    if (director) {
      company = await prisma.company.findFirst({
        where: { email: DIRECTOR_EMAIL },
        include: { team: true, profile: true },
      });
      if (!company) return badRequest("Director account not found. Register first.");
    } else if (companyName?.includes("@")) {
      company = await prisma.company.findFirst({
        where: { email: companyName.trim().toLowerCase() },
        include: { team: true, profile: true },
      });
      if (!company) return badRequest("Invalid credentials");
    } else {
      if (!companyName?.trim()) return badRequest("Company name is required");
      const normalized = companyName.trim();
      company = await prisma.company.findFirst({
        where: { name: { equals: normalized } },
        include: { team: true, profile: true },
      });
      if (!company) {
        const rows = await prisma.$queryRawUnsafe<Array<{ id: string }>>(
          `SELECT id FROM Company WHERE LOWER(name) = LOWER(?)`,
          normalized,
        );
        if (rows.length > 0) {
          company = await prisma.company.findFirst({
            where: { id: rows[0].id },
            include: { team: true, profile: true },
          });
        }
      }
      if (!company) return badRequest("Invalid credentials");
    }

    if (!pin || !verifyPin(pin, company.pinHash)) return badRequest("Invalid credentials");

    const isDirector = company.email === DIRECTOR_EMAIL;
    const tokenPayload = {
      companyId: company.id,
      companyName: company.name,
      name: memberName || company.name,
      role: isDirector ? "director" : "member",
      email: memberName ? undefined : company.email,
      isDirector,
    };
    const token = signToken(tokenPayload);
    await prisma.session.create({ data: { token, companyId: company.id } });

    const vault = await prisma.sOP.findMany({ where: { companyId: company.id } });
    return ok({ token, session: tokenPayload, company: formatCompany(company), vault });
  } catch (error) {
    return serverError(error);
  }
}

function formatCompany(c: any) {
  return {
    id: c.id,
    name: c.name,
    email: c.email,
    tier: c.tier,
    subscriptionActive: c.subscriptionActive,
    stripeCustomerId: c.stripeCustomerId || undefined,
    stripeSubscriptionId: c.stripeSubscriptionId || undefined,
    subscriptionStatus: c.subscriptionStatus || undefined,
    cancelAtPeriodEnd: c.cancelAtPeriodEnd ?? false,
    currentPeriodEnd: c.currentPeriodEnd?.toISOString?.() || undefined,
    credits: c.credits,
    lifetimeCredits: c.lifetimeCredits,
    createdAt: c.createdAt?.toISOString?.() || c.createdAt,
    jurisdiction: c.jurisdiction,
    focus: c.focus,
    team: c.team || [],
    profile: c.profile || null,
  };
}
