import { NextRequest } from "next/server";
import { prisma } from "@/lib/api/prisma";
import { getAuthFromRequest, DIRECTOR_EMAIL } from "@/lib/api/auth-utils";
import { ok, badRequest, unauthorized, serverError } from "@/lib/api/route-utils";

export async function PUT(req: NextRequest) {
  try {
    const auth = getAuthFromRequest(req);
    if (!auth || auth.email !== DIRECTOR_EMAIL) return unauthorized();

    const { companyId, active } = await req.json();
    if (!companyId) return badRequest("companyId is required");

    const val = typeof active === "string" ? active : (active ? "yes" : "no");
    await prisma.company.update({ where: { id: companyId }, data: { subscriptionActive: val } });
    return ok({ success: true });
  } catch (error) {
    return serverError(error);
  }
}
