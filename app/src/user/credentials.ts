
export interface LoginCredential {
    username: string;
    password: string;
    store: { dispatch: (action: { type: string, payload: any}) => {} };
}

export interface AccountCredential extends LoginCredential {
    bio?: string;
    verifyPassword: string;
    email: string;
}
