import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: {
    default: 'Memoire — Create a Website They\'ll Never Forget',
    template: '%s | Memoire',
  },
  description: 'Turn your memories, photos and story into a beautiful interactive gift — powered by AI. Create personalized emotional experiences for birthdays, anniversaries, love, and more.',
  keywords: ['personalized gift website', 'birthday website', 'anniversary gift', 'AI gift', 'digital gift', 'emotional website', 'love letter website'],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: 'Memoire',
    title: 'Memoire — Create a Website They\'ll Never Forget',
    description: 'Turn your memories, photos and story into a beautiful interactive gift — powered by AI.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Memoire — AI Emotional Gift Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Memoire — Create a Website They\'ll Never Forget',
    description: 'Turn your memories, photos and story into a beautiful interactive gift — powered by AI.',
    images: ['/og-image.jpg'],
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#1E1E2A',
              color: '#F8F8FF',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '12px',
              fontSize: '0.9rem',
              fontFamily: 'Inter, sans-serif',
            },
            success: {
              iconTheme: { primary: '#10B981', secondary: '#1E1E2A' },
            },
            error: {
              iconTheme: { primary: '#EF4444', secondary: '#1E1E2A' },
            },
          }}
        />
      </body>
    </html>
  )
}
