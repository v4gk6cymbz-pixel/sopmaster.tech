"use client";

import { useEffect, useRef, useCallback } from "react";
import { useStore } from "@/lib/store";
import { getStripeRedirectResult, clearStripeRedirectParams } from "@/lib/utils";

const POLL_INTERVAL = 3_000;

export default function DataPoller() {
  const session = useStore((s) => s.session);
  const refreshSession = useStore((s) => s.refreshSession);
  const addCredits = useStore((s) => s.addCredits);
  const activateSubscription = useStore((s) => s.activateSubscription);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleStripeRedirect = useCallback(() => {
    if (typeof window === "undefined") return;
    const result = getStripeRedirectResult();
    if (!result) return;
    if (result.type === "credits" && result.amount) {
      addCredits(result.amount);
    } else if (result.type === "subscription" && result.tier) {
      activateSubscription(result.tier);
    }
    refreshSession();
    clearStripeRedirectParams();
  }, [addCredits, activateSubscription, refreshSession]);

  useEffect(() => {
    if (!session) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
      return;
    }

    handleStripeRedirect();
    refreshSession();
    intervalRef.current = setInterval(refreshSession, POLL_INTERVAL);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [session, refreshSession, handleStripeRedirect]);

  return null;
}
