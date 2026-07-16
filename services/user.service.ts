import api from "./api";

export async function getUserDashboard() {
  const response = await api.get("/users/me/dashboard");
  return response.data;
}
