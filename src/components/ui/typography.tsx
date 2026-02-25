import React from "react";

interface TypographyProps {
    children: React.ReactNode;
    variant?: "h1" | "p";
}

export const Typography: React.FC<TypographyProps> = ({
    children,
    variant = "p",
}) => {
    if (variant === "h1") {
        return (
            <h1 className="text-start text-4xl font-bold tracking-tight">
                {children}
            </h1>
        );
    }
    return (
        <p className="text-muted-foreground mt-4 text-start text-lg">
            {children}
        </p>
    );
};
