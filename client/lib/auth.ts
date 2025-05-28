"use server";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const JWT_SECRET = process.env.JWT_SECRET || "datawow_jwt_key";

export const verifyToken = async (token: string): Promise<VerifyResponse> => {
  try {
    return jwt.verify(token, JWT_SECRET) as VerifyResponse;
  } catch {
    (await cookies()).delete("token");
    redirect("/");
  }
};

type VerifyResponse = { sub: string; username: string };
