import { describe, it, expect } from "vitest";
import { generateId, generateHash, generateVerificationHash, getTierLimits, formatDate } from "@/lib/utils";

describe("utils", () => {
  it("generateId produces a string", () => {
    expect(generateId()).toBeTruthy();
    expect(typeof generateId()).toBe("string");
  });

  it("generateHash produces 8-char hex", () => {
    expect(generateHash()).toMatch(/^[A-F0-9]{8}$/);
  });

  it("generateVerificationHash produces 12-char alphanumeric", () => {
    expect(generateVerificationHash()).toMatch(/^[A-Z0-9]{12}$/);
  });

  it("getTierLimits returns correct values for solo", () => {
    const limits = getTierLimits("solo");
    expect(limits.credits).toBe(300);
    expect(limits.price).toBe(400);
    expect(limits.label).toBe("Solo Professional");
  });

  it("getTierLimits returns correct values for large", () => {
    const limits = getTierLimits("large");
    expect(limits.credits).toBe(12000);
    expect(limits.price).toBe(9000);
  });

  it("getTierLimits returns defaults for unknown tier", () => {
    const limits = getTierLimits("nonexistent");
    expect(limits.credits).toBe(10);
    expect(limits.price).toBe(0);
  });

  it("formatDate formats correctly", () => {
    const date = new Date("2026-07-05");
    expect(formatDate(date)).toBe("05 Jul 2026");
  });
});
