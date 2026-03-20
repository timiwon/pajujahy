import { createBrowserRouter } from "react-router";
import { RootLayout } from "@/pages/layout";
import { DashboardLayout } from "@/pages/dashboard-layout";
import { ProductLayout } from "@/pages/product-layout";
import { OverviewPage } from "@/pages/overview-page";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                // Dashboard layout — no sidebar, full-width
                Component: DashboardLayout,
                children: [
                    { index: true, Component: OverviewPage },
                ],
            },
            {
                // Product layout — sidebar + product selector
                path: "domain",
                Component: ProductLayout,
                children: [
                    { index: true, element: null },
                ],
            },
        ],
    },
]);
