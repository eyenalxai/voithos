import { fetcher } from '@/lib/fetch/fetcher'
import { Chat } from '@prisma/client'

export const getChats = async () => {
  return fetcher<Chat[]>('/api/chats')
}

export const deleteChats = async () => {
  return fetcher('/api/chats', {
    method: 'DELETE'
  })
}
