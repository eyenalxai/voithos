import { UserInsert, users } from '@/lib/schema'
import { db } from '@/lib/database'
import { eq } from 'drizzle-orm'

export const saveUser = async (user: UserInsert) => {
  return db
    .insert(users)
    .values(user)
    .onConflictDoUpdate({
      target: users.username,
      set: {
        email: user.email
      }
    })
    .returning({ id: users.id })
}

export const getUserById = async (userId: number) => {
  return db.query.users.findFirst({
    where: eq(users.id, userId)
  })
}
