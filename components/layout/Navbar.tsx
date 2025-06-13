"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { LogoImage } from "@/components/ui/image"

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Employees", href: "/dashboard/employees" },
  { name: "Teams", href: "/dashboard/teams" },
  { name: "Messaging", href: "/dashboard/messaging" },
]

export function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" role="navigation" aria-label="Main navigation">
      <div className="mx-auto w-full max-w-[90rem] px-4">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <LogoImage
                src="/credibly-logo.webp"
                fallbackSrc="/credibly-logo.png"
                className="h-8 w-auto"
                sizes="(max-width: 640px) 120px, 160px"
              />
              <span className="font-bold">Credibly</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:flex-1 md:items-center md:justify-between md:gap-8">
            <div className="flex items-center gap-6">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname === item.href
                      ? "text-foreground"
                      : "text-foreground/60"
                  )}
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                Sign Out
              </Button>
            </div>
          </div>

          {/* Mobile Navigation Button */}
          <div className="flex md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        id="mobile-menu"
        className={cn(
          "md:hidden",
          isMenuOpen ? "block" : "hidden"
        )}
        role="menu"
        aria-label="Mobile navigation menu"
      >
        <div className="space-y-1 px-4 py-2">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block rounded-md px-3 py-2 text-base font-medium",
                pathname === item.href
                  ? "bg-accent text-accent-foreground"
                  : "text-foreground/60 hover:bg-accent hover:text-accent-foreground"
              )}
              role="menuitem"
              aria-current={pathname === item.href ? "page" : undefined}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="mt-4 border-t pt-4">
            <Button variant="ghost" className="w-full justify-start" size="sm">
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
} 