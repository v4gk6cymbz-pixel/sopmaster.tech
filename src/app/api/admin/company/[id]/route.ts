import { NextRequest } from "next/server";
import { prisma } from "@/lib/api/prisma";
import { getAuthFromRequest, DIRECTOR_EMAIL } from "@/lib/api/auth-utils";
import { ok, unauthorized, notFound, serverError } from "@/lib/api/route-utils";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = getAuthFromRequest(req);
    if (!auth || auth.email !== DIRECTOR_EMAIL) return unauthorized();

    const { id } = await params;
    const company = await prisma.company.findUnique({ where: { id } });
    if (!company) return notFound("Company not found");

    await prisma.company.delete({ where: { id } });
    return ok({ success: true });
  } catch (error) {
    return serverError(error);
  }
}
