import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ErrorBoundary } from '@/components/error-boundary'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

const BASE_URL = 'https://purgeprep.xyz'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'SAT Sprint — Timed SAT Prep Game',
  description:
    'Sharpen your SAT skills with timed multiple-choice challenges in math, reading, and grammar. Track your score, build streaks, and get instant explanations.',
  keywords: ['SAT', 'prep', 'test prep', 'education', 'learning', 'practice', 'quiz'],
  authors: [{ name: 'PurgePrep' }],
  creator: 'PurgePrep',
  publisher: 'PurgePrep',
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
  openGraph: {
    type: 'website',
    url: BASE_URL,
    title: 'SAT Sprint — Timed SAT Prep Game',
    description:
      'Sharpen your SAT skills with timed multiple-choice challenges in math, reading, and grammar. Track your score, build streaks, and get instant explanations.',
    siteName: 'SAT Sprint',
    images: [
      {
        url: `${BASE_URL}/placeholder-logo.png`,
        width: 1200,
        height: 630,
        alt: 'SAT Sprint Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SAT Sprint — Timed SAT Prep Game',
    description:
      'Sharpen your SAT skills with timed multiple-choice challenges. Track scores, build streaks, get instant explanations.',
    images: [`${BASE_URL}/placeholder-logo.png`],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'SAT Sprint',
  },
  formatDetection: {
    telephone: false,
  },
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#1a1a2e',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body className="bg-background font-sans antialiased">
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
