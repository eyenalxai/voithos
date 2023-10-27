import { fetcher } from '@/lib/fetch/fetcher'
import { SystemMessage } from '@/lib/schema'

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
