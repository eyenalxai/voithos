import { createEnv } from '@t3-oss/env-core'
import * as z from 'zod'

export const openAiConfig = createEnv({
  server: {
    OPENAI_API_KEY: z.string()
  },
  runtimeEnv: process.env
})
