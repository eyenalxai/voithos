import { Role } from '@prisma/client'
import { prisma } from '@/lib/prisma'

export const saveMessage = async (
  chatId: string,
  content: string,
  role: Role
) => {
  await prisma.message.create({
    data: {
      content: content,
      role: role,
      chatId: chatId
    }
  })
}
