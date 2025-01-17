import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'sonner'

import { Providers } from '@/utils/providers'
import { QueryClientProvider } from '@/providers/query-client-provider'

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
          <QueryClientProvider>
            {children}
            <Toaster />
          </QueryClientProvider>
        </Providers>
      </body>
    </html>
  )
}
