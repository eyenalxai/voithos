import type { Config } from 'drizzle-kit'
import { appConfig } from './lib/app-config'

export default {
  schema: './lib/schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: appConfig.DATABASE_URL
  }
} satisfies Config
