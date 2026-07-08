import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about SOPMaster \u2014 the Operational Governance Infrastructure platform built for consultancy firms. Create, manage and govern SOPs, checklists and documentation for clients across every industry.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About SOPMaster | Operational Governance Infrastructure",
    description:
      "SOPMaster empowers consultancy firms to deliver operational governance. Create SOPs, checklists and documentation packages for clients with enterprise-grade structure.",
    url: "https://sopmaster.tech/about",
  },
  twitter: {
    title: "About SOPMaster | Operational Governance Infrastructure",
    description:
      "SOPMaster empowers consultancy firms to deliver operational governance at scale.",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
