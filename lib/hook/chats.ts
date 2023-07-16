import { CHATS_QUERY_KEY } from '@/lib/constants'
import { deleteAllChats, deleteChat, getChats } from '@/lib/fetch/chats'
import { Chat } from '@prisma/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useChats = () => {
  const queryClient = useQueryClient()
  const { data: chats } = useQuery([CHATS_QUERY_KEY], getChats)

  const { mutate: deleteChatMutation } = useMutation({
    mutationFn: async (id?: string) =>
      id !== undefined ? await deleteChat(id) : await deleteAllChats(),
    onMutate: async (id?: string) => {
      await queryClient.cancelQueries([CHATS_QUERY_KEY])
      const chats = queryClient.getQueryData([CHATS_QUERY_KEY])

      queryClient.setQueryData(
        [CHATS_QUERY_KEY],
        (oldChats: Chat[] | undefined) => {
          if (id !== undefined && oldChats !== undefined)
            return oldChats.filter((chat: Chat) => chat.id !== id)
          return []
        }
      )

      return { chats }
    },
    onError: (_error, _variables, context) => {
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
    deleteChatMutation: deleteChatMutation as (id: string) => Promise<void>,
    deleteAllChatsMutation: deleteChatMutation as () => Promise<void>
  }
}
