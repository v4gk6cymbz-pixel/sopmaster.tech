"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";

const STEPS = [
  {
    title: "All systems are open!",
    subtitle: "Your subscription is active and all features are unlocked.",
    description:
      "You now have full access to SOPMaster. Generate operational documents, build checklists, run batch operations, and manage your vault.",
    emoji: "\u2728",
  },
  {
    title: "Operational Documents",
    subtitle: "Build single SOPs with the SOLO SOP BUILDER",
    description:
      "Use the Forge to generate complete operational documents with governance, quality controls, and compliance triggers.",
    emoji: "\uD83D\uDCC4",
  },
  {
    title: "Checklists",
    subtitle: "Quick procedural checklists in seconds",
    description:
      "Generate professional checklists for onboarding, audits, inspections, and recurring tasks.",
    emoji: "\u2714\uFE0F",
  },
  {
    title: "Batch Generation",
    subtitle: "Scale across departments",
    description:
      "Generate a full Operational Infrastructure Package across multiple departments at once. 30 credits per department.",
    emoji: "\u26A1",
  },
  {
    title: "Document Vault",
    subtitle: "Your entire library in one place",
    description:
      "All generated SOPs and checklists are stored in your Vault. Search, filter, favourite, and download anytime.",
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
      background: "rgba(6, 13, 26, 0.88)",
      backdropFilter: "blur(8px)",
      padding: "24px",
    }}>
      <div style={{
        background: "rgba(30, 41, 59, 0.9)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "16px",
        maxWidth: "480px",
        width: "100%",
        padding: "44px 36px 32px",
        textAlign: "center",
        boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
        backdropFilter: "blur(20px)",
      }}>
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>{current.emoji}</div>
        <h2 style={{
          fontSize: "22px", fontWeight: 600, color: "#F8FAFC",
          margin: "0 0 6px", lineHeight: 1.2, letterSpacing: "-0.02em",
        }}>
          {current.title}
        </h2>
        <p style={{
          fontSize: "14px", color: "#94A3B8", margin: "0 0 4px",
          fontWeight: 500,
        }}>
          {current.subtitle}
        </p>
        <p style={{
          fontSize: "14px", color: "#CBD5E1", margin: "14px 0 0",
          lineHeight: 1.6,
        }}>
          {current.description}
        </p>

        {/* Step dots */}
        <div style={{
          display: "flex", justifyContent: "center", gap: "8px",
          marginTop: "32px",
        }}>
          {STEPS.map((_, i) => (
            <div key={i} style={{
              width: "8px", height: "8px", borderRadius: "50%",
              background: i === step ? "#3B82F6" : "rgba(255,255,255,0.12)",
              transition: "background 0.2s",
            }} />
          ))}
        </div>

        {/* Buttons */}
        <div style={{
          display: "flex", gap: "12px", marginTop: "28px",
          justifyContent: "center",
        }}>
          {!isLast && (
            <button
              onClick={handleSkip}
              style={{
                padding: "10px 20px", fontSize: "13px", fontWeight: 500,
                color: "#64748B", background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "8px", cursor: "pointer", fontFamily: "inherit",
                transition: "all 0.2s ease",
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
              borderRadius: "8px", cursor: "pointer", fontFamily: "inherit",
            }}
          >
            {isLast ? "Get started" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
