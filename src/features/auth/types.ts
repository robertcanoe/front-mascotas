export type AuthUser = {
  id: number | string;
  nombre: string;
  email: string;
  rol: string;
};

export type AuthLoginResponse = {
  message: string;
  data: {
    token: string;
    token_type: "Bearer";
    expires_in: number;
    user: AuthUser;
  };
};

export type AuthLoginPayload = {
  email: string;
  password: string;
};
