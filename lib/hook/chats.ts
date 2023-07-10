import { useMutation, useQuery, useQueryClient } from 'react-query'
import { CHATS_QUERY_KEY } from '@/lib/constants'
import { deleteAllChats, deleteChat, getChats } from '@/lib/fetch/chats'
import { Chat } from '@prisma/client'

export const useChats = () => {
  const queryClient = useQueryClient()
  const { data: chats } = useQuery([CHATS_QUERY_KEY], getChats)

  const { mutate: deleteAllChatsMutation } = useMutation({
    mutationFn: async () => await deleteAllChats(),
    onMutate: async () => {
      await queryClient.cancelQueries([CHATS_QUERY_KEY])
      const chats = queryClient.getQueryData([CHATS_QUERY_KEY])

      queryClient.setQueryData(
        [CHATS_QUERY_KEY],
        (_old: Chat[] | undefined) => {
          return []
        }
      )

      return { chats }
    },
    onError: (_error, _var, context) => {
      if (context) {
        queryClient.setQueryData([CHATS_QUERY_KEY], context.chats)
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: [CHATS_QUERY_KEY]
      })
    }
  })

  const { mutate: deleteChatMutation } = useMutation({
    mutationFn: async (id: string) => await deleteChat(id),
    onMutate: async (id: string) => {
      await queryClient.cancelQueries([CHATS_QUERY_KEY])
      const chats = queryClient.getQueryData([CHATS_QUERY_KEY])

      queryClient.setQueryData([CHATS_QUERY_KEY], (old: Chat[] | undefined) => {
        return old ? old.filter(chat => chat.id !== id) : []
      })

      return { chats }
    },
    onError: (_error, _var, context) => {
      if (context) {
        queryClient.setQueryData([CHATS_QUERY_KEY], context.chats)
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: [CHATS_QUERY_KEY]
      })
    }
  })

  return {
    chats,
    deleteChatMutation,
    deleteAllChatsMutation
  }
}
