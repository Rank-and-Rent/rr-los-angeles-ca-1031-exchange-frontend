import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StickyCTA from '@/components/StickyCTA'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Los Angeles 1031 Exchange Experts | California Qualified Intermediary Network',
  description: 'Trusted 1031 exchange guidance for Los Angeles investors. Deadline tracking, attorney coordination, and qualified intermediary support throughout California.',
  keywords: '1031 exchange, Los Angeles, California, real estate investment, tax deferral, property replacement',
  authors: [{ name: '1031 Exchange Los Angeles' }],
  openGraph: {
    title: 'Los Angeles 1031 Exchange Experts | California Qualified Intermediary Network',
    description: 'Trusted 1031 exchange guidance for Los Angeles investors. Deadline tracking, attorney coordination, and qualified intermediary support throughout California.',
    url: 'https://www.1031exchangela.com/',
    siteName: '1031 Exchange Los Angeles',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Los Angeles 1031 Exchange Experts',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Los Angeles 1031 Exchange Experts | California Qualified Intermediary Network',
    description: 'Trusted 1031 exchange guidance for Los Angeles investors. Deadline tracking, attorney coordination, and qualified intermediary support throughout California.',
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
  verification: {
    google: 'your-google-site-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <StickyCTA />
      </body>
    </html>
  )
}
