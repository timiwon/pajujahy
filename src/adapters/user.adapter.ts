import { UserApi } from "@/external/user-api-v1";
import { type User } from "@/services/user.service";

export interface IUserPort {
    getCurrentUser(): Promise<User>;
}

export class UserAdapter implements IUserPort {
    private readonly api: UserApi;

    constructor(api: UserApi) {
        this.api = api;
    }

    async getCurrentUser(): Promise<User> {
        const raw = await this.api.getCurrentUser();
        return {
            email: raw.email,
            displayName: raw.display_name,
        };
    }
}
