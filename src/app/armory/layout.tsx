import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Document Vault",
  description:
    "Access your SOPMaster Document Vault to store, organise, search and retrieve all your generated SOPs, checklists and documentation in one secure repository.",
  alternates: { canonical: "/armory" },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Document Vault | SOPMaster",
    description: "Store and manage all your SOPs and documentation in SOPMaster\u2019s secure Document Vault.",
    url: "https://sopmaster.tech/armory",
  },
  twitter: {
    title: "Document Vault | SOPMaster",
    description: "Store and manage all your SOPs and documentation in SOPMaster\u2019s secure Document Vault.",
  },
};

export default function ArmoryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
