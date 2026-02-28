import React from "react";

import { cn } from "@/lib/utils.ts";

interface TypographyProps {
    children: React.ReactNode;
    className?: string;
    variant?:
        | "h1"
        | "h2"
        | "h3"
        | "h4"
        | "blockquote"
        | "inline-code"
        | "button"
        | "link"
        | "p";
}

export const Typography: React.FC<TypographyProps> = ({
    children,
    className,
    variant = "p",
}) => {
    if (variant === "h1") {
        return (
            <h1
                className={cn(
                    "scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance",
                    className,
                )}
            >
                {children}
            </h1>
        );
    }

    if (variant === "h2") {
        return (
            <h2
                className={cn(
                    "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
                    className,
                )}
            >
                {children}
            </h2>
        );
    }

    if (variant === "h3") {
        return (
            <h3
                className={cn(
                    "scroll-m-20 text-2xl font-semibold tracking-tight",
                    className,
                )}
            >
                {children}
            </h3>
        );
    }

    if (variant === "h4") {
        return (
            <h4
                className={cn(
                    "scroll-m-20 text-xl font-semibold tracking-tight",
                    className,
                )}
            >
                {children}
            </h4>
        );
    }

    if (variant === "blockquote") {
        return (
            <blockquote
                className={cn("mt-6 border-l-2 pl-6 italic", className)}
            >
                {children}
            </blockquote>
        );
    }

    if (variant === "inline-code") {
        return (
            <code
                className={cn(
                    "bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
                    className,
                )}
            >
                {children}
            </code>
        );
    }

    if (variant === "button") {
        return (
            <span className={cn("text-primary text-xl", className)}>
                {children}
            </span>
        );
    }

    if (variant === "link") {
        return (
            <span className={cn("text-md text-primary", className)}>
                {children}
            </span>
        );
    }

    return (
        <p className={cn("not-first-mt-6 text-primary leading-7", className)}>
            {children}
        </p>
    );
};
