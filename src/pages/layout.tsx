import { Outlet } from "react-router";

import { Header } from "@/components/layout/header";

export function RootLayout() {
    return (
        <div id="wrapper">
            <Header />
            <Outlet />
        </div>
    );
}
