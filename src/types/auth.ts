export interface LoginRequest {
    username: string; // or email
    password: string;
}

export interface LoginResponse {
    token: string;
    // add other fields like user info if needed
}
