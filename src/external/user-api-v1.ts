export interface ExternalUser {
    email: string;
    display_name: string;
}

const MOCK_USER: ExternalUser = {
    email: "timiwon@gmail.com",
    display_name: "Timi Won",
};

export class UserApi {
    async getCurrentUser(): Promise<ExternalUser> {
        await new Promise((resolve) => setTimeout(resolve, 300));
        return MOCK_USER;
    }
}
