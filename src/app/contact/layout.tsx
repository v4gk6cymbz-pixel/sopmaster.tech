import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the SOPMaster team. We\u2019re here to help with account setup, billing, platform support and general enquiries about our Operational Governance Infrastructure platform.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact SOPMaster | Get Support",
    description:
      "Reach SOPMaster support for account assistance, billing, platform issues or general enquiries.",
    url: "https://sopmaster.tech/contact",
  },
  twitter: {
    title: "Contact SOPMaster | Get Support",
    description: "Reach SOPMaster support for account assistance, billing or platform enquiries.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
