import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"
import ClientLayout from "./components/ClientLayout"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Credibly - Professional Credibility That Travels With You",
  description: "Track, manage, and showcase professional credibility across organizations",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ClientLayout>
            {children}
          </ClientLayout>
          <Toaster />
          <Link href="/terms-of-service" className="px-4 text-gray-400 hover:text-white">
            Terms of Service
          </Link>
        </ThemeProvider>
      </body>
    </html>
  )
}
