import { getServerSession, Session as NextAuthSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { JWT as NextAuthJWT } from 'next-auth/jwt'

export interface Session extends NextAuthSession {
  id: number
}

export interface JWT extends NextAuthJWT {
  id: number
}

export const retrieveUserFromSession = async () => {
  const session = (await getServerSession(authOptions)) as Session | null

  if (!session?.id) return null

  const user = await prisma.user.findUnique({ where: { id: session.id } })

  if (!user) return null

  return user
}
