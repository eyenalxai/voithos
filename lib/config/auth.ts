import { createEnv } from '@t3-oss/env-core'
import * as z from 'zod'

export const authConfig = createEnv({
  server: {
    GITHUB_ID: z.string(),
    GITHUB_SECRET: z.string(),
    NEXTAUTH_SECRET: z.string(),
    NEXTAUTH_URL: z.string()
  },
  runtimeEnv: process.env
})
