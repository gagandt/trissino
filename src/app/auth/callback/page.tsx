import React from "react";
import LoginFailed from "./login-failed";
import { LoginSuccess } from "./login-success";
import { auth } from "@clerk/nextjs/server";
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
