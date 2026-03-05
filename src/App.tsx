import "./App.css";
import "flag-icons/css/flag-icons.min.css";
import "./i18n";
import { RouterProvider } from "react-router/dom";

import { DirectionProvider } from "@radix-ui/react-direction";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

import { router } from "@/routes.ts";

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
            <RouterProvider router={router} />
        </DirectionProvider>
    );
}

export default App;
