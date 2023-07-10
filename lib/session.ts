import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const retrieveUserFromSession = async () => {
  const session = await getServerSession(authOptions)

  // @ts-ignore
  if (!session?.id) return null

  // @ts-ignore
  const user = await prisma.user.findUnique({ where: { id: session.id } })

  if (!user) return null

  return user
}
