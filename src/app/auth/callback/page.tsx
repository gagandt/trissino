import React from "react";
import { env } from "@/env";
import LoginFailed from "./login-failed";
import { LoginSuccess } from "./login-success";
import { SignJWT } from "jose";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { api } from "@/trpc/server";
import { db } from "@/server/db";
import { unstable_noStore } from "next/cache";
import { userApiKeys } from "@/server/db/schema";
import { nanoid } from "nanoid";
import { createApiKey } from "@/server/utils/api-key";
export const runtime = "edge";

const Page: React.FC<{
  searchParams: Record<string, string | string[] | undefined>;
}> = async ({ searchParams }) => {
  if (typeof searchParams.redirectTo !== "string") return <LoginFailed />;
  const user = auth();
  if (!user.userId) return <LoginFailed />;
  const token = await createApiKey(user.userId);
  const email = user.sessionClaims?.primaryEmail as string | undefined;
  const redirect = `${searchParams.redirectTo}?token=${encodeURIComponent(token)}${email ? `&email=${encodeURIComponent(email)}` : ""}`;

  return <LoginSuccess redirect={redirect} code={token} />;
};

export default Page;
