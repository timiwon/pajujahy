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
            {/*<Button
                variant="link"
                className={cn(
                    "h-full rounded-none border-gray-300 hover:border-b-3 hover:no-underline!",
                    className,
                )}
            >*/}
            <a
                href={href}
                className="px-2 text-md text-primary flex h-full items-center rounded-none border-gray-300 pb-2 no-underline! hover:border-b-2 hover:pb-1"
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
            </a>
            {/*</Button>*/}
        </NavigationMenuItem>
    );
}
