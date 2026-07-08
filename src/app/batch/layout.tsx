import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Batch Deploy",
  description:
    "Use SOPMaster\u2019s Batch Deploy to generate multiple SOPs simultaneously. Deploy enterprise documentation packages across departments with AI-powered batch generation.",
  alternates: { canonical: "/batch" },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Batch Deploy | SOPMaster",
    description: "Generate multiple SOPs simultaneously with SOPMaster\u2019s Enterprise Deployment Centre.",
    url: "https://sopmaster.tech/batch",
  },
  twitter: {
    title: "Batch Deploy | SOPMaster",
    description: "Generate multiple SOPs simultaneously with SOPMaster\u2019s Enterprise Deployment Centre.",
  },
};

export default function BatchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
