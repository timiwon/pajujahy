import { Link } from "react-router";

import { TopNav } from "@/components/navigation/top-nav";
import { MobileNav } from "@/components/navigation/mobile-nav";

export function Header() {
    return (
        <header>
            <div className="flex w-full flex-row items-center border-b">
                <Logo />
                <TopNav />
                <div className="ml-auto pr-2 sm:hidden">
                    <MobileNav />
                </div>
            </div>
        </header>
    );
}

function Logo() {
    return (
        <div className="w-fit shrink-0 border-r">
            <Link to="/">
                <img
                    className="hover:bg-brand-80 dark:hover:bg-brand-dark-90 h-16 w-16"
                    src="https://my.cyon.ch/img/cyon-logo-min.svg"
                    alt="my.cyon Logo"
                />
            </Link>
        </div>
    );
}
