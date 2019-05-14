export interface JwtPayload {
  user: {
    email: string;
    password: string;
  }
}
