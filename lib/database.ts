import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from '@/lib/schema'
import { databaseConfig } from '../lib/config/database'

const queryClient = postgres(databaseConfig.DATABASE_URL)
export const db = drizzle(queryClient, {
  schema
})
