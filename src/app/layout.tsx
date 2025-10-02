import './globals.css'
import '../theme/custom-styles.css'
import '../theme/effects.css'

import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata, Viewport } from 'next'

import { Layout } from '@/components/Layout'
import { Providers } from '@/providers/Providers'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

export const metadata: Metadata = {
  title: 'Auge Invest',
  description:
    'Plataforma líder em análise de investimentos. Oferecemos ferramentas avançadas e insights precisos para otimizar sua carteira de investimentos.',
  keywords: 'investimentos, análise financeira, mercado financeiro, bolsa de valores, auge invest',
  authors: [{ name: 'Auge Invest' }],
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
    google: 'google-site-verification=your-google-site-verification-code',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      </head>
      <body>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
