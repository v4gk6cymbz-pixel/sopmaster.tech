"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content">
      <div className="app-content" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: "40px 24px", textAlign: "center" }}>
        <h1 style={{ fontSize: "30px", fontWeight: 600, color: "var(--white)", letterSpacing: "-0.02em", marginBottom: "12px" }}>Page Not Found</h1>
        <p style={{ fontSize: "14px", color: "var(--text-secondary)", maxWidth: "440px", lineHeight: 1.6, marginBottom: "28px" }}>
          The page you&rsquo;re looking for doesn&rsquo;t exist.
        </p>
        <Link href="/" className="btn btn-primary">
          Return Home
        </Link>
      </div>
    </main>
  );
}
