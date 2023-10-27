'use server'

import { User } from '@/lib/schema'
import { appConfig } from '@/lib/config/app'

export const isUserAdmin = (user: User) =>
  appConfig.ADMIN_EMAILS.includes(user.email)
