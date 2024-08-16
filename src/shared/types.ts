export type TokensType = {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
};

export type JwtPayloadType = {
  id: string;
  iat: number;
  exp: number;
};
