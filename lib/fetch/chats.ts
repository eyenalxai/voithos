import { fetcher } from '@/lib/fetch/fetcher'
import { Chat } from '@prisma/client'

export const getChats = async () => {
  return fetcher<Chat[]>('/api/chats')
}

export const deleteAllChats = async () => {
  return fetcher('/api/chats', {
    method: 'DELETE'
  })
}

export const deleteChat = async (chatId: string) => {
  return fetcher(`/api/chat?chatId=${chatId}`, {
    method: 'DELETE'
  })
}
