import { db } from '@/lib/database'
import { eq } from 'drizzle-orm'
import { systemMessages } from '@/lib/schema'

export const getSystemMessageByUserId = async (userId: number) => {
  return db.query.systemMessages.findFirst({
    where: eq(systemMessages.userId, userId)
  })
}

export const upsertUserSystemMessage = async (
  message: string,
  userId: number
) => {
  return db
    .insert(systemMessages)
    .values({
      userId: userId,
      content: message
    })
    .onConflictDoUpdate({
      target: systemMessages.userId,
      set: {
        content: message
      }
    })
    .returning({ insertedUserId: systemMessages.userId })
}
