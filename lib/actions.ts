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
  revalidatePath('/settings')
}

export const addAllowedUser = async (email: string) => {
  const user = await retrieveUserFromSession()

  if (!user) {
    redirect('/sign-in')
  }

  await upsertAllowedUser(email)
  revalidatePath('/settings')
}

export const deleteAllowedUser = async (allowedUserId: number) => {
  const user = await retrieveUserFromSession()

  if (!user) {
    redirect('/sign-in')
  }

  await deleteAllowedUserById(allowedUserId)
  revalidatePath('/settings')
}
