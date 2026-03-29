import { useTranslation } from "react-i18next";
import {
    NavigationMenu,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { DarkModeSwitch } from "@/components/ui/switch";
import { LanguageToggle } from "@/components/layout/language-toggle";
import { TopNavLink } from "@/components/navigation/top-nav-link";
import { startCase } from "@/lib/utils";
import type { NavItem } from "@/types/navigation";

interface TopNavProps {
    navItems: NavItem[];
    userEmail?: string;
    onLogout: () => void;
}

export function TopNav({ navItems, userEmail, onLogout }: TopNavProps) {
    const { t } = useTranslation();

    return (
        <nav className="hidden w-full pr-1 sm:block">
            <div className="grid basis-full grid-cols-2">
                {/* Left: feature navigation */}
                <NavigationMenu className="ml-6 flex items-center gap-3 xl:gap-6">
                    <NavigationMenuList>
                        {navItems.map((item) => (
                            <TopNavLink
                                key={item.href}
                                href={item.href}
                                badge={item.badge}
                            >
                                {item.label}
                            </TopNavLink>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>

                {/* Right: utilities */}
                <ul className="flex items-center justify-end gap-3">
                    <li>
                        <LanguageToggle />
                    </li>

                    <li>
                        <DarkModeSwitch />
                    </li>

                    <TopNavLink
                        href="/clientdata"
                        end
                        className="group flex items-center space-x-1 px-1"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.75"
                            stroke="currentColor"
                            className="h-6 w-6 shrink-0"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                        <span className="block max-w-32 truncate lg:max-w-48">
                            {userEmail}
                        </span>
                    </TopNavLink>

                    <li className="flex h-16 items-center">
                        <button
                            onClick={onLogout}
                            className="group flex shrink-0 cursor-pointer items-center space-x-1 px-1 text-primary"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.75"
                                stroke="currentColor"
                                className="h-6 w-6 shrink-0"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                                />
                            </svg>
                            <span className="hidden text-sm lg:inline">
                                {startCase(t("logout"))}
                            </span>
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
