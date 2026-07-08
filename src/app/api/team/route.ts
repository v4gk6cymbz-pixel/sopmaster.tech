import { NextRequest } from "next/server";
import { prisma } from "@/lib/api/prisma";
import { getAuthFromRequest } from "@/lib/api/auth-utils";
import { ok, badRequest, unauthorized, serverError } from "@/lib/api/route-utils";
import { getTierLimits } from "@/lib/utils";

export async function GET(req: NextRequest) {
  try {
    const auth = getAuthFromRequest(req);
    if (!auth) return unauthorized();
    const team = await prisma.teamMember.findMany({ where: { companyId: auth.companyId } });
    return ok(team);
  } catch (error) {
    return serverError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = getAuthFromRequest(req);
    if (!auth) return unauthorized();
    if (!auth.isDirector) return unauthorized();

    const { name, role } = await req.json();
    if (!name?.trim() || !role?.trim()) return badRequest("Name and role are required");

    const company = await prisma.company.findUnique({ where: { id: auth.companyId }, include: { team: true } });
    if (!company) return serverError(new Error("Company not found"));

    const limits = getTierLimits(company.tier);
    if (company.team.length >= limits.teamMemberLimit) {
      return badRequest(`Team member limit reached (${limits.teamMemberLimit}). Upgrade your plan to add more members.`);
    }

    const member = await prisma.teamMember.create({
      data: { name: name.trim(), role: role.trim(), companyId: auth.companyId },
    });
    return ok(member);
  } catch (error) {
    return serverError(error);
  }
}
