import { DarkModeSwitch } from "@/components/ui/switch.tsx";
import { useTranslation } from "react-i18next";
import {
    NavigationMenu,
    NavigationMenuList,
} from "@/components/ui/navigation-menu.tsx";
import { LanguageToggle } from "@/components/layout/language-toggle.tsx";
import { startCase } from "@/lib/utils.ts";
import { TopNavLink } from "@/components/navigation/top-nav-link.tsx";

export function TopNav() {
    const { t } = useTranslation();

    return (
        <nav className="w-full pr-1">
            <div className="grid basis-full grid-cols-1 sm:grid-cols-2">
                <FeaturesNav />
                <FeaturesNavMobile />

                <ul className="flex items-center justify-end gap-3">
                    <li>
                        <LanguageToggle />
                    </li>

                    <li>
                        <DarkModeSwitch />
                    </li>

                    <TopNavLink
                        href="/clientdata"
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
                        <span className="block w-full truncate overflow-hidden text-ellipsis whitespace-nowrap">
                            timiwon@gmail.com
                        </span>
                    </TopNavLink>

                    <TopNavLink
                        href="/auth/index/dologout"
                        className="group flex shrink-0 items-center space-x-1 px-1"
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
                        <span>{startCase(t("logout"))}</span>
                    </TopNavLink>
                </ul>
            </div>
        </nav>
    );
}

function FeaturesNav() {
    const { t } = useTranslation();

    const navItems = [
        {
            id: "personalProduct",
            title: "Managing a single product",
            href: "/domain",
            label: startCase(t("manage_product")),
            active: true,
        },
        {
            id: "productList",
            title: "View all products",
            href: "/product/overview",
            label: startCase(t("all_products")),
        },
        {
            id: "personalFinance",
            title: "My financial data",
            href: "/clientdata/finance",
            label: startCase(t("finances")),
            badge: startCase(t("new")),
        },
        {
            id: "support",
            title: "Support",
            href: "/support",
            label: startCase(t("support")),
        },
    ];

    return (
        <NavigationMenu className="ml-6 hidden items-center gap-3 sm:flex xl:gap-6">
            <NavigationMenuList>
                {navItems.map((item) => (
                    <TopNavLink
                        href={item.href}
                        badge={item.badge}
                    >
                        {item.label}
                    </TopNavLink>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
}

function FeaturesNavMobile() {
    const { t } = useTranslation();

    const navItems = [
        {
            id: "personalProduct",
            title: "Managing a single product",
            href: "/domain",
            label: startCase(t("manage_product")),
            active: true,
        },
        {
            id: "personalFinance",
            title: "My financial data",
            href: "/clientdata/finance",
            label: startCase(t("finances")),
            badge: startCase(t("new")),
        },
        {
            id: "support",
            title: "Support",
            href: "/support",
            label: startCase(t("support")),
        },
    ];

    return (
        <NavigationMenu className="ml-6 flex items-center gap-3 sm:hidden xl:gap-6">
            <NavigationMenuList>
                {navItems.map((item) => (
                    <TopNavLink
                        href={item.href}
                        badge={item.badge}
                    >
                        {item.label}
                    </TopNavLink>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
}
