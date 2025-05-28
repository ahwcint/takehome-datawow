import { apiHandler } from "@/lib/api";

export const signInApi = async (data: { username: string }) => {
  const result = await apiHandler<{ id: string; username: string }>({
    url: "easy-login",
    method: "post",
    data: { username: data.username, password: "datawow1234" },
  });
  return result;
};

export const findUserApi = async (id: string) => {
  const result = await apiHandler({
    url: `user/${id}`,
  });
  return result;
};
