import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Claude Commands - Share Custom Slash Commands",
  description: "Share and discover custom slash commands for Claude Code. Enhance your development workflow with community-created commands.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://claude-commands.vercel.app'),
  openGraph: {
    title: "Claude Commands - Share Custom Slash Commands",
    description: "Share and discover custom slash commands for Claude Code. Enhance your development workflow with community-created commands.",
    type: 'website',
    locale: 'ja_JP',
    siteName: 'Claude Commands',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Claude Commands - コマンド共有プラットフォーム',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Claude Commands - Share Custom Slash Commands",
    description: "Share and discover custom slash commands for Claude Code",
    images: ['/opengraph-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
