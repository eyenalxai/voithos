import { db } from '@/lib/database'
import { eq } from 'drizzle-orm'
import { allowedUsers } from '@/lib/schema'

export const checkIfUserIsAllowed = async (email: string) => {
  const allowedUser = await db.query.allowedUsers.findFirst({
    where: eq(allowedUsers.email, email)
  })

  return allowedUser !== undefined
}

export const getAllowedUsers = async () => {
  return db.query.allowedUsers.findMany()
}

export const deleteAllowedUserById = async (allowedUserId: number) => {
  return db.delete(allowedUsers).where(eq(allowedUsers.id, allowedUserId))
}

export const upsertAllowedUser = async (email: string) => {
  return db
    .insert(allowedUsers)
    .values({
      email: email
    })
    .onConflictDoNothing()
    .returning({ insertedId: allowedUsers.id })
}
