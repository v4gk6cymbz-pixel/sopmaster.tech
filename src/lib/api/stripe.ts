import Stripe from "stripe";

let stripeInstance: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripeInstance) {
    const key = process.env["STRIPE_SECRET_KEY"];
    if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
    stripeInstance = new Stripe(key, { apiVersion: "2025-02-24.acacia" });
  }
  return stripeInstance;
}

export const STRIPE_PRICES: Record<string, string> = {
  solo: process.env["STRIPE_PRICE_SOLO"] || "",
  small: process.env["STRIPE_PRICE_SMALL"] || "",
  medium: process.env["STRIPE_PRICE_MEDIUM"] || "",
  large: process.env["STRIPE_PRICE_LARGE"] || "",
};

export const STRIPE_CREDIT_PRICES: Record<number, string> = {
  100: process.env["STRIPE_PRICE_CREDITS_100"] || "",
  300: process.env["STRIPE_PRICE_CREDITS_300"] || "",
  500: process.env["STRIPE_PRICE_CREDITS_500"] || "",
  1000: process.env["STRIPE_PRICE_CREDITS_1000"] || "",
};
