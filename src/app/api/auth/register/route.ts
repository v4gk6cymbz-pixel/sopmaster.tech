import { NextRequest } from "next/server";
import { prisma } from "@/lib/api/prisma";
import { hashPin, signToken, DIRECTOR_EMAIL } from "@/lib/api/auth-utils";
import { created, badRequest, serverError } from "@/lib/api/route-utils";

const SIZE_TIER_MAP: Record<string, string> = {
  solo: "solo",
  "1-20": "small",
  "21-200": "medium",
  "201+": "large",
};

export async function POST(req: NextRequest) {
  try {
    const { name, email, pin, companySize } = await req.json();
    if (!name?.trim() || !email?.trim()) return badRequest("Name and email are required");

    const existing = await prisma.company.findFirst({
      where: {
        OR: [
          { name: { equals: name.trim() } },
          { email: { equals: email.trim().toLowerCase() } },
        ],
      },
    });
    if (existing) return badRequest("Company name or email already registered");

    const actualPin = email.trim().toLowerCase() === DIRECTOR_EMAIL ? "0000" : pin;
    if (!actualPin || actualPin.length < 4) return badRequest("PIN must be at least 4 characters");

    const tier = SIZE_TIER_MAP[companySize] || "solo";
    const pinHash = hashPin(actualPin);
    const company = await prisma.company.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        pinHash,
        tier,
        credits: 0,
        lifetimeCredits: 0,
        jurisdiction: "UK",
        team: {
          create: {
            name: email.trim().toLowerCase() === DIRECTOR_EMAIL ? "Director" : name.trim(),
            role: "Director",
            email: email.trim().toLowerCase(),
          },
        },
        profile: {
          create: { companySize },
        },
      },
      include: { team: true, profile: true },
    });

    const tokenPayload = {
      companyId: company.id,
      companyName: company.name,
      name: company.email === DIRECTOR_EMAIL ? "Director" : company.name,
      role: "director",
      email: company.email,
      isDirector: company.email === DIRECTOR_EMAIL,
    };
    const token = signToken(tokenPayload);

    await prisma.session.create({
      data: { token, companyId: company.id },
    });

    return created({
      token,
      session: tokenPayload,
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
        team: company.team,
        focus: company.focus,
        profile: company.profile,
      },
    });
  } catch (error) {
    return serverError(error);
  }
}
