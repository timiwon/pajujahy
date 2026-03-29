import { useAuth } from "@/hooks/use-auth";
import type { User } from "@/services/user.service";

interface UseCurrentUserResult {
    user: User | null;
    loading: boolean;
    error: string | null;
}

/** Returns the currently authenticated user from the auth session. */
export function useCurrentUser(): UseCurrentUserResult {
    const { user, isLoading } = useAuth();
    return { user, loading: isLoading, error: null };
}
