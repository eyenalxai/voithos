import { retrieveUserFromSession } from '@/lib/session'
import { NextResponse } from 'next/server'
import { getUsageByUserId } from '@/lib/query/usage'

export const GET = async () => {
  const user = await retrieveUserFromSession()

  if (!user) return new NextResponse('Unauthorized', { status: 401 })

  const { totalSpent, totalSpentThisMonth, totalSpentLastMonth } =
    await getUsageByUserId(user.id)

  return NextResponse.json({
    totalSpent: totalSpent,
    totalSpentThisMonth: totalSpentThisMonth,
    totalSpentLastMonth: totalSpentLastMonth
  })
}
