import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const appConfig = createEnv({
  server: {
    GITHUB_SECRET: z.string(),
    GITHUB_ID: z.string(),
    NEXTAUTH_SECRET: z.string(),
    NEXTAUTH_URL: z.string(),
    DATABASE_URL: z.string(),
    OPENAI_API_KEY: z.string(),
    ADMIN_EMAILS: z.string().transform(val => JSON.parse(val))
  },
  runtimeEnv: process.env
})
