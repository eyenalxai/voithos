import { createEnv } from '@t3-oss/env-core'
import * as z from 'zod'

export const databaseConfig = createEnv({
  server: {
    DATABASE_URL: z.string()
  },
  runtimeEnv: process.env
})
