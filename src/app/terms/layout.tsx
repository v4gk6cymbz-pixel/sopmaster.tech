import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "SOPMaster Terms & Conditions \u2014 the terms governing your use of the Operational Governance Infrastructure platform, including account responsibilities, billing and acceptable use.",
  alternates: { canonical: "/terms" },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Terms & Conditions | SOPMaster",
    description: "SOPMaster Terms & Conditions governing your use of the platform.",
    url: "https://sopmaster.tech/terms",
  },
  twitter: {
    title: "Terms & Conditions | SOPMaster",
    description: "SOPMaster Terms & Conditions governing your use of the platform.",
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
