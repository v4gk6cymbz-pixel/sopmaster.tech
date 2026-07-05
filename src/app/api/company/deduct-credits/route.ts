import { NextRequest } from "next/server";
import { prisma } from "@/lib/api/prisma";
import { getAuthFromRequest } from "@/lib/api/auth-utils";
import { ok, badRequest, unauthorized, serverError } from "@/lib/api/route-utils";

export async function POST(req: NextRequest) {
  try {
    const auth = getAuthFromRequest(req);
    if (!auth) return unauthorized();

    const { amount } = await req.json();
    if (!amount || typeof amount !== "number" || amount < 1) {
      return badRequest("Invalid credit amount");
    }

    const company = await prisma.company.findUnique({ where: { id: auth.companyId } });
    if (!company) return unauthorized();
    if (company.credits < amount) return badRequest("Insufficient credits");

    const updated = await prisma.company.update({
      where: { id: auth.companyId },
      data: { credits: { decrement: amount } },
    });

    return ok({ credits: updated.credits });
  } catch (error) {
    return serverError(error);
  }
}
