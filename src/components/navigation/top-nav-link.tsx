import React from "react";
import { Link } from "react-router";

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
            <Link
                to={href}
                className={cn(
                    "text-md text-primary flex h-full items-center rounded-none border-gray-300 px-2 pb-2 no-underline! hover:border-b-2 hover:pb-1",
                    className,
                )}
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
            </Link>
        </NavigationMenuItem>
    );
}
