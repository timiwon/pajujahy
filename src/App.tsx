import "./App.css";
import { MainLayout } from "@/components/layout/MainLayout";
import { OverviewPage } from "@/pages/OverviewPage.tsx";

function App() {
    return (
        <MainLayout>
            <OverviewPage />
        </MainLayout>
    );
}

export default App;
