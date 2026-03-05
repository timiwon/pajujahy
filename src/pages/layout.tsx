import { Outlet } from "react-router";

import { Header } from '@/components/layout/header.tsx';
import { Sidebar } from '@/components/layout/sidebar.tsx';

export function Layout() {
    return (
        <div id="wrapper">
            <Header />

            <div id="side-nav-content-wrapper" className="relative xl:flex min-h-[calc(100vh-64px)]">
                <Sidebar />

                <section id="content" className="basis-full xl:basis-[calc(100%-256px)] xl:flex justify-center relative shrink-0 grow-0 mx-auto xl:mx-0">
                    <div className="clearfix py-10 xl:px-0 mx-auto">
                        <Outlet />
                    </div>
                </section>
            </div>
        </div>
    );
}
