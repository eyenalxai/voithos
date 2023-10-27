import { fetcher } from '@/lib/fetch/fetcher'
import { Usage } from '@/lib/query/usage'

export const getUsage = async () => {
  return fetcher<Usage>('/api/usage')
}
