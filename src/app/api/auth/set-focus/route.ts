import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/api/prisma";
import { getAuthFromRequest } from "@/lib/api/auth-utils";
import { unauthorized, badRequest, serverError } from "@/lib/api/route-utils";

export async function POST(req: NextRequest) {
  try {
    const auth = getAuthFromRequest(req);
    if (!auth) return unauthorized();

    const { focus } = await req.json();
    if (!focus || !["sops", "checklists"].includes(focus)) {
      return badRequest("Focus must be 'sops' or 'checklists'");
    }

    const credits = focus === "sops" ? 100 : 10;

    const company = await prisma.company.update({
      where: { id: auth.companyId },
      data: { focus, credits, lifetimeCredits: credits },
    });

    return NextResponse.json({
      company: {
        id: company.id,
        name: company.name,
        email: company.email,
        tier: company.tier,
        subscriptionActive: company.subscriptionActive,
        credits: company.credits,
        lifetimeCredits: company.lifetimeCredits,
        createdAt: company.createdAt.toISOString(),
        jurisdiction: company.jurisdiction,
        focus: company.focus,
      },
    });
  } catch (error) {
    return serverError(error);
  }
}
