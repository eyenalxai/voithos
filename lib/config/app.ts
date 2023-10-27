import { createEnv } from '@t3-oss/env-core'
import * as z from 'zod'

export const appConfig = createEnv({
  server: {
    ADMIN_EMAILS: z.string().transform(val => JSON.parse(val))
  },
  runtimeEnv: process.env
})
