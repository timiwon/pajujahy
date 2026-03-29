import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

import { TopNav } from "@/components/navigation/top-nav";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useAuth } from "@/hooks/use-auth";
import { startCase } from "@/lib/utils";
import type { NavItem } from "@/types/navigation";

export function TopNavContainer() {
    const { t } = useTranslation();
    const { user } = useCurrentUser();
    const { logout } = useAuth();
    const navigate = useNavigate();

    const navItems: NavItem[] = [
        { href: "/domain",            label: startCase(t("manage_product")) },
        { href: "/product/overview",  label: startCase(t("all_products")) },
        { href: "/clientdata/finance", label: startCase(t("finances")), badge: startCase(t("new")) },
        { href: "/support",           label: startCase(t("support")) },
    ];

    function handleLogout() {
        logout();
        navigate("/login", { replace: true });
    }

    return (
        <TopNav
            navItems={navItems}
            userEmail={user?.email}
            onLogout={handleLogout}
        />
    );
}
