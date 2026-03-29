import { createBrowserRouter } from "react-router";
import { RootLayout } from "@/pages/layout";
import { DashboardLayout } from "@/pages/dashboard-layout";
import { ProductLayout } from "@/pages/product-layout";
import { OverviewPage } from "@/pages/overview-page";
import { NotFoundPage } from "@/pages/not-found-page";
import { LoginPage } from "@/pages/login-page";
import { ProtectedRoute } from "@/components/auth/protected-route";

export const router = createBrowserRouter([
    {
        path: "/login",
        Component: LoginPage,
    },
    {
        path: "/",
        Component: ProtectedRoute,
        children: [
            {
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
                    { path: "*", Component: NotFoundPage },
                ],
            },
        ],
    },
]);
