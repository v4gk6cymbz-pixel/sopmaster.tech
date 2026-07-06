import { NextRequest } from "next/server";
import { getAuthFromRequest } from "@/lib/api/auth-utils";
import { generateSOPDocument } from "@/lib/sop-generator";
import { ok, badRequest, unauthorized, serverError } from "@/lib/api/route-utils";
import { prisma } from "@/lib/api/prisma";

export async function POST(req: NextRequest) {
  try {
    const auth = getAuthFromRequest(req);
    if (!auth) return unauthorized();

    const body = await req.json();
    const { title, company, systems, headcount, jurisdiction, complexity, industry, sopType, creditCost } = body;

    if (!title?.trim() || !company?.trim()) return badRequest("Title and company are required");

    const cost = typeof creditCost === "number" && creditCost > 0 ? creditCost : 1;

    const companyRecord = await prisma.company.findUnique({ where: { id: auth.companyId } });
    if (!companyRecord) return unauthorized();
    if (companyRecord.credits < cost) return badRequest("Insufficient credits");

    const doc = generateSOPDocument(
      title, company, systems || "", headcount || "10",
      jurisdiction || "UK", complexity || "1-10",
      industry || "ProfessionalServices", sopType || "Operational"
    );

    await prisma.company.update({
      where: { id: auth.companyId },
      data: { credits: { decrement: cost } },
    });

    return ok({ document: doc });
  } catch (error) {
    return serverError(error);
  }
}
