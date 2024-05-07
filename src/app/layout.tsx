import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Project Canopy',
  description:
    'Estimated potential solar energy production of parking lots in Los Angeles.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html className="dark" lang="en">
      <body>{children}</body>
    </html>
  )
}
