import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import InitStore from "@/components/InitStore";

const Nav = dynamic(() => import("@/components/Nav"), { ssr: false });
const DataPoller = dynamic(() => import("@/components/DataPoller"), { ssr: false });
const OnboardingTour = dynamic(() => import("@/components/OnboardingTour"), { ssr: false });

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const viewport: Viewport = { themeColor: "#0A0F1E" };

export const metadata: Metadata = {
  title: {
    default: "SOPMaster | The World\u2019s First Operational Governance Infrastructure Platform",
    template: "%s | SOPMaster",
  },
  description:
    "SOPMaster is the world\u2019s first Operational Governance Infrastructure platform. Create, manage and govern Standard Operating Procedures, operational checklists and department documentation with enterprise-grade structure and compliance.",
  keywords: [
    "operational governance infrastructure",
    "SOP management platform",
    "standard operating procedures software",
    "operational documentation",
    "governance platform",
    "consultancy documentation tools",
    "enterprise SOP software",
    "compliance documentation platform",
    "operational excellence",
    "process governance",
  ],
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg", apple: "/favicon.svg" },
  metadataBase: new URL("https://sopmaster.tech"),
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: {
    type: "website", locale: "en_GB", siteName: "SOPMaster",
    title: "SOPMaster | Operational Governance Infrastructure",
    description: "The world\u2019s first Operational Governance Infrastructure platform. Create, manage and govern operational procedures with enterprise-grade precision.",
    url: "https://sopmaster.tech", countryName: "United Kingdom",
  },
  twitter: {
    card: "summary_large_image",
    title: "SOPMaster | Operational Governance Infrastructure",
    description: "The world\u2019s first Operational Governance Infrastructure platform.",
  },
  category: "business",
  classification: "Enterprise Software",
  other: { "application-name": "SOPMaster" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://sopmaster.tech/#website",
      url: "https://sopmaster.tech",
      name: "SOPMaster",
      description: "The world\u2019s first Operational Governance Infrastructure platform. Create, manage and govern Standard Operating Procedures, operational checklists and department documentation.",
      inLanguage: "en-GB",
      applicationCategory: "BusinessApplication",
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://sopmaster.tech/#software",
      url: "https://sopmaster.tech",
      name: "SOPMaster",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: "SOPMaster is the world\u2019s first Operational Governance Infrastructure platform, providing enterprise-grade tools for creating, managing and governing operational procedures, checklists and department documentation.",
      offers: { "@type": "AggregateOffer", priceCurrency: "GBP", lowPrice: "400", highPrice: "9000", offerCount: "4" },
    },
    {
      "@type": "Organization",
      "@id": "https://sopmaster.tech/#organization",
      url: "https://sopmaster.tech",
      name: "SOPMaster",
      description: "SOPMaster provides the world\u2019s first Operational Governance Infrastructure platform for enterprises and consultancy firms.",
      email: "Support@sopmaster.tech",
      contactPoint: { "@type": "ContactPoint", email: "Support@sopmaster.tech", contactType: "customer support" },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-VLSXQP4JEX"></script>
        <script dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-VLSXQP4JEX');`,
        }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body style={{ background: "var(--navy-950)", minHeight: "100vh" }}>
        <InitStore />
        <Nav />
        <DataPoller />
        <OnboardingTour />
        {children}
      </body>
    </html>
  );
}
