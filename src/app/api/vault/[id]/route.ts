import { NextRequest } from "next/server";
import { prisma } from "@/lib/api/prisma";
import { getAuthFromRequest } from "@/lib/api/auth-utils";
import { ok, unauthorized, notFound, serverError } from "@/lib/api/route-utils";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = getAuthFromRequest(req);
    if (!auth) return unauthorized();

    const { id } = await params;
    const sop = await prisma.sOP.findFirst({ where: { id, companyId: auth.companyId } });
    if (!sop) return notFound("SOP not found");

    const body = await req.json();
    const updateData: any = {};
    if (body.status) updateData.status = body.status;
    if (body.favorite !== undefined) updateData.favorite = body.favorite;

    const updated = await prisma.sOP.update({ where: { id }, data: updateData });
    return ok(updated);
  } catch (error) {
    return serverError(error);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = getAuthFromRequest(req);
    if (!auth) return unauthorized();

    const { id } = await params;
    const sop = await prisma.sOP.findFirst({ where: { id, companyId: auth.companyId } });
    if (!sop) return notFound("SOP not found");

    await prisma.sOP.delete({ where: { id } });
    return ok({ success: true });
  } catch (error) {
    return serverError(error);
  }
}
