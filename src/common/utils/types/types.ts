export type JWTPayloadTypes = {
    sub: string;
    name: string;
    email: string;
    isEmailVerified?: boolean;
    
};


export type AccessTokentype = {
    access_token: string;
};