import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Fraunces } from "next/font/google"
import "./globals.css"
import { SHOP_CONFIG } from "@/lib/products"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
})

/* ============================================================================
   METADATA DINÁMICO DESDE SHOP_CONFIG
============================================================================ */
export const metadata: Metadata = {
  title: `${SHOP_CONFIG.name} | Catálogo online`,
  description: `${SHOP_CONFIG.tagline}. Comprá fácil por WhatsApp y recibí novedades de ropa urbana.`,

  keywords: [
    "ropa",
    "remeras",
    "buzos",
    "pantalones",
    "moda urbana",
    "showroom",
    SHOP_CONFIG.name,
  ],

  icons: {
    icon: [
      {
        url: SHOP_CONFIG.logo,
        type: "image/png",
      },
    ],
    apple: SHOP_CONFIG.logo,
  },

  openGraph: {
    title: SHOP_CONFIG.name,
    description: SHOP_CONFIG.tagline,
    type: "website",
    images: [
      {
        url: SHOP_CONFIG.logo,
        width: 512,
        height: 512,
        alt: SHOP_CONFIG.name,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: SHOP_CONFIG.name,
    description: SHOP_CONFIG.tagline,
    images: [SHOP_CONFIG.logo],
  },
}

/* ============================================================================
   VIEWPORT
============================================================================ */
export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

/* ============================================================================
   ROOT LAYOUT
============================================================================ */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        {children}

        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}