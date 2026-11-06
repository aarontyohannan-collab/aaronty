import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ParticleBackground } from "@/components/animations/ParticleBackground";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: {
    default: `${profile.name} | ${profile.title}`,
    template: `%s | ${profile.brandName}`,
  },
  description: `${profile.name} — Engineering Student at ${profile.college}, Kottayam, Kerala. Passionate about programming in Python & C, technology, gaming, and engineering innovation.`,
  keywords: [
    "Aaron TY",
    "Engineering Student",
    "Amal Jyothi College of Engineering",
    "Kottayam Kerala",
    "Python Developer",
    "C Programming",
    "Systems Programming",
    "Software Portfolio",
    "Tech Student",
  ],
  authors: [{ name: profile.name, url: "https://aaronty.vercel.app" }],
  creator: profile.name,
  metadataBase: new URL("https://aaronty.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aaronty.vercel.app",
    title: `${profile.name} | ${profile.title}`,
    description: profile.aboutMe,
    siteName: `${profile.brandName} Portfolio`,
    images: [
      {
        url: "/favicon.svg",
        width: 1200,
        height: 630,
        alt: `${profile.name} — ${profile.title}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} | ${profile.title}`,
    description: profile.aboutMe,
    images: ["/favicon.svg"],
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-dark-main text-text-main min-h-screen flex flex-col font-sans antialiased selection:bg-electric-primary selection:text-white relative">
        {/* Subtle Ambient Particle Starfield */}
        <ParticleBackground />

        {/* Global Floating Glass Navbar */}
        <Navbar />

        {/* Dynamic Page Content */}
        <main className="flex-1 relative z-10">{children}</main>

        {/* Global Footer */}
        <Footer />
      </body>
    </html>
  );
}
