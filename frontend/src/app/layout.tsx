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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} dark antialiased h-full`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {/* Global Cinematic Film Grain */}
        <div className="film-grain" aria-hidden="true" />
        
        {children}
      </body>
    </html>
  );
}
