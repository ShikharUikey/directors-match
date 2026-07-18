import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Directors Match | Intelligent Cinematic Planning Platform",
  description: "Discover perfect filming locations based on a desired cinematic look. Google Maps + PhotoPills + AI Location Scout for filmmakers.",
  keywords: ["filmmaking", "location scout", "cinematography", "AI", "golden hour", "directors match"],
};

import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} dark antialiased h-full`}>
      <body className="min-h-full flex flex-col bg-background text-foreground pt-16">
        {/* Global Cinematic Film Grain */}
        <div className="film-grain" aria-hidden="true" />
        
        {/* Navigation */}
        <nav className="fixed top-0 left-0 w-full z-50 glass border-b border-white/5 px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-bold text-lg tracking-tight">Director MATCH</Link>
          <div className="flex gap-6 text-sm font-medium">
            <Link href="/dashboard/planner" className="text-white/70 hover:text-white transition-colors">Planner</Link>
            <Link href="/dashboard/calculators" className="text-white/70 hover:text-white transition-colors">Calculators</Link>
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}
