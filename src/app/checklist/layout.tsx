import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checklist Studio",
  description:
    "Design operational checklists with SOPMaster\u2019s Structured Workflow Designer. Create compliance-ready checklists with governance controls and sign-off workflows.",
  alternates: { canonical: "/checklist" },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Checklist Studio | SOPMaster",
    description: "Design compliance-ready operational checklists with SOPMaster\u2019s Workflow Designer.",
    url: "https://sopmaster.tech/checklist",
  },
  twitter: {
    title: "Checklist Studio | SOPMaster",
    description: "Design compliance-ready operational checklists with SOPMaster\u2019s Workflow Designer.",
  },
};

export default function ChecklistLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
