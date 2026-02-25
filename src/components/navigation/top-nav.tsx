import { DarkModeSwitch } from "@/components/ui/switch.tsx";
import { useTranslation } from "react-i18next";
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem, NavigationMenuLink
} from "@/components/ui/navigation-menu.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { LanguageToggle } from "@/components/layout/language-toggle.tsx";
import { startCase } from "@/lib/utils.ts";

export function TopNav() {
    const { t } = useTranslation();

    return (
        <nav className="w-full pr-1">
            <div className="grid basis-full grid-cols-1 sm:grid-cols-2">
                <FeaturesNav />
                <FeaturesNavMobile />

                <ul className="flex items-center justify-end">
                    <li className="min-w-0">
                        <LanguageToggle />
                    </li>

                    <li className="min-w-0">
                        <DarkModeSwitch />
                    </li>

                    <li className="min-w-0">
                        <a
                            id="loggedInContactString"
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
                        </a>
                    </li>

                    <li className="mr-4 flex-none shrink-0 sm:mr-0">
                        <a
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
                        </a>
                    </li>
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
        <NavigationMenu className="ml-6 hidden h-16 items-center gap-3 sm:flex xl:gap-6">
            <NavigationMenuList>
                {navItems.map((item) => (
                    <NavigationMenuItem key={item.id} className="shrink-0">
                        <NavigationMenuLink asChild>
                            <a
                                id={item.id}
                                className={`relative px-1 ${item.active ? "active" : ""}`}
                                title={item.title}
                                href={item.href}
                            >
                                {item.label}
                                {item.badge && (
                                    <Badge variant='warning' size='xs' className="absolute right-1 bottom-6.5 inline-flex">
                                        {item.badge}
                                    </Badge>
                                )}
                            </a>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
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
        <ul className="ml-6 flex h-16 items-center gap-3 sm:hidden xl:gap-6">
            {navItems.map((item) => (
                <li key={item.id} className="shrink-0">
                    <a
                        id={item.id}
                        className={`relative px-1 ${item.active ? "active" : ""}`}
                        title={item.title}
                        href={item.href}
                    >
                        {item.label}
                        {item.badge && (
                            <span className="absolute right-1 bottom-4.5 inline-flex items-center rounded-full px-1.5 py-0.5 text-xs leading-2.75 font-medium ring-1 ring-inset">
                                {item.badge}
                            </span>
                        )}
                    </a>
                </li>
            ))}
        </ul>
    );
}
