import { NextRequest } from "next/server";
import { getAuthFromRequest } from "@/lib/api/auth-utils";
import { generateBatchPackage } from "@/lib/batch-sop-generator";
import { ok, badRequest, unauthorized, serverError } from "@/lib/api/route-utils";
import { prisma } from "@/lib/api/prisma";

export async function POST(req: NextRequest) {
  try {
    const auth = getAuthFromRequest(req);
    if (!auth) return unauthorized();

    const body = await req.json();
    const { companyName, industry, jurisdiction, companySize, businessModel, softwareStack, departments, creditCost } = body;

    if (!companyName?.trim() || !departments?.length) return badRequest("Company name and at least one department are required");

    const cost = typeof creditCost === "number" && creditCost > 0 ? creditCost : 1;

    const companyRecord = await prisma.company.findUnique({ where: { id: auth.companyId } });
    if (!companyRecord) return unauthorized();
    if (companyRecord.credits < cost) return badRequest("Insufficient credits");

    const batchInput = {
      companyName: companyName.trim(),
      industry: industry || "ProfessionalServices",
      jurisdiction: jurisdiction || "UK",
      companySize: companySize || "10",
      businessModel: businessModel || "ProfessionalServices",
      softwareStack: softwareStack?.length ? softwareStack : ["internal system"],
      businessGoals: body.businessGoals || "",
      operationalChallenges: body.operationalChallenges || "",
      departments,
    };

    const result = generateBatchPackage(batchInput);

    await prisma.company.update({
      where: { id: auth.companyId },
      data: { credits: { decrement: cost } },
    });

    return ok(result);
  } catch (error) {
    return serverError(error);
  }
}
