import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { education, profile, siteUrl } from "@/data/profile";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-code",
  display: "swap",
});

const description =
  "Portfolio of John Michael Nicolas, a Quality Assurance Engineer with over five years of experience in manual and automated testing across banking and private-sector software.";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  description,
  url: siteUrl,
  email: `mailto:${profile.email}`,
  sameAs: [profile.linkedin],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Montalban, Rizal",
    addressCountry: "PH",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: education.institution,
  },
  knowsAbout: ["Software quality assurance", "Manual testing", "Automated testing"],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${profile.name} — ${profile.title}`,
  description,
  authors: [{ name: profile.name }],
  alternates: { canonical: "/" },
  openGraph: {
    title: `${profile.name} — ${profile.title}`,
    description:
      "Quality Assurance Engineer with 5+ years of experience in manual and automated testing for banking and credit bureau platforms.",
    type: "website",
    url: "/",
    siteName: profile.name,
    locale: "en_PH",
  },
  twitter: {
    card: "summary",
    title: `${profile.name} — ${profile.title}`,
    description:
      "Quality Assurance Engineer with 5+ years of experience in manual and automated testing for banking and credit bureau platforms.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          // Structured data for search engines; built only from CV facts.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          // Applies the saved theme (or the system default) before first paint.
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem("theme");var d=s?s==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.dataset.theme=d?"dark":"light";}catch(e){}})();`,
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-paper"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
