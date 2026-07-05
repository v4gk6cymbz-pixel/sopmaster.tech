import { NextRequest } from "next/server";
import { prisma } from "@/lib/api/prisma";
import { getAuthFromRequest, DIRECTOR_EMAIL } from "@/lib/api/auth-utils";
import { ok, badRequest, unauthorized, serverError } from "@/lib/api/route-utils";

export async function PUT(req: NextRequest) {
  try {
    const auth = getAuthFromRequest(req);
    if (!auth || auth.email !== DIRECTOR_EMAIL) return unauthorized();

    const { companyId, credits } = await req.json();
    if (!companyId || credits === undefined) return badRequest("companyId and credits are required");

    const company = await prisma.company.findUnique({ where: { id: companyId } });
    if (!company) return badRequest("Company not found");

    const diff = Math.max(0, credits - company.credits);
    await prisma.company.update({
      where: { id: companyId },
      data: { credits, lifetimeCredits: company.lifetimeCredits + diff },
    });
    return ok({ success: true });
  } catch (error) {
    return serverError(error);
  }
}
