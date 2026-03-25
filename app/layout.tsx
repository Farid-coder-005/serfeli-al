import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Sərfəli Al — Azərbaycanın ən sərfəli alış platforması | Qiymət müqayisəsi',
  description: '120+ mağazada qiymət müqayisəsi, real qiymət tarixi və həqiqi endirim analizi. Azərbaycanda ən ucuz qiyməti tapın.',
  keywords: 'qiymət müqayisəsi, Azərbaycan, endirimlər, ən ucuz qiymət, onlayn alış-veriş',
  authors: [{ name: 'Sərfəli Al' }],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    title: 'Sərfəli Al — Azərbaycanın ən sərfəli alış platforması',
    description: '120+ mağazada qiymət müqayisəsi, real qiymət tarixi və həqiqi endirim analizi.',
    url: 'https://serfeli.al/',
    locale: 'az_AZ',
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export const viewport: Viewport = {
  themeColor: '#00a651',
  userScalable: true,
  width: 'device-width',
  initialScale: 1,
}

import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="az">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <script src="https://unpkg.com/@phosphor-icons/web"></script>
      </head>
      <body>{children}</body>
    </html>
  )
}
