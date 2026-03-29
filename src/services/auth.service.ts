import { AuthApi } from "@/external/auth-api-v1";
import type { User } from "@/services/user.service";

const TOKEN_KEY = "cyon_auth_token";
const api = new AuthApi();

interface JwtPayload {
    sub: string;
    email: string;
    exp: number;
}

function decodePayload(token: string): JwtPayload | null {
    try {
        const [, payload] = token.split(".");
        return JSON.parse(atob(payload)) as JwtPayload;
    } catch {
        return null;
    }
}

function isExpired(payload: JwtPayload): boolean {
    return payload.exp < Math.floor(Date.now() / 1000);
}

export const authService = {
    async login(email: string, password: string): Promise<User> {
        const { token } = await api.login({ email, password });
        localStorage.setItem(TOKEN_KEY, token);
        const payload = decodePayload(token)!;
        return { email: payload.email, displayName: payload.email };
    },

    logout(): void {
        localStorage.removeItem(TOKEN_KEY);
    },

    /** Returns the stored user if a valid, non-expired token exists. */
    getSessionUser(): User | null {
        const token = localStorage.getItem(TOKEN_KEY);
        if (!token) return null;

        const payload = decodePayload(token);
        if (!payload || isExpired(payload)) {
            localStorage.removeItem(TOKEN_KEY);
            return null;
        }

        return { email: payload.email, displayName: payload.email };
    },
};
