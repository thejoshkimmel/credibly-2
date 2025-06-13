"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BarChart3, Home, LogOut, MessageSquare, Settings, Users } from "lucide-react"
import { User } from "@/types"

interface NavbarProps {
  user: Pick<User, "name" | "image" | "fallbackImage" | "email">
}

interface NavigationItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const navigation: NavigationItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Employees", href: "/dashboard/employees", icon: Users },
  { name: "Ratings", href: "/dashboard/ratings", icon: BarChart3 },
  { name: "Messages", href: "/dashboard/messages", icon: MessageSquare },
]

export function Navbar({ user }: NavbarProps) {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/dashboard" className="mr-6 flex items-center space-x-2">
            <BarChart3 className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">Credibly</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`transition-colors hover:text-foreground/80 ${
                    isActive ? "text-foreground" : "text-foreground/60"
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      name={user.name}
                      src={user.image}
                      fallbackSrc={user.fallbackImage}
                      sizes="32px"
                    />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/api/auth/logout">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </header>
  )
} 