import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function startCase(text: string, type: string = "word") {
    if (type === "first") {
        return text.charAt(0)?.toUpperCase() + text.slice(1);
    }

    return text
        .split(" ")
        .map((w) => w[0]?.toUpperCase() + w.slice(1)?.toLowerCase())
        .join(" ");
}