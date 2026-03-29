import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
    Server,
    Mail,
    Shield,
    Database,
    ChevronDown,
    ExternalLink,
} from "lucide-react";
import { NavLink } from "react-router";

import { cn, startCase } from "@/lib/utils";
import { ProductSwitcherContainer } from "@/components/layout/product-switcher-container";

interface SidebarItem {
    labelKey: string;
    href: string;
    external?: boolean;
}

interface SidebarSection {
    titleKey: string;
    icon: React.ElementType;
    items: SidebarItem[];
    defaultOpen?: boolean;
}

const sections: SidebarSection[] = [
    {
        titleKey: "webhosting",
        icon: Server,
        defaultOpen: true,
        items: [
            { labelKey: "overview", href: "/domain" },
            { labelKey: "domains", href: "/domain/domains" },
            { labelKey: "subdomains", href: "/domain/subdomains" },
            { labelKey: "redirects", href: "/domain/redirects" },
            { labelKey: "dns_editor", href: "/domain/dns" },
            { labelKey: "file_manager", href: "/domain/files", external: true },
            { labelKey: "ftp", href: "/domain/ftp" },
        ],
    },
    {
        titleKey: "email",
        icon: Mail,
        items: [],
    },
    {
        titleKey: "security",
        icon: Shield,
        items: [],
    },
    {
        titleKey: "database",
        icon: Database,
        items: [],
    },
];

export function ProductSidebar() {
    return (
        <aside className="hidden w-64 shrink-0 border-r bg-card xl:block">
            <ProductSwitcherContainer />
            <nav className="flex flex-col py-2">
                {sections.map((section) => (
                    <SidebarSectionGroup
                        key={section.titleKey}
                        section={section}
                    />
                ))}
            </nav>
        </aside>
    );
}

function SidebarSectionGroup({ section }: { section: SidebarSection }) {
    const { t } = useTranslation();
    const [open, setOpen] = useState(section.defaultOpen ?? false);
    const hasItems = section.items.length > 0;
    const Icon = section.icon;

    return (
        <div>
            <button
                onClick={() => hasItems && setOpen(!open)}
                className={cn(
                    "flex w-full items-center gap-2 px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent",
                    !hasItems && "cursor-default",
                )}
                aria-expanded={hasItems ? open : undefined}
            >
                <Icon className="h-4 w-4 text-muted-foreground" />
                {startCase(t(section.titleKey))}
                {hasItems && (
                    <ChevronDown
                        className={cn(
                            "ml-auto h-4 w-4 text-muted-foreground transition-transform",
                            open && "rotate-180",
                        )}
                    />
                )}
            </button>

            {hasItems && (
                <div
                    className="grid transition-[grid-template-rows] duration-500 ease-in-out"
                    style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                >
                <ul className="flex flex-col overflow-hidden">
                    {section.items.map((item) => (
                        <li key={item.href}>
                            <NavLink
                                to={item.href}
                                end
                                className={({ isActive }) =>
                                    cn(
                                        "flex items-center justify-between py-2 pr-4 pl-10 text-sm transition-colors hover:text-foreground",
                                        isActive
                                            ? "text-foreground"
                                            : "text-muted-foreground",
                                    )
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <span
                                            className={cn(
                                                isActive &&
                                                    "border-b-2 border-primary pb-0.5",
                                            )}
                                        >
                                            {startCase(t(item.labelKey))}
                                        </span>
                                        {item.external && (
                                            <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                                        )}
                                    </>
                                )}
                            </NavLink>
                        </li>
                    ))}
                </ul>
                </div>
            )}
        </div>
    );
}
