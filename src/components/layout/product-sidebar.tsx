import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
    Globe,
    Server,
    FolderOpen,
    FileCode,
    ArrowRightLeft,
    Layers,
    Upload,
    Mail,
    Shield,
    Database,
    ChevronDown,
} from "lucide-react";
import { Link } from "react-router";
import { cn, startCase } from "@/lib/utils";
import { ProductSelector } from "@/components/layout/product-selector";

interface SidebarSection {
    titleKey: string;
    icon: React.ElementType;
    items: { labelKey: string; href: string; icon: React.ElementType }[];
    defaultOpen?: boolean;
}

const sections: SidebarSection[] = [
    {
        titleKey: "webhosting",
        icon: Server,
        defaultOpen: true,
        items: [
            { labelKey: "overview", href: "/domain", icon: Layers },
            { labelKey: "domains", href: "/domain/domains", icon: Globe },
            {
                labelKey: "subdomains",
                href: "/domain/subdomains",
                icon: Globe,
            },
            {
                labelKey: "redirects",
                href: "/domain/redirects",
                icon: ArrowRightLeft,
            },
            {
                labelKey: "dns_editor",
                href: "/domain/dns",
                icon: FileCode,
            },
            {
                labelKey: "file_manager",
                href: "/domain/files",
                icon: FolderOpen,
            },
            { labelKey: "ftp", href: "/domain/ftp", icon: Upload },
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
            <ProductSelector />
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

            {open && hasItems && (
                <ul className="flex flex-col">
                    {section.items.map((item) => (
                        <li key={item.href}>
                            <Link
                                to={item.href}
                                className="flex items-center gap-2 py-2 pr-4 pl-10 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                            >
                                {startCase(t(item.labelKey))}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
