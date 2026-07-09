import api from "./api";
import { getAuth } from "./token.service";

export async function getHome() {
  const auth = await getAuth();

  console.log("Auth from SecureStore:", auth);

  const response = await api.get("/me/home", {
    headers: {
      "X-USER-ID": auth?.userId,
    },
  });

  return response.data;
}