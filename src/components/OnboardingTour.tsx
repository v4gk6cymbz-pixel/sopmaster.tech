"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";

const STEPS = [
  {
    title: "Welcome to the platform!",
    subtitle: "Your workspace is ready",
    description:
      "You've been given free credits to get started. Head to the Forge to build SOPs (10 credits each) or the Checklist Studio to build checklists (1 credit each). Your credits are displayed in the top bar.",
    emoji: "\u2728",
  },
  {
    title: "SOP Forge",
    subtitle: "Build operational documents",
    description:
      "Use the Forge to generate complete SOPs with governance, quality controls, and compliance triggers. Each SOP costs 10 credits. You can build up to 3 SOPs with your free credits.",
    emoji: "\uD83D\uDCC4",
  },
  {
    title: "Checklist Studio",
    subtitle: "Quick procedural checklists",
    description:
      "Generate professional checklists for onboarding, audits, inspections, and recurring tasks. Each checklist costs 1 credit. You can build up to 10 with your free credits.",
    emoji: "\u2714\uFE0F",
  },
  {
    title: "Batch Generation",
    subtitle: "Scale across departments",
    description:
      "Generate a full Operational Infrastructure Package across multiple departments at once. Batch generation costs 30 credits per department.",
    emoji: "\u26A1",
  },
  {
    title: "Document Vault",
    subtitle: "Your entire library in one place",
    description:
      "All generated SOPs and checklists are stored in your Vault. Search, filter, favourite, and download anytime. Everything is audit-ready from the moment it's generated.",
    emoji: "\uD83D\uDEE1\uFE0F",
  },
];

export default function OnboardingTour() {
  const showTour = useStore((s) => s.showTour);
  const dismissTour = useStore((s) => s.dismissTour);
  const [step, setStep] = useState(0);

  if (!showTour) return null;

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  const handleNext = () => {
    if (isLast) {
      dismissTour();
    } else {
      setStep((s) => s + 1);
    }
  };

  const handleSkip = () => {
    dismissTour();
    setStep(0);
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "rgba(15, 23, 42, 0.85)",
      backdropFilter: "blur(4px)",
      padding: "24px",
    }}>
      <div style={{
        background: "#1E293B",
        border: "1px solid #334155",
        borderRadius: "16px",
        maxWidth: "480px",
        width: "100%",
        padding: "40px 32px 28px",
        textAlign: "center",
        boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
      }}>
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>{current.emoji}</div>
        <h2 style={{
          fontSize: "22px", fontWeight: 700, color: "#F1F5F9",
          margin: "0 0 6px", lineHeight: 1.2,
        }}>
          {current.title}
        </h2>
        <p style={{
          fontSize: "13px", color: "#94A3B8", margin: "0 0 4px",
          fontWeight: 500,
        }}>
          {current.subtitle}
        </p>
        <p style={{
          fontSize: "14px", color: "#CBD5E1", margin: "12px 0 0",
          lineHeight: 1.5,
        }}>
          {current.description}
        </p>

        {/* Step dots */}
        <div style={{
          display: "flex", justifyContent: "center", gap: "8px",
          marginTop: "28px",
        }}>
          {STEPS.map((_, i) => (
            <div key={i} style={{
              width: "8px", height: "8px", borderRadius: "50%",
              background: i === step ? "#3B82F6" : "#334155",
              transition: "background 0.2s",
            }} />
          ))}
        </div>

        {/* Buttons */}
        <div style={{
          display: "flex", gap: "12px", marginTop: "24px",
          justifyContent: "center",
        }}>
          {!isLast && (
            <button
              onClick={handleSkip}
              style={{
                padding: "10px 20px", fontSize: "13px", fontWeight: 500,
                color: "#64748B", background: "none", border: "1px solid #334155",
                borderRadius: "8px", cursor: "pointer",
              }}
            >
              Skip tour
            </button>
          )}
          <button
            onClick={handleNext}
            style={{
              padding: "10px 24px", fontSize: "13px", fontWeight: 600,
              color: "#fff", background: "#3B82F6", border: "none",
              borderRadius: "8px", cursor: "pointer",
            }}
          >
            {isLast ? "Get started" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
