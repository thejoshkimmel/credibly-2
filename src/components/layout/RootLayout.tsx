import { Outlet, useLocation, Link } from "react-router-dom"
import { useAuth } from "@/features/auth/hooks/useAuth"
import { Button } from "@/components/ui/Button"
import { Home, User, Users, LogOut } from "lucide-react"

export function RootLayout() {
  const { isAuthenticated, logout } = useAuth()
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <div className="min-h-screen bg-background">
      {isAuthenticated && (
        <nav className="border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <Link to="/dashboard" className="text-xl font-bold text-primary">
                    Credibly
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link
                    to="/dashboard"
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive("/dashboard")
                        ? "border-primary text-foreground"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Home className="h-4 w-4 mr-2" />
                    Dashboard
                  </Link>
                  <Link
                    to="/profile/me"
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive("/profile/me")
                        ? "border-primary text-foreground"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Link>
                  <Link
                    to="/groups"
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive("/groups")
                        ? "border-primary text-foreground"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Groups
                  </Link>
                </div>
              </div>
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  onClick={logout}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </nav>
      )}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  )
} 