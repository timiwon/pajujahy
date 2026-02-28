import { useTranslation } from "react-i18next";
import { ChevronDown, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LANGUAGES = [
    { label: "English", code: "en", className: "fi fi-us" },
    { label: "German", code: "de", className: "fi fi-de" },
    { label: "Vietnam", code: "vn", className: "fi fi-vn" },
    //{ label: "العربية", code: "ar" },
];

export function LanguageToggle() {
    const { i18n } = useTranslation();
    const currentLanguage =
        LANGUAGES.find((l) => l.code === i18n.language) || LANGUAGES[0];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="h-7"
                >
                    <span className={currentLanguage.className}></span>
                    <ChevronDown />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-37.5">
                {LANGUAGES.map((lang) => (
                    <DropdownMenuItem
                        key={lang.code}
                        className="flex cursor-pointer items-center justify-between"
                        onClick={() => i18n.changeLanguage(lang.code)}
                    >
                        <span className={lang.className}></span>
                        {lang.label}
                        {i18n.language === lang.code && (
                            <Check className="text-primary h-4 w-4" />
                        )}
                        {i18n.language !== lang.code && (
                            <div className="text-primary h-4 w-4" />
                        )}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
