import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "SOPMaster Privacy Policy \u2014 how we collect, use and protect your personal and company data when you use our Operational Governance Infrastructure platform.",
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Privacy Policy | SOPMaster",
    description: "SOPMaster Privacy Policy \u2014 how we collect, use and protect your data.",
    url: "https://sopmaster.tech/privacy",
  },
  twitter: {
    title: "Privacy Policy | SOPMaster",
    description: "SOPMaster Privacy Policy \u2014 how we collect, use and protect your data.",
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
