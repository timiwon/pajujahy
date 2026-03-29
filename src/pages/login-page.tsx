import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

import { LoginForm } from "@/pages/login-form";
import { useAuth } from "@/hooks/use-auth";

export function LoginPage() {
    const { t } = useTranslation();
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = (location.state as { from?: { pathname: string } } | null)
        ?.from?.pathname ?? "/";

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Already authenticated — redirect away from login
    if (isAuthenticated) {
        return <Navigate to={from} replace />;
    }

    async function handleSubmit(email: string, password: string) {
        setError(null);
        setIsLoading(true);
        try {
            await login(email, password);
            navigate(from, { replace: true });
        } catch (err) {
            setError(err instanceof Error ? err.message : t("login_error_generic"));
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <LoginForm
            isLoading={isLoading}
            error={error}
            onSubmit={handleSubmit}
        />
    );
}
