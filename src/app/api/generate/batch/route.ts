import { NextRequest } from "next/server";
import { getAuthFromRequest } from "@/lib/api/auth-utils";
import { generateBatchPackage } from "@/lib/batch-sop-generator";
import { ok, badRequest, unauthorized, serverError } from "@/lib/api/route-utils";

export async function POST(req: NextRequest) {
  try {
    const auth = getAuthFromRequest(req);
    if (!auth) return unauthorized();

    const body = await req.json();
    const { companyName, industry, jurisdiction, companySize, businessModel, softwareStack, departments } = body;

    if (!companyName?.trim() || !departments?.length) return badRequest("Company name and at least one department are required");

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
    return ok(result);
  } catch (error) {
    return serverError(error);
  }
}
