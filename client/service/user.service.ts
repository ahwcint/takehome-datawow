import { apiHandler } from "@/lib/api";

export const signInApi = async (data: { username: string }) => {
  const result = await apiHandler({
    url: "easy-login",
    method: 'post',
    data: { username: data.username, password: "datawow1234" },
  });
  return result;
};
