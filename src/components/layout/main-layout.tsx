import * as React from "react";

import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface MainLayoutProps {
    children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
    return (
        <div id="wrapper">
            <Header />

            <div id="side-nav-content-wrapper" className="relative xl:flex min-h-[calc(100vh-64px)]">
                <Sidebar />

                <section id="content" className="basis-full xl:basis-[calc(100%-256px)] xl:flex justify-center relative xl:left-64 shrink-0 grow-0 mx-auto xl:mx-0">
                    <div className="clearfix py-10 xl:px-0 mx-auto">
                        {children}
                    </div>
                </section>
            </div>
        </div>
    );
}
