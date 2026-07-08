import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SOP Forge",
  description:
    "Use SOPMaster\u2019s SOP Forge to generate professional Standard Operating Procedures with enterprise-grade structure, compliance mapping and regulatory alignment.",
  alternates: { canonical: "/forge" },
  robots: { index: false, follow: false },
  openGraph: {
    title: "SOP Forge | SOPMaster",
    description: "Generate professional SOPs with SOPMaster\u2019s Document Engineering Studio.",
    url: "https://sopmaster.tech/forge",
  },
  twitter: {
    title: "SOP Forge | SOPMaster",
    description: "Generate professional SOPs with SOPMaster\u2019s Document Engineering Studio.",
  },
};

export default function ForgeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
