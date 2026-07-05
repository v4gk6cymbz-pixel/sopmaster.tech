import { NextRequest } from "next/server";
import { prisma } from "@/lib/api/prisma";
import { getAuthFromRequest } from "@/lib/api/auth-utils";
import { ok, badRequest, unauthorized, serverError } from "@/lib/api/route-utils";

export async function GET(req: NextRequest) {
  try {
    const auth = getAuthFromRequest(req);
    if (!auth) return unauthorized();
    const company = await prisma.company.findUnique({
      where: { id: auth.companyId },
      include: { team: true, profile: true },
    });
    if (!company) return unauthorized();
    return ok({
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
    });
  } catch (error) {
    return serverError(error);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const auth = getAuthFromRequest(req);
    if (!auth) return unauthorized();
    if (!auth.isDirector) return unauthorized();

    const body = await req.json();
    const updateData: any = {};

    if (body.jurisdiction) updateData.jurisdiction = body.jurisdiction;

    const company = await prisma.company.update({
      where: { id: auth.companyId },
      data: updateData,
      include: { team: true, profile: true },
    });

    if (body.profile) {
      const existing = await prisma.companyProfile.findUnique({ where: { companyId: auth.companyId } });
      if (existing) {
        await prisma.companyProfile.update({
          where: { companyId: auth.companyId },
          data: {
            industry: body.profile.industry ?? existing.industry,
            companySize: body.profile.companySize ?? existing.companySize,
            departments: body.profile.departments ? JSON.stringify(body.profile.departments) : existing.departments,
            softwareStack: body.profile.softwareStack ? JSON.stringify(body.profile.softwareStack) : existing.softwareStack,
            businessGoals: body.profile.businessGoals ?? existing.businessGoals,
            operationalChallenges: body.profile.operationalChallenges ?? existing.operationalChallenges,
          },
        });
      } else {
        await prisma.companyProfile.create({
          data: {
            companyId: auth.companyId,
            industry: body.profile.industry || null,
            companySize: body.profile.companySize || null,
            departments: body.profile.departments ? JSON.stringify(body.profile.departments) : null,
            softwareStack: body.profile.softwareStack ? JSON.stringify(body.profile.softwareStack) : null,
            businessGoals: body.profile.businessGoals || null,
            operationalChallenges: body.profile.operationalChallenges || null,
          },
        });
      }
    }

    const updated = await prisma.company.findUnique({
      where: { id: auth.companyId },
      include: { team: true, profile: true },
    });
    return ok(updated);
  } catch (error) {
    return serverError(error);
  }
}
