import { Outlet } from "react-router";

import { ProductSidebar } from "@/components/layout/product-sidebar";

export function ProductLayout() {
    return (
        <div className="relative min-h-[calc(100vh-64px)] xl:flex">
            <ProductSidebar />

            <main className="basis-full xl:basis-[calc(100%-256px)] shrink-0 grow-0">
                <div className="mx-auto px-4 py-10 sm:px-6 xl:px-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
