"use client";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main id="main-content">
      <div className="app-content" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: "40px 24px", textAlign: "center" }}>
        <h1 style={{ fontSize: "30px", fontWeight: 600, color: "var(--white)", letterSpacing: "-0.02em", marginBottom: "12px" }}>Something went wrong</h1>
        <p style={{ fontSize: "14px", color: "var(--text-secondary)", maxWidth: "440px", lineHeight: 1.6, marginBottom: "28px" }}>
          An unexpected error occurred. Please try again.
        </p>
        <button onClick={() => reset()} className="btn btn-primary">
          Try Again
        </button>
      </div>
    </main>
  );
}
