import api from "./api";

export async function login(email: string, password: string) {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  return response.data;
}

export async function register(data: {
  fullName: string;
  email: string;
  password: string;
}) {
  const response = await api.post("/auth/register", data);
  return response.data;
}