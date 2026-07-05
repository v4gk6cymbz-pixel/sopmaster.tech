"use client";

import { useEffect } from "react";
import { useStore } from "@/lib/store";

export default function InitStore() {
  const init = useStore((s) => s.init);

  useEffect(() => {
    init();
  }, [init]);

  return null;
}
