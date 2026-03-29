import { createContext, useContext, useEffect, useState } from "react";

import { authService } from "@/services/auth.service";
import type { User } from "@/services/user.service";

interface AuthContextValue {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Restore session from localStorage on first load
    useEffect(() => {
        const sessionUser = authService.getSessionUser();
        if (sessionUser) setUser(sessionUser);
        setIsLoading(false);
    }, []);

    async function login(email: string, password: string) {
        const loggedInUser = await authService.login(email, password);
        setUser(loggedInUser);
    }

    function logout() {
        authService.logout();
        setUser(null);
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: user !== null,
                isLoading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext(): AuthContextValue {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuthContext must be used inside AuthProvider");
    return ctx;
}
