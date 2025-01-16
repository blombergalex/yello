import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/utils/providers'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: 'Yello',
  description:
    'Locate optimistic angle-flyers, rookies and popcorn-chasing wingsuiters',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="h-lvh">
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
