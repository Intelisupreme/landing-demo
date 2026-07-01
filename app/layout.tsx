import type { Metadata, Viewport } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600"],
});

// No-FOUC theme script: runs before paint so <html> has correct data-theme.
const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var mql = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored || (mql ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  } catch (_) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();
`;

export const metadata: Metadata = {
  title: "Intelisupreme — SaaS Development & AI Automation",
  description:
    "Intelisupreme builds custom SaaS products and automates business operations with AI. We help companies in Portugal and Europe ship faster, automate workflows, and scale confidently.",
  metadataBase: new URL("https://intelisupreme.example"),
  openGraph: {
    title: "Intelisupreme — SaaS Development & AI Automation",
    description:
      "Custom SaaS products and AI business automation. Ship faster, automate workflows, scale confidently.",
    type: "website",
    locale: "en_US",
    siteName: "Intelisupreme",
  },
  twitter: {
    card: "summary_large_image",
    title: "Intelisupreme — SaaS Development & AI Automation",
    description:
      "Custom SaaS products and AI business automation for European businesses.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1120" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${outfit.variable} ${inter.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}