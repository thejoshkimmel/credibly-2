import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "@/features/auth/hooks/useAuth"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    // Redirect to login page but save the attempted url
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
} 