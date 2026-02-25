import "./App.css";
import "./i18n";

import { DirectionProvider } from "@radix-ui/react-direction";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

import { MainLayout } from "@/components/layout/main-layout.tsx";
import { OverviewPage } from "@/pages/overview-page.tsx";

function App() {
    const { i18n } = useTranslation();
    const direction = i18n.language === "ar" ? "rtl" : "ltr";

    useEffect(() => {
        // Update HTML tag attributes for accessibility and CSS
        document.documentElement.dir = direction;
        document.documentElement.lang = i18n.language;
    }, [direction, i18n.language]);

    return (
        <DirectionProvider dir={direction}>
            <MainLayout>
                <OverviewPage />
            </MainLayout>
        </DirectionProvider>
    );
}

export default App;
