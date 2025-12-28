export const ROLES = {
    BIDDER: "BIDDER",
    SELLER: "SELLER",
    ADMIN: "ADMIN",
    MODERATOR: "MODERATOR",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

// Role hierarchy - higher index = more permissions
export const ROLE_HIERARCHY: Role[] = [
    ROLES.BIDDER,
    ROLES.SELLER,
    ROLES.MODERATOR,
    ROLES.ADMIN,
];

// Check if user role has access based on allowed roles
export function hasRoleAccess(userRole: string | undefined, allowedRoles: Role[]): boolean {
    if (!userRole) return false;
    return allowedRoles.some(role => role.toUpperCase() === userRole.toUpperCase());
}

// Route access configuration
export const ROUTE_ACCESS = {
    SELLER_DASHBOARD: [ROLES.SELLER, ROLES.ADMIN],
    SUPERADMIN: [ROLES.ADMIN, ROLES.MODERATOR],
    SUPERADMIN_USERS: [ROLES.ADMIN], // Only ADMIN can manage users
    ADMIN_APPROVALS: [ROLES.ADMIN, ROLES.MODERATOR],
} as const;
