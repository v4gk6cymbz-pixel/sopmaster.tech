import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import InitStore from "@/components/InitStore";

const Nav = dynamic(() => import("@/components/Nav"), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const viewport: Viewport = {
  themeColor: "#0F172A",
};

export const metadata: Metadata = {
  title: {
    default: "SOPMaster | Consultant Operating System for SOPs & Client Delivery",
    template: "%s | SOPMaster",
  },
  description:
    "SOPMaster is an operating system for consultants. Turn real work into structured SOPs, client delivery systems, and reusable consulting frameworks.",
  keywords: [
    "consultant operating system",
    "SOP software for consultants",
    "client delivery framework",
    "consulting systems",
    "operational governance consulting",
    "SOP generator for consultants",
    "consulting process standardisation",
    "repeatable delivery systems",
    "consulting firm operations",
    "standard operating procedure consultant",
  ],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  metadataBase: new URL("https://sopmaster.tech"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "SOPMaster",
    title: "SOPMaster | Consultant Operating System for SOPs & Client Delivery",
    description:
      "SOPMaster is an operating system for consultants. Turn real work into structured SOPs, client delivery systems, and reusable consulting frameworks.",
    url: "https://sopmaster.tech",
    countryName: "United Kingdom",
  },
  twitter: {
    card: "summary_large_image",
    title: "SOPMaster | Consultant Operating System for SOPs & Client Delivery",
    description:
      "SOPMaster is an operating system for consultants. Turn real work into structured SOPs, client delivery systems, and reusable consulting frameworks.",
  },
  category: "business",
  classification: "Business Software",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://sopmaster.tech/#website",
      url: "https://sopmaster.tech",
      name: "SOPMaster",
      description:
        "AI-powered platform for generating, managing, and governing standard operating procedures (SOPs) across regulated industries. Features jurisdiction-aware compliance triggers, document verification hashing, batch operations, and team collaboration.",
      inLanguage: "en-GB",
      applicationCategory: "BusinessApplication",
      keywords:
        "SOP management, standard operating procedure software, compliance documentation, regulatory technology, AI SOP generator",
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://sopmaster.tech/#software",
      url: "https://sopmaster.tech",
      name: "SOPMaster",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description:
        "SOPMaster is an intelligent SOP management platform that helps organisations create, manage, and govern standard operating procedures with AI-powered drafting, jurisdiction-aware regulatory compliance, document verification, and team collaboration tools.",
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "GBP",
        lowPrice: "400",
        highPrice: "9000",
        offerCount: "4",
      },
      featureList:
        "AI SOP generation, jurisdiction-based compliance triggers, document verification hashing, batch document operations, team management, credit-based usage, multi-jurisdiction support, professional document export",
    },
    {
      "@type": "Organization",
      "@id": "https://sopmaster.tech/#organization",
      url: "https://sopmaster.tech",
      name: "SOPMaster",
      description:
        "SOPMaster provides AI-powered standard operating procedure management software for regulated industries including finance, healthcare, professional services, and technology.",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body style={{ background: "#0F172A", minHeight: "100vh" }}>
        <InitStore />
        <Nav />
        <main className="fade-in">{children}</main>
      </body>
    </html>
  );
}
