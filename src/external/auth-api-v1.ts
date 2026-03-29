export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}

/** Creates a mock JWT with a 24-hour expiry. */
function createMockToken(email: string): string {
    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
    const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24;
    const payload = btoa(JSON.stringify({ sub: "1", email, exp }));
    return `${header}.${payload}.mock-signature`;
}

export class AuthApi {
    async login(req: LoginRequest): Promise<LoginResponse> {
        await new Promise((resolve) => setTimeout(resolve, 400));

        // Mock: any email + password "password" succeeds
        if (req.password !== "password") {
            throw new Error("Invalid email or password");
        }

        return { token: createMockToken(req.email) };
    }
}
