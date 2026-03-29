import { Navigate, Outlet, useLocation } from "react-router";

import { useAuth } from "@/hooks/use-auth";

export function ProtectedRoute() {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    // Wait for session restore before deciding — prevents flash to /login on refresh
    if (isLoading) return null;

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
}
