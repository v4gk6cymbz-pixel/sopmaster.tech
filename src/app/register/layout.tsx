import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description:
    "Create your SOPMaster account and deploy Operational Governance Infrastructure for your consultancy firm. Choose your plan and start building SOPs, checklists and documentation.",
  alternates: { canonical: "/register" },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Register | SOPMaster",
    description: "Create your SOPMaster account and deploy Operational Governance Infrastructure.",
    url: "https://sopmaster.tech/register",
  },
  twitter: {
    title: "Register | SOPMaster",
    description: "Create your SOPMaster account and deploy Operational Governance Infrastructure.",
  },
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
