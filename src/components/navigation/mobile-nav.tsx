import { useState } from "react";
import { Link } from "react-router";
import { Menu, LogOut, User } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DarkModeSwitch } from "@/components/ui/switch";
import { LanguageToggle } from "@/components/layout/language-toggle";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetClose,
} from "@/components/ui/sheet";
import { startCase } from "@/lib/utils";
import type { NavItem } from "@/types/navigation";

interface MobileNavProps {
    navItems: NavItem[];
    userEmail?: string;
    onLogout: () => void;
}

export function MobileNav({ navItems, userEmail, onLogout }: MobileNavProps) {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);

    function handleLogout() {
        setOpen(false);
        onLogout();
    }

    return (
        <div className="flex sm:hidden">
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
            >
                <Menu className="h-5 w-5" />
            </Button>

            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent side="right" className="w-72 p-0">
                    <SheetHeader className="border-b px-4 py-4">
                        <SheetTitle className="text-base">
                            {startCase(t("menu"))}
                        </SheetTitle>
                    </SheetHeader>

                    <nav className="flex flex-1 flex-col overflow-y-auto">
                        {/* User info */}
                        <div className="flex items-center gap-3 border-b px-4 py-3">
                            <User className="h-5 w-5 shrink-0 text-muted-foreground" />
                            <span className="truncate text-sm">{userEmail}</span>
                        </div>

                        {/* Navigation links */}
                        <ul className="flex flex-col py-2">
                            {navItems.map((item) => (
                                <li key={item.href}>
                                    <SheetClose asChild>
                                        <Link
                                            to={item.href}
                                            className="flex items-center gap-2 px-4 py-3 text-sm text-foreground transition-colors hover:bg-accent"
                                        >
                                            {item.label}
                                            {item.badge && (
                                                <Badge variant="warning" size="xs">
                                                    {item.badge}
                                                </Badge>
                                            )}
                                        </Link>
                                    </SheetClose>
                                </li>
                            ))}
                        </ul>

                        {/* Utilities */}
                        <div className="mt-auto border-t">
                            <div className="flex items-center justify-between px-4 py-3">
                                <span className="text-sm text-muted-foreground">
                                    {startCase(t("language"))}
                                </span>
                                <LanguageToggle />
                            </div>

                            <div className="flex items-center justify-between px-4 py-3">
                                <span className="text-sm text-muted-foreground">
                                    {startCase(t("dark_mode"))}
                                </span>
                                <DarkModeSwitch />
                            </div>

                            <button
                                onClick={handleLogout}
                                className="flex w-full items-center gap-2 px-4 py-3 text-sm text-destructive transition-colors hover:bg-accent"
                            >
                                <LogOut className="h-4 w-4" />
                                {startCase(t("logout"))}
                            </button>
                        </div>
                    </nav>
                </SheetContent>
            </Sheet>
        </div>
    );
}
