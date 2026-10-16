import type { Metadata } from "next";
import { Space_Grotesk, Cormorant_Garamond } from "next/font/google";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { profile } from "@/content/resume";
import { introFrequency } from "@/content/intro";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

// Serif used only for the hero headline — everything else stays on the grotesk above.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-cormorant",
});

const title = `${profile.name} — ${profile.role}`;

export const metadata: Metadata = {
  // Only set when you provide it (NEXT_PUBLIC_SITE_URL=https://yourdomain.com at build
  // time). When it's unset, Next.js falls back to the deployment URL on Vercel.
  ...(process.env.NEXT_PUBLIC_SITE_URL && { metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL) }),
  title,
  description: profile.summary,
  openGraph: {
    title,
    description: profile.summary,
    siteName: profile.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: profile.summary,
  },
};

// Only used when introFrequency is "once-per-session". Runs before first paint and marks
// repeat visits in the same tab as already seen, so the intro is skipped.
const introGuard = `try{if(sessionStorage.getItem("intro-seen"))document.documentElement.dataset.intro="seen"}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${cormorant.variable}`} suppressHydrationWarning>
      <head>
        {introFrequency === "once-per-session" && <script dangerouslySetInnerHTML={{ __html: introGuard }} />}
      </head>
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
