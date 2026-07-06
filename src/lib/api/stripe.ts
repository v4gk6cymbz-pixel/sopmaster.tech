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

function validatePrice(label: string, id: string | undefined): string {
  if (!id) throw new Error(`Missing Stripe price ID: ${label}. Set it in environment variables.`);
  return id;
}

export const STRIPE_PRICES: Record<string, string> = {
  solo: validatePrice("STRIPE_PRICE_SOLO", process.env["STRIPE_PRICE_SOLO"]),
  small: validatePrice("STRIPE_PRICE_SMALL", process.env["STRIPE_PRICE_SMALL"]),
  medium: validatePrice("STRIPE_PRICE_MEDIUM", process.env["STRIPE_PRICE_MEDIUM"]),
  large: validatePrice("STRIPE_PRICE_LARGE", process.env["STRIPE_PRICE_LARGE"]),
};

export const STRIPE_CREDIT_PRICES: Record<number, string> = {
  100: validatePrice("STRIPE_PRICE_CREDITS_100", process.env["STRIPE_PRICE_CREDITS_100"]),
  300: validatePrice("STRIPE_PRICE_CREDITS_300", process.env["STRIPE_PRICE_CREDITS_300"]),
  500: validatePrice("STRIPE_PRICE_CREDITS_500", process.env["STRIPE_PRICE_CREDITS_500"]),
  1000: validatePrice("STRIPE_PRICE_CREDITS_1000", process.env["STRIPE_PRICE_CREDITS_1000"]),
};
