import { NextRequest } from "next/server";
import { prisma } from "@/lib/api/prisma";
import { getAuthFromRequest } from "@/lib/api/auth-utils";
import { ok, serverError } from "@/lib/api/route-utils";

export async function POST(req: NextRequest) {
  try {
    const auth = getAuthFromRequest(req);
    if (!auth) return ok({ success: true });
    await prisma.session.deleteMany({ where: { companyId: auth.companyId } });
    return ok({ success: true });
  } catch (error) {
    return serverError(error);
  }
}
