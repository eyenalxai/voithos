import { db } from '@/lib/database'
import { ChatGPTModel, chats, messages } from '@/lib/schema'
import { desc, eq, inArray } from 'drizzle-orm'
import { deleteMessagesByChatId } from '@/lib/query/message'

export const getChatById = async (chatId: string) => {
  return db.query.chats.findFirst({
    where: eq(chats.id, chatId),
    with: {
      messages: true
    }
  })
}

export const getChatsByUserId = async (userId: number) => {
  return db.query.chats.findMany({
    where: eq(chats.userId, userId),
    orderBy: [desc(chats.createdAt)]
  })
}

export const deleteAllChatsByUserId = async (userId: number) => {
  const userChats = await getChatsByUserId(userId)

  await db.delete(messages).where(
    inArray(
      messages.chatId,
      userChats.map(chat => chat.id)
    )
  )

  return db.delete(chats).where(eq(chats.userId, userId))
}

export const deleteChatById = async (chatId: string) => {
  await deleteMessagesByChatId(chatId)
  return db.delete(chats).where(eq(chats.id, chatId))
}

export const upsertChat = (
  chatId: string,
  title: string,
  userId: number,
  lastUsedModel: ChatGPTModel
) => {
  return db
    .insert(chats)
    .values({
      id: chatId,
      title: title,
      userId: userId,
      lastUsedModel: lastUsedModel
    })
    .onConflictDoUpdate({
      target: chats.id,
      set: {
        lastUsedModel: lastUsedModel
      }
    })
    .returning({ insertedChatId: chats.id })
}
