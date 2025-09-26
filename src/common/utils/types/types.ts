export type Tokens = { 
    access_token: string;
    refresh_token: string };


export type JWTPayloadTypes = {
    sub: string;
    name: string;
    email: string;
    isEmailVerified?: boolean;
};


export type AccessTokentype = {
    access_token: string;
};

export type RefreshPayload = {
  sub: string;
  type: 'refresh';
};

export type RefreshTokentype = {
    refresh_token: string;
};

export type EmailVerifyPayloadTypes = {
  sub: string;
  type: 'email-verify';
};

export type EmailVerifyTokenType = {
    emailVerifyToken: string;
}