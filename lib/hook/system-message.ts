'use client'

import { SYSTEM_MESSAGE_QUERY_KEY } from '@/lib/constants'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getSystemMessage, setSystemMessage } from '@/lib/fetch/system-message'
import { SystemMessage } from '@prisma/client'

export const useSystemMessage = (
  initialSystemMessage?: SystemMessage | null
) => {
  const queryClient = useQueryClient()
  const { data: systemMessage } = useQuery({
    queryKey: [SYSTEM_MESSAGE_QUERY_KEY],
    queryFn: getSystemMessage,
    initialData: initialSystemMessage,
    staleTime: Infinity
  })

  const {
    mutate: setSystemMessageMutation,
    isPending,
    isSuccess,
    isError
  } = useMutation({
    mutationFn: async (content: string) => await setSystemMessage(content),
    onMutate: async (_content: string) => {
      await queryClient.cancelQueries({ queryKey: [SYSTEM_MESSAGE_QUERY_KEY] })
      const oldSystemMessage = queryClient.getQueryData([
        SYSTEM_MESSAGE_QUERY_KEY
      ])
      return { oldSystemMessage }
    },
    onError: (_error, _variables, context) => {
      if (context) {
        queryClient.setQueryData(
          [SYSTEM_MESSAGE_QUERY_KEY],
          context.oldSystemMessage
        )
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: [SYSTEM_MESSAGE_QUERY_KEY]
      })
    }
  })

  return {
    systemMessage,
    setSystemMessageMutation: setSystemMessageMutation as (
      content: string
    ) => Promise<void>,
    isPending,
    isSuccess,
    isError
  }
}
