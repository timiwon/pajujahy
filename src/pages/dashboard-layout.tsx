import { Outlet } from "react-router";

export function DashboardLayout() {
    return (
        <main className="min-h-[calc(100vh-64px)]">
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <Outlet />
            </div>
        </main>
    );
}
