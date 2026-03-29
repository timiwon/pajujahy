import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Eye, EyeOff, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DarkModeSwitch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface LoginFormProps {
    isLoading: boolean;
    error: string | null;
    onSubmit: (email: string, password: string) => Promise<void>;
}

const inputClass = cn(
    "h-12 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground",
    "placeholder:text-muted-foreground",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card",
    "disabled:cursor-not-allowed disabled:opacity-50",
);

export function LoginForm({ isLoading, error, onSubmit }: LoginFormProps) {
    const { t } = useTranslation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        await onSubmit(email, password);
    }

    function togglePassword() {
        setShowPassword((v) => !v);
    }

    return (
        <div className="bg-background flex min-h-screen flex-col">
            <main className="flex flex-1 flex-col items-center justify-center px-4">
                {/* Login card */}
                <div className="bg-card w-full max-w-md rounded-xl px-8 py-8 shadow-sm">
                    {/* Logo + title */}
                    <div className="mb-7 flex flex-col items-center gap-3">
                        <img
                            src="https://my.cyon.ch/img/cyon-logo-min.svg"
                            alt="cyon"
                            className="h-12 w-12"
                        />
                        <h1 className="text-foreground text-2xl font-bold tracking-tight">
                            {t("login_title")}
                        </h1>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                        noValidate
                    >
                        {/* Email */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="email"
                                className="text-foreground text-sm"
                            >
                                {t("login_email_label")}
                            </label>
                            <input
                                id="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={inputClass}
                                disabled={isLoading}
                            />
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <label
                                htmlFor="password"
                                className="text-foreground text-sm"
                            >
                                {t("login_password_label")}
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className={cn(inputClass, "pr-10")}
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={togglePassword}
                                    aria-label={
                                        showPassword
                                            ? t("login_hide_password")
                                            : t("login_show_password")
                                    }
                                    className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transition-colors"
                                >
                                    {showPassword ? (
                                        <Eye className="h-4 w-4" />
                                    ) : (
                                        <EyeOff className="h-4 w-4" />
                                    )}
                                </button>
                            </div>

                            {/* Forgot password */}
                            <button
                                type="button"
                                className="flex items-center gap-1 text-sm text-amber-500 transition-colors hover:text-amber-400"
                            >
                                → {t("login_forgot_password")}
                            </button>
                        </div>

                        {error && (
                            <p
                                role="alert"
                                className="text-destructive text-sm"
                            >
                                {error}
                            </p>
                        )}

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="h-12 w-full bg-amber-500 text-base font-bold text-white hover:bg-amber-400 focus-visible:ring-amber-500"
                        >
                            {isLoading ? t("login_loading") : t("login_submit")}
                        </Button>
                    </form>
                </div>

                {/* Webmail card */}
                <div className="bg-card mt-3 w-full max-w-md overflow-hidden rounded-xl">
                    <button className="text-muted-foreground hover:bg-accent hover:text-foreground flex w-full items-center justify-center gap-2 px-8 py-5 text-sm transition-colors">
                        <Mail className="h-4 w-4" />
                        {t("login_webmail")}
                    </button>
                </div>

                {/* Dev hint */}
                <p className="text-muted-foreground/40 mt-6 text-center text-xs">
                    {t("login_hint")}
                </p>
            </main>

            {/* Footer */}
            <footer className="bg-[#262626] flex items-center justify-between border-t px-6 py-4">
                <img
                    src="https://my.cyon.ch/img/cyon-logo-white-rectangular-v5.svg"
                    alt="cyon"
                    className="h-6"
                />
                <DarkModeSwitch />
            </footer>
        </div>
    );
}
