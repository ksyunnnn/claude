import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { LanguageProvider } from '@/components/language-context';
import { BodyWrapper } from '@/components/body-wrapper';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-jp",
  subsets: ["latin"],
  display: "swap",
  fallback: ['Hiragino Kaku Gothic ProN', 'Yu Gothic Medium', 'Meiryo', 'sans-serif'],
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const messages = await getMessages();
  
  const metadata = messages.metadata as {
    title: string;
    description: string;
    siteName: string;
  };
  
  return {
    title: metadata.title,
    description: metadata.description,
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: '/',
      siteName: metadata.siteName,
      images: [
        {
          url: '/opengraph-image',
          width: 1200,
          height: 630,
          alt: metadata.siteName,
        },
      ],
      locale: locale === 'ja' ? 'ja_JP' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.description,
      images: ['/opengraph-image'],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  
  return (
    <html lang={locale}>
      <LanguageProvider>
        <NextIntlClientProvider 
          locale={locale}
          messages={messages}
        >
          <BodyWrapper
            className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${notoSansJP.variable} antialiased`}
          >
            {children}
            <Toaster />
          </BodyWrapper>
        </NextIntlClientProvider>
      </LanguageProvider>
    </html>
  );
}
