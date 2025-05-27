"use server";

import { cookies } from "next/headers";

export const getToken = async () =>
  (await cookies()).get("token")?.value || null;
