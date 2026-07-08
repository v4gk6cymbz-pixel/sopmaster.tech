import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Sign in to SOPMaster \u2014 access your Operational Governance Infrastructure dashboard to create, manage and govern SOPs, checklists and documentation.",
  alternates: { canonical: "/login" },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Login | SOPMaster",
    description: "Sign in to SOPMaster to access your operational governance platform.",
    url: "https://sopmaster.tech/login",
  },
  twitter: {
    title: "Login | SOPMaster",
    description: "Sign in to SOPMaster to access your operational governance platform.",
  },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
