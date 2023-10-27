import {
  integer,
  pgEnum,
  pgTable,
  real,
  serial,
  timestamp,
  varchar
} from 'drizzle-orm/pg-core'
import { relations, sql } from 'drizzle-orm'

export const roleEnum = pgEnum('role', ['user', 'assistant', 'system'])

export type Role = (typeof roleEnum.enumValues)[number]

export const chatGPTModelEnum = pgEnum('chat_gpt_model', [
  'gpt_3_5_turbo',
  'gpt_4'
])

export type ChatGPTModel = (typeof chatGPTModelEnum.enumValues)[number]

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').default(sql`now()`),
  username: varchar('username').unique().notNull(),
  email: varchar('email').unique().notNull()
})

export type User = typeof users.$inferSelect
export type UserInsert = typeof users.$inferInsert

export const usersRelations = relations(users, ({ one, many }) => ({
  chats: many(chats),
  usage: many(usage),
  systemMessage: one(systemMessages, {
    fields: [users.id],
    references: [systemMessages.userId]
  })
}))

export const chats = pgTable('chats', {
  id: varchar('id').primaryKey(),
  createdAt: timestamp('created_at').default(sql`now()`),
  title: varchar('title').notNull(),
  lastUsedModel: chatGPTModelEnum('last_used_model').notNull(),
  userId: integer('user_id').references(() => users.id)
})

export const chatsRelations = relations(chats, ({ one, many }) => ({
  messages: many(messages),
  user: one(users, {
    fields: [chats.userId],
    references: [users.id]
  })
}))

export type Chat = typeof chats.$inferSelect
export type ChatInsert = typeof chats.$inferInsert

export const messages = pgTable('messages', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').default(sql`now()`),
  content: varchar('content').notNull(),
  role: roleEnum('role').notNull(),
  chatId: varchar('chat_id').references(() => chats.id)
})

export type Message = typeof messages.$inferSelect
export type MessageInsert = typeof messages.$inferInsert

export const messagesRelations = relations(messages, ({ one, many }) => ({
  chat: one(chats, {
    fields: [messages.chatId],
    references: [chats.id]
  })
}))

export const usage = pgTable('usage', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').default(sql`now()`),
  chatGPTModel: chatGPTModelEnum('chat_gpt_model').notNull(),
  role: roleEnum('role').notNull(),
  tokensCount: integer('tokens_count').notNull(),
  priceUSD: real('price_usd').notNull(),
  userId: integer('user_id').references(() => users.id)
})

export const usageRelations = relations(usage, ({ one }) => ({
  user: one(users, {
    fields: [usage.userId],
    references: [users.id]
  })
}))

export const systemMessages = pgTable('system_messages', {
  id: serial('id').primaryKey(),
  content: varchar('content').notNull(),
  userId: integer('user_id').references(() => users.id)
})

export type SystemMessage = typeof systemMessages.$inferSelect
