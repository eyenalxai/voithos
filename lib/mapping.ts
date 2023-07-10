import { Message as DatabaseMessage } from '@prisma/client'
import { Message } from 'ai'

export const mapMessages: (messages: DatabaseMessage[]) => Message[] = (
  messages: DatabaseMessage[]
) => {
  return messages.map(message => {
    return {
      id: message.id.toString(),
      content: message.content,
      role: message.role.toLowerCase()
    } as Message
  })
}
