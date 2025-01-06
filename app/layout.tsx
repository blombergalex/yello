import type { Metadata } from 'next'
import './globals.css'
import { Head } from 'next/document'

export const metadata: Metadata = {
  title: 'Yello',
  description: 'Locate popcorn-chasers and optimistic angle-flyers',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const API_KEY = process.env.API_KEY

  return (
    <html lang="en">
      <Head>
        <script
          async
          defer
          src={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=weekly`}
        ></script>
      </Head>
      <body>{children}</body>
    </html>
  )
}
