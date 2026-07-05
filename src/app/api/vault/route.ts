import { NextRequest } from "next/server";
import { prisma } from "@/lib/api/prisma";
import { getAuthFromRequest } from "@/lib/api/auth-utils";
import { ok, badRequest, unauthorized, serverError } from "@/lib/api/route-utils";

export async function GET(req: NextRequest) {
  try {
    const auth = getAuthFromRequest(req);
    if (!auth) return unauthorized();
    const vault = await prisma.sOP.findMany({
      where: { companyId: auth.companyId },
      orderBy: { dateCreated: "desc" },
    });
    return ok(vault);
  } catch (error) {
    return serverError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = getAuthFromRequest(req);
    if (!auth) return unauthorized();

    const body = await req.json();
    if (!body.id || !body.title) return badRequest("id and title are required");

    const sop = await prisma.sOP.create({
      data: {
        id: body.id,
        title: body.title,
        companyName: body.company || auth.companyName,
        systems: body.systems || "",
        headcount: body.headcount || "",
        jurisdiction: body.jurisdiction || "UK",
        complexity: body.complexity || "1-10",
        hash: body.hash || "",
        verificationHash: body.verificationHash || "",
        dateCreated: body.dateCreated || new Date().toISOString(),
        dateCategorized: body.dateCategorized || body.dateCreated || new Date().toISOString(),
        lastModified: body.lastModified || body.dateCreated || new Date().toISOString(),
        version: body.version || 1,
        status: body.status || "active",
        createdBy: body.createdBy || auth.name,
        industry: body.industry || null,
        department: body.department || null,
        favorite: body.favorite || false,
        sopType: body.sopType || null,
        companyId: auth.companyId,
      },
    });
    return ok(sop);
  } catch (error) {
    return serverError(error);
  }
}
