import * as React from "react";
import { Switch as SwitchPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

function DarkModeSwitch({
    className,
    size = "default",
    ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
    size?: "sm" | "default";
}) {
    const [darkMode, setDarkMode] = useState(false);

    const handleCheckedChange = (checked: boolean) => {
        setDarkMode(checked);
    };

    useEffect(() => {
        const newTheme = darkMode ? "dark" : "light";
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(newTheme);
        document.cookie = `theme=${newTheme}; path=/; max-age=31536000`;
    }, [darkMode]);

    return (
        <SwitchPrimitive.Root
            checked={darkMode}
            onCheckedChange={handleCheckedChange}
            data-slot="switch"
            data-size={size}
            className={cn(
                // ... existing Root classes
                "peer focus-visible:ring-ring focus-visible:ring-offset-background data-[state=checked]:bg-background data-[state=unchecked]:bg-input inline-flex h-6 w-12 shrink-0 cursor-pointer items-center rounded-full border border-gray-300 transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600",
                className,
            )}
            {...props}
        >
            <SwitchPrimitive.Thumb
                className={cn(
                    // ... existing Thumb classes
                    "bg-yellow-500 data-[state=checked]:bg-gray-600 pointer-events-none flex h-5 w-5 items-center justify-center rounded-full shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-6 rtl:data-[state=checked]:-translate-x-6 data-[state=unchecked]:translate-x-0 rtl:data-[state=unchecked]:-translate-x-0",
                )}
            >
                {!darkMode && (
                    <Sun
                        className="h-4 w-4 fill-white text-white"
                        strokeWidth={3}
                        absoluteStrokeWidth={true}
                        data-state={props.checked ? "checked" : "unchecked"}
                    />
                )}
                {darkMode && (
                    <Moon
                        className="h-5 w-5 fill-gray-200 text-gray-600"
                        strokeWidth={2}
                        absoluteStrokeWidth={true}
                        fill="yellow"
                        data-state={props.checked ? "checked" : "unchecked"}
                    />
                )}
            </SwitchPrimitive.Thumb>
        </SwitchPrimitive.Root>
    );
}

export { DarkModeSwitch };
