import { UserAdapter } from "@/adapters/user.adapter";
import { UserApi } from "@/external/user-api-v1";

export interface User {
    email: string;
    displayName: string;
}

const adapter = new UserAdapter(new UserApi());

export async function fetchCurrentUser(): Promise<User> {
    return adapter.getCurrentUser();
}
