"use server";
import { auth as clerkAuth } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { getUserByApiKey } from "./api-key";
import { db } from "../db";

/**
 * @description This function is used to get the user object from the database based on the API key or the Clerk authentication
 * @returns returns the user object
 */
export const sharedAuth = () => {
  const currentHeaders = headers();
  const apiKey = currentHeaders.get("x-api-key");
  if (apiKey) {
    return getUserByApiKey(apiKey);
  }
  const { userId } = clerkAuth();
  if (!userId) return Promise.resolve(null);
  const user = db.query.users
    .findFirst({
      where: (tb, op) => op.eq(tb.id, userId),
    })
    .then((user) => user ?? null)
    .catch(() => null);
  return user;
};
