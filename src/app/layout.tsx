import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import { Layout } from "@/components/Layout";
import { Providers } from "@/providers/Providers";


const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export const metadata: Metadata = {
  title: "Auge Invest",
  description: "Plataforma líder em análise de investimentos. Oferecemos ferramentas avançadas e insights precisos para otimizar sua carteira de investimentos.",
  keywords: "investimentos, análise financeira, mercado financeiro, bolsa de valores, auge invest",
  authors: [{ name: "Auge Invest" }],
  openGraph: {
    title: 'Auge Invest',
    description: 'Plataforma líder em análise de investimentos',
    url: 'https://augeinvest.com.br',
    siteName: 'Auge Invest',
    images: [
      {
        url: '/assets/images/logo/OgCard.png',
        width: 1536,
        height: 1024,
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Auge Invest',
    description: 'Plataforma líder em análise de investimentos',
    images: ['/assets/images/logo/OgCard.png'],
  },
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/icon-192x192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512x512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: { url: '/apple-icon.png', type: 'image/png', sizes: '180x180' },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html suppressHydrationWarning>
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />


        <link rel="icon" type="image/png" sizes="32x32" href="/icon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512x512.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="dns-prefetch"
          href="https://fonts.googleapis.com"
        />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
