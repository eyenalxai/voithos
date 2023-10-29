'use server'

import { retrieveUserFromSession } from '@/lib/session'
import { upsertUserSystemMessage } from '@/lib/query/system-message'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import {
  deleteAllowedUserById,
  upsertAllowedUser
} from '@/lib/query/allowed-user'

export const saveSystemMessage = async (content: string) => {
  const user = await retrieveUserFromSession()

  if (!user) {
    redirect('/sign-in')
  }
  await upsertUserSystemMessage(content, user.id)
  revalidatePath('/profile')
}

export const addAllowedUser = async (email: string) => {
  const user = await retrieveUserFromSession()

  if (!user) {
    redirect('/sign-in')
  }

  await upsertAllowedUser(email)
  revalidatePath('/profile')
}

export const deleteAllowedUser = async (allowedUserId: number) => {
  const user = await retrieveUserFromSession()

  if (!user) {
    redirect('/sign-in')
  }

  await deleteAllowedUserById(allowedUserId)
  revalidatePath('/profile')
}

export const revalidateChat = async () => {
  console.log('revalidating chat')
  revalidatePath(`/chat/[uuid4]`, 'page')
}
