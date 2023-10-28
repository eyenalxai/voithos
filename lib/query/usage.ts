import { db } from '@/lib/database'
import { usage } from '@/lib/schema'
import { and, eq, gte, lte, sql } from 'drizzle-orm'

export type Usage = {
  totalSpent: number | null
  totalSpentThisMonth: number | null
  totalSpentLastMonth: number | null
}

export const getUsageByUserId = async (userId: number): Promise<Usage> => {
  const totalSpentResult = await db
    .select({
      totalSpent: sql<number>`sum(${usage.priceUSD})`
    })
    .from(usage)
    .where(eq(usage.userId, userId))

  const date = new Date()
  const firstDayThisMonth = new Date(date.getFullYear(), date.getMonth(), 1)
  const lastDayThisMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0)

  const totalSpentThisMonthResult = await db
    .select({
      totalSpentThisMonth: sql<number>`sum(${usage.priceUSD})`
    })
    .from(usage)
    .where(
      and(
        and(
          gte(usage.createdAt, firstDayThisMonth),
          lte(usage.createdAt, lastDayThisMonth)
        ),
        eq(usage.userId, userId)
      )
    )

  const firstDayLastMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1)
  const lastDayLastMonth = new Date(date.getFullYear(), date.getMonth(), 0)

  const totalSpentLastMonthResult = await db
    .select({
      totalSpentLastMonth: sql<number>`sum(${usage.priceUSD})`
    })
    .from(usage)
    .where(
      and(
        and(
          gte(usage.createdAt, firstDayLastMonth),
          lte(usage.createdAt, lastDayLastMonth)
        ),
        eq(usage.userId, userId)
      )
    )

  return {
    totalSpent: totalSpentResult[0].totalSpent,
    totalSpentThisMonth: totalSpentThisMonthResult[0].totalSpentThisMonth,
    totalSpentLastMonth: totalSpentLastMonthResult[0].totalSpentLastMonth
  }
}
