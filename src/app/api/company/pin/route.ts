import { NextRequest } from "next/server";
import { prisma } from "@/lib/api/prisma";
import { getAuthFromRequest, hashPin } from "@/lib/api/auth-utils";
import { ok, badRequest, unauthorized, serverError } from "@/lib/api/route-utils";

export async function PUT(req: NextRequest) {
  try {
    const auth = getAuthFromRequest(req);
    if (!auth) return unauthorized();
    if (!auth.isDirector) return unauthorized();

    const { pin } = await req.json();
    if (!pin || pin.length < 4) return badRequest("PIN must be at least 4 characters");

    const pinHash = hashPin(pin);
    await prisma.company.update({ where: { id: auth.companyId }, data: { pinHash } });
    return ok({ success: true });
  } catch (error) {
    return serverError(error);
  }
}
