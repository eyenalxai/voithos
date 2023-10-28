'use client'

import { useQuery } from '@tanstack/react-query'
import { USAGE_QUERY_KEY } from '@/lib/constants'
import { getUsage } from '@/lib/fetch/usage'
import { PRICE_THRESHOLD } from '@/lib/pricing'

export function UsageDisplay() {
  const { data: usage } = useQuery({
    queryKey: [USAGE_QUERY_KEY],
    queryFn: getUsage,
    refetchInterval: 30 * 1000,
    refetchOnWindowFocus: true,
    refetchOnMount: true
  })

  if (!usage) return null

  const { totalSpentThisMonth, totalSpentLastMonth, totalSpent } = usage

  return (
    <>
      {totalSpentThisMonth && totalSpentThisMonth > PRICE_THRESHOLD && (
        <div className="mt-2 text-sm text-slate-500">
          ${totalSpentThisMonth.toFixed(2)} This Month
        </div>
      )}
      {totalSpentLastMonth && totalSpentLastMonth > PRICE_THRESHOLD && (
        <div className="mt-2 text-sm text-slate-500">
          ${totalSpentLastMonth.toFixed(2)} Last Month
        </div>
      )}
      {totalSpent && totalSpent > PRICE_THRESHOLD && (
        <div className="text-sm text-slate-500">
          ${totalSpent.toFixed(2)} Total
        </div>
      )}
    </>
  )
}
