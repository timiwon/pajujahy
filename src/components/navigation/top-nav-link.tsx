import React from "react";

import { Typography } from "@/components/ui/typography.tsx";
import { Button } from "@/components/ui/button.tsx";
import { cn } from "@/lib/utils.ts";
import { NavigationMenuItem } from "@/components/ui/navigation-menu.tsx";
import { Badge } from "@/components/ui/badge.tsx";

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
            <Button
                variant="link"
                className={cn(
                    "h-full rounded-none border-gray-300 hover:border-b-3 hover:no-underline!",
                    className,
                )}
            >
                <a href={href} className="text-md text-primary">
                    <Typography variant="link" className="flex items-center">
                        {children}
                        {badge && (
                            <Badge
                                variant="warning"
                                size="xs"
                                className="top-1.25 absolute right-3.5 inline-flex"
                            >
                                {badge}
                            </Badge>
                        )}
                    </Typography>
                </a>
            </Button>
        </NavigationMenuItem>
    );
}
