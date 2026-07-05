import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET environment variable is required but not set. Set it in .env or deployment environment.");
  }
  return secret;
}

export interface AuthPayload {
  companyId: string;
  companyName: string;
  name: string;
  role: string;
  email?: string;
  isDirector: boolean;
}

export function hashPin(pin: string): string {
  return bcrypt.hashSync(pin, 10);
}

export function verifyPin(pin: string, hash: string): boolean {
  return bcrypt.compareSync(pin, hash);
}

export function signToken(payload: AuthPayload): string {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: "7d" });
}

export function verifyToken(token: string): AuthPayload | null {
  try {
    return jwt.verify(token, getJwtSecret()) as AuthPayload;
  } catch {
    return null;
  }
}

export function getAuthFromRequest(req: NextRequest): AuthPayload | null {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;
  return verifyToken(authHeader.slice(7));
}

export function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export const DIRECTOR_EMAIL = process.env["NEXT_PUBLIC_DIRECTOR_EMAIL"] || "jvaughan@sopmaster.tech";
