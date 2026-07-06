import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import InitStore from "@/components/InitStore";

const Nav = dynamic(() => import("@/components/Nav"), {
  ssr: false,
});

const OnboardingTour = dynamic(() => import("@/components/OnboardingTour"), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const viewport: Viewport = {
  themeColor: "#0F172A",
};

export const metadata: Metadata = {
  title: {
    default: "SOPMaster | Operational Documentation for Consultants",
    template: "%s | SOPMaster",
  },
  description:
    "Operational documentation platform for consultants. Create, manage and maintain structured SOPs, operational checklists and department documentation.",
  keywords: [
    "operational documentation platform",
    "SOP software for consultants",
    "consultancy documentation tools",
    "standard operating procedures",
    "operational governance",
    "consulting delivery framework",
    "process documentation",
    "compliance documentation",
    "professional services operations",
    "SOP management system",
  ],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
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
    title: "SOPMaster | Operational Documentation for Consultants",
    description:
      "Operational documentation platform for consultants. Create, manage and maintain structured SOPs, operational checklists and department documentation.",
    url: "https://sopmaster.tech",
    countryName: "United Kingdom",
  },
  twitter: {
    card: "summary_large_image",
    title: "SOPMaster | Operational Documentation for Consultants",
    description:
      "Operational documentation platform for consultants. Create, manage and maintain structured SOPs, operational checklists and department documentation.",
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
        "Professional operational documentation platform for consultants and consultancy firms. Create, manage and maintain structured Standard Operating Procedures, operational checklists and department-level documentation.",
      inLanguage: "en-GB",
      applicationCategory: "BusinessApplication",
      keywords:
        "SOP management, standard operating procedure software, compliance documentation, operational governance, consultancy documentation",
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://sopmaster.tech/#software",
      url: "https://sopmaster.tech",
      name: "SOPMaster",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description:
        "SOPMaster is a professional operational documentation platform that helps consultants and organisations create, manage and govern standard operating procedures with structured workflows, jurisdiction-aware compliance references, document verification and team collaboration tools.",
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "GBP",
        lowPrice: "400",
        highPrice: "9000",
        offerCount: "4",
      },
      featureList:
        "structured SOP generation, jurisdiction-based compliance references, document verification hashing, batch document operations, team management, credit-based usage, multi-jurisdiction support, professional document export",
    },
    {
      "@type": "Organization",
      "@id": "https://sopmaster.tech/#organization",
      url: "https://sopmaster.tech",
      name: "SOPMaster",
      description:
        "SOPMaster provides professional operational documentation software for consultants, consultancy firms and documentation professionals across multiple industries including finance, healthcare, professional services and technology.",
      email: "Support@sopmaster.tech",
      contactPoint: {
        "@type": "ContactPoint",
        email: "Support@sopmaster.tech",
        contactType: "customer support",
      },
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
        <OnboardingTour />
        <main className="fade-in">{children}</main>
      </body>
    </html>
  );
}
