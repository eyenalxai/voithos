import { fetcher } from '@/lib/fetch/fetcher'
import { SystemMessage } from '@prisma/client'

export const getSystemMessage = async () => {
  return fetcher<SystemMessage>('/api/system-message')
}

export const setSystemMessage = async (content: string) => {
  return fetcher('/api/system-message', {
    method: 'POST',
    body: JSON.stringify({
      content
    })
  })
}
