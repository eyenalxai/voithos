'use server'

import { retrieveUserFromSession } from '@/lib/session'
import { upsertUserSystemMessage } from '@/lib/query/system-message'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export const onSubmitFormSystemMessage = async (content: string) => {
  const user = await retrieveUserFromSession()

  if (!user) {
    redirect('/sign-in')
  }
  await upsertUserSystemMessage(content, user.id)
  revalidatePath('/profile')
}
