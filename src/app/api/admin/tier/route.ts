import { NextRequest } from "next/server";
import { prisma } from "@/lib/api/prisma";
import { getAuthFromRequest, DIRECTOR_EMAIL } from "@/lib/api/auth-utils";
import { ok, badRequest, unauthorized, serverError } from "@/lib/api/route-utils";

export async function PUT(req: NextRequest) {
  try {
    const auth = getAuthFromRequest(req);
    if (!auth || auth.email !== DIRECTOR_EMAIL) return unauthorized();

    const { companyId, tier } = await req.json();
    if (!companyId || !tier) return badRequest("companyId and tier are required");

    await prisma.company.update({ where: { id: companyId }, data: { tier } });
    return ok({ success: true });
  } catch (error) {
    return serverError(error);
  }
}
