import type { ReactElement, ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { hasRoleAccess, type Role } from "@/constants/roles";

interface RoleBasedRouteProps {
    children: ReactNode;
    allowedRoles: Role[];
    redirectTo?: string;
}

export default function RoleBasedRoute({
    children,
    allowedRoles,
    redirectTo = "/"
}: RoleBasedRouteProps): ReactElement {
    const { token, user } = useAuth();
    const location = useLocation();

    // Not logged in - redirect to login
    if (!token) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    // Get user role
    const userRole = user?.role || user?.roleName;

    // Check if user has required role
    if (!hasRoleAccess(userRole, allowedRoles)) {
        console.warn(`Access denied. User role: ${userRole}, Required: ${allowedRoles.join(", ")}`);
        return <Navigate to={redirectTo} replace />;
    }

    return children as ReactElement;
}
