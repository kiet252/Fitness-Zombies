import * as SecureStore from "expo-secure-store";

const AUTH_KEY = "auth";

export type AuthData = {
  userId: string;
  fullName: string;
  email: string;
  token: string;
};

export async function saveAuth(data: AuthData) {
  await SecureStore.setItemAsync(
    AUTH_KEY,
    JSON.stringify(data)
  );
}

export async function getAuth(): Promise<AuthData | null> {
  const value = await SecureStore.getItemAsync(AUTH_KEY);

  if (!value) return null;

  return JSON.parse(value);
}

export async function getToken() {
  const auth = await getAuth();
  return auth?.token ?? null;
}

export async function removeAuth() {
  await SecureStore.deleteItemAsync(AUTH_KEY);
}