import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { appConfig } from '@/lib/app-config'
import * as schema from '@/lib/schema'

const queryClient = postgres(appConfig.DATABASE_URL)
export const db = drizzle(queryClient, {
  schema
})
