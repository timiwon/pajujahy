import { useTranslation } from "react-i18next";
import { Languages, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LANGUAGES = [
    { label: "English", code: "en" },
    { label: "German", code: "de" },
    { label: "Vietnam", code: "vn" },
    //{ label: "العربية", code: "ar" },
];

export function LanguageToggle() {
    const { i18n } = useTranslation();
    const currentLanguage =
        LANGUAGES.find((l) => l.code === i18n.language) || LANGUAGES[0];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2 px-2">
                    <Languages className="h-4 w-4" />
                    <span className="hidden md:inline-block">
                        {currentLanguage.label}
                    </span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-37.5">
                {LANGUAGES.map((lang) => (
                    <DropdownMenuItem
                        key={lang.code}
                        className="flex cursor-pointer items-center justify-between"
                        onClick={() => i18n.changeLanguage(lang.code)}
                    >
                        {lang.label}
                        {i18n.language === lang.code && (
                            <Check className="text-primary h-4 w-4" />
                        )}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
