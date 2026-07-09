// services/user.service.ts
import api from "./api";

export async function getUserDashboard() {
  // Your Spring Boot API should have an endpoint that returns the profile, 
  // today's stats, and achievements in one single JSON response.
  // Note: Assuming your `api` (Axios interceptor) already attaches the token from token.service!
  const response = await api.get("/users/me/dashboard");
  return response.data;
}
