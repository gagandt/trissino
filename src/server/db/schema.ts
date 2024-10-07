import { relations } from "drizzle-orm";
import {
  index,
  integer,
  sqliteTable,
  sqliteTableCreator,
  text,
} from "drizzle-orm/sqlite-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator((name) => `trissino_${name}`);

export const users = sqliteTable(
  "users",
  {
    id: text("id").primaryKey().notNull(),
  },
  () => ({}), // Removed unused parameter 'tb'
);

export const userApiKeys = sqliteTable(
  "user_api_keys",
  {
    userId: text("user_id").notNull(),
    key: text("key").primaryKey().notNull(),
    createdAt: integer("created_at", {
      mode: "timestamp_ms",
    }).notNull(),
  },
  (tb) => ({
    userIdIdx: index("user_api_keys_userId_idx").on(tb.userId),
  }),
);

export const userApiKeysRelations = relations(userApiKeys, ({ one }) => ({
  user: one(users, {
    fields: [userApiKeys.userId],
    references: [users.id],
  }),
}));