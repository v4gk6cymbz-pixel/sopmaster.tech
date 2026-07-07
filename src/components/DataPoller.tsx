"use client";

import { useEffect, useRef } from "react";
import { useStore } from "@/lib/store";

const POLL_INTERVAL = 10_000;

export default function DataPoller() {
  const session = useStore((s) => s.session);
  const refreshSession = useStore((s) => s.refreshSession);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!session) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
      return;
    }

    refreshSession();
    intervalRef.current = setInterval(refreshSession, POLL_INTERVAL);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [session, refreshSession]);

  return null;
}
