import { NextRequest } from "next/server";
import { getAuthFromRequest } from "@/lib/api/auth-utils";
import { generateSOPDocument } from "@/lib/sop-generator";
import { ok, badRequest, unauthorized, serverError } from "@/lib/api/route-utils";

export async function POST(req: NextRequest) {
  try {
    const auth = getAuthFromRequest(req);
    if (!auth) return unauthorized();

    const body = await req.json();
    const { title, company, systems, headcount, jurisdiction, complexity, industry, sopType } = body;

    if (!title?.trim() || !company?.trim()) return badRequest("Title and company are required");

    const doc = generateSOPDocument(
      title, company, systems || "", headcount || "10",
      jurisdiction || "UK", complexity || "1-10",
      industry || "ProfessionalServices", sopType || "Operational"
    );

    return ok({ document: doc });
  } catch (error) {
    return serverError(error);
  }
}
