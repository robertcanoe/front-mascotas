const TOKEN_KEY = "mascotas_auth_token";

let inMemoryToken: string | null = localStorage.getItem(TOKEN_KEY);

export const authStorage = {
  getToken(): string | null {
    return inMemoryToken;
  },
  setToken(token: string) {
    inMemoryToken = token;
    localStorage.setItem(TOKEN_KEY, token);
    window.dispatchEvent(new Event("auth-changed"));
  },
  clearToken() {
    inMemoryToken = null;
    localStorage.removeItem(TOKEN_KEY);
    window.dispatchEvent(new Event("auth-changed"));
  },
};
