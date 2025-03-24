import type React from "react"
import type { Metadata } from "next"
import { Inter, Outfit } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import Navbar from "@/components/navbar"

const inter = Inter({ subsets: ["latin"] })
const outfit = Outfit({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Donation & Zakat Management System",
  description: "Manage donations, zakat, and sponsorships",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={outfit.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Navbar />
          <main className="container mx-auto py-6 px-4">{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'