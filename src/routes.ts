import { createBrowserRouter } from "react-router";
import { Layout } from "@/pages/layout.tsx";
import { OverviewPage } from "@/pages/overview-page.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: Layout,
        children: [
            { index: true, Component: OverviewPage },
        ],
    },
]);