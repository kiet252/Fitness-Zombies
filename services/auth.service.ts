import api from "./api";
import { AuthResponse } from "@/types/auth";

export async function login(
  email: string,
  password: string
): Promise<AuthResponse> {
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