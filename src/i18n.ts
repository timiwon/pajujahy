import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import deCommon from "./locales/de/common.json";
import enCommon from "./locales/en/common.json";
import vnCommon from "./locales/vn/common.json";

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        lng: "de",
        fallbackLng: "de",
        ns: ["common"],
        defaultNS: "common",
        resources: {
            de: {
                common: deCommon,
            },
            en: {
                common: enCommon,
            },
            vn: {
                common: vnCommon,
            },
        },
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
