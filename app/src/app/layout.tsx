import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Developers App — Bridging the Gap Between Codes and Developers' Showcase",
  description:
    "An Apple-grade digital ecosystem uniting developer social networking, interactive portfolios, live code sandboxes, project marketplaces, and multi-college hackathons.",
  keywords: [
    "developers app",
    "developer ecosystem",
    "interactive portfolio",
    "live code sandbox",
    "project marketplace",
    "hackathons",
    "recruitment",
  ],
  authors: [{ name: "Developers App Global" }],
  openGraph: {
    title: "Developers App — Bridging the Gap Between Codes and Developers' Showcase",
    description: "Build. Showcase. Compete. Sell. Get Hired.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#050608",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#050608] text-white antialiased selection:bg-[#287BFF]/40 selection:text-white">
        {children}
      </body>
    </html>
  );
}
