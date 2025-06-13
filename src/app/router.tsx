import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom"
import { LoginPage } from "@/features/auth/pages/LoginPage"
import { DashboardPage } from "@/features/dashboard/pages/DashboardPage"
import { ProfilePage } from "@/features/profile/pages/ProfilePage"
import { GroupPage } from "@/features/groups/pages/GroupPage"
import { RootLayout } from "@/components/layout/RootLayout"
import { ProtectedRoute } from "@/components/auth/ProtectedRoute"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        )
      },
      {
        path: "profile/:userId",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        )
      },
      {
        path: "groups/:groupId",
        element: (
          <ProtectedRoute>
            <GroupPage />
          </ProtectedRoute>
        )
      },
      {
        path: "/",
        element: <Navigate to="/dashboard" replace />
      }
    ]
  }
])

export function AppRouter() {
  return <RouterProvider router={router} />
} 