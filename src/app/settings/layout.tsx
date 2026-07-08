import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Administration",
  description:
    "Manage your SOPMaster company profile, team members, billing, jurisdiction settings and security PIN from the administration dashboard.",
  alternates: { canonical: "/settings" },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Administration | SOPMaster",
    description: "Manage your SOPMaster company profile, team, billing and settings.",
    url: "https://sopmaster.tech/settings",
  },
  twitter: {
    title: "Administration | SOPMaster",
    description: "Manage your SOPMaster company profile, team, billing and settings.",
  },
};

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
