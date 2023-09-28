import { fetcher } from '@/lib/fetch/fetcher'
import { Usage } from '@/lib/actions'

export const getUsage = async () => {
  return fetcher<Usage>('/api/usage')
}
