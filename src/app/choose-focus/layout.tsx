import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Getting Started",
  description:
    "Choose your focus on SOPMaster \u2014 select between Standard Operating Procedures or operational checklists to begin building your Operational Governance Infrastructure.",
  alternates: { canonical: "/choose-focus" },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Getting Started | SOPMaster",
    description: "Choose your focus on SOPMaster and start building operational governance documentation.",
    url: "https://sopmaster.tech/choose-focus",
  },
  twitter: {
    title: "Getting Started | SOPMaster",
    description: "Choose your focus on SOPMaster and start building operational governance documentation.",
  },
};

export default function ChooseFocusLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
