"use server";

import { nanoid } from "nanoid";
import { db } from "../db";
import { userApiKeys } from "../db/schema";

/**
 * @description Creates a new api key for a user that is only stored in hashed form
 * @param userId - the user id to create the api key for
 * @returns the unhashed api key
 */
export const createApiKey = async (userId: string) => {
  const unhasedKey = nanoid(42);
  const hashedKeyBuffer = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(unhasedKey),
  );
  const hashedKey = Buffer.from(hashedKeyBuffer).toString("base64");
  const newKey = await db
    .insert(userApiKeys)
    .values({
      userId,
      key: hashedKey,
      createdAt: new Date(),
    })
    .returning();
  if (!newKey.at(0)) throw new Error("Failed to create API key");
  return unhasedKey;
};

/**
 * @description Gets the user associated with an api key
 * @param unhasedKey - the unhashed api key
 * @returns
 */
export const getUserByApiKey = async (unhasedKey: string) => {
  const hashedKeyBuffer = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(unhasedKey),
  );
  const hashedKey = Buffer.from(hashedKeyBuffer).toString("base64");
  const { user } =
    (await db.query.userApiKeys.findFirst({
      where: (tb, op) => op.eq(tb.key, hashedKey),
      with: { user: true },
    })) ?? {};
  return user ?? null;
};
