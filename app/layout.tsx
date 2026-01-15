import type { Metadata } from 'next'
import { Cormorant_Garamond, Montserrat } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StickyCTA from '@/components/StickyCTA'
import { Analytics } from '@vercel/analytics/next'

const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: '1031 Exchange Los Angeles | Defer Capital Gains Tax on Investment Property',
    template: '%s | 1031 Exchange Los Angeles',
  },
  description: 'Expert 1031 exchange services for Los Angeles investors. Defer capital gains taxes, identify replacement properties, and execute tax-advantaged real estate transactions with professional guidance.',
  keywords: '1031 exchange, Los Angeles, capital gains tax deferral, like-kind exchange, investment property, qualified intermediary, replacement property, tax deferred exchange, real estate investment',
  authors: [{ name: '1031 Exchange Los Angeles' }],
  creator: '1031 Exchange Los Angeles',
  publisher: '1031 Exchange Los Angeles',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.1031exchangelosangeles.com'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon.ico',
    apple: '/favicon/apple-touch-icon.png',
    other: [
      {
        rel: 'icon',
        url: '/favicon/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        rel: 'icon',
        url: '/favicon/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
    ],
  },
  openGraph: {
    title: '1031 Exchange Los Angeles | Defer Capital Gains Tax on Investment Property',
    description: 'Expert 1031 exchange services for Los Angeles investors. Defer capital gains taxes and execute tax-advantaged real estate transactions.',
    url: 'https://www.1031exchangelosangeles.com/',
    siteName: '1031 Exchange Los Angeles',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '1031 Exchange Los Angeles - Tax Deferred Real Estate Transactions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '1031 Exchange Los Angeles | Defer Capital Gains Tax on Investment Property',
    description: 'Expert 1031 exchange services for Los Angeles investors. Defer capital gains taxes and execute tax-advantaged real estate transactions.',
    images: ['/og-image.png'],
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
  category: 'Real Estate Investment',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${montserrat.variable}`}>
      <body className="font-sans antialiased">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <StickyCTA />
        <Analytics />
      </body>
    </html>
  )
}
