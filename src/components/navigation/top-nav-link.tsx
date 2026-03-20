import React from "react";
import { NavLink } from "react-router";

import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { NavigationMenuItem } from "@/components/ui/navigation-menu";
import { Badge } from "@/components/ui/badge";

type TopNavLinkProps = React.ComponentProps<typeof Typography> & {
    href: string;
    className?: string;
    badge?: string;
};

export function TopNavLink({
    href,
    className,
    badge,
    children,
}: TopNavLinkProps) {
    return (
        <NavigationMenuItem className="h-16">
            <NavLink
                to={href}
                className={({ isActive }) =>
                    cn(
                        "text-md text-primary flex h-full items-center rounded-none px-2 no-underline! border-b-2",
                        isActive
                            ? "border-primary"
                            : "border-transparent hover:border-gray-300",
                        className,
                    )
                }
            >
                <Typography variant="link" className="flex items-center">
                    {children}
                    {badge && (
                        <Badge
                            variant="warning"
                            size="xs"
                            className="absolute top-1.25 right-3.5 inline-flex"
                        >
                            {badge}
                        </Badge>
                    )}
                </Typography>
            </NavLink>
        </NavigationMenuItem>
    );
}
