import type { Config } from 'drizzle-kit'
import { databaseConfig } from '@/lib/config/database'

export default {
  schema: './lib/schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: databaseConfig.DATABASE_URL
  }
} satisfies Config
