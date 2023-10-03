'use client'

import { useQuery } from '@tanstack/react-query'
import { USAGE_QUERY_KEY } from '@/lib/constants'
import { getUsage } from '@/lib/fetch/usage'

export function UsageDisplay() {
  const { data: usage } = useQuery([USAGE_QUERY_KEY], getUsage, {
    refetchInterval: 30 * 1000,
    refetchOnWindowFocus: true,
    refetchOnMount: true
  })

  if (!usage) return null

  const { totalSpentThisMonth, totalSpentLastMonth, totalSpent } = usage

  return (
    <>
      {totalSpentThisMonth && totalSpentThisMonth > 0 && (
        <div className="mt-2 text-xs text-slate-500">
          ${totalSpentThisMonth.toFixed(2)} This Month
        </div>
      )}
      {totalSpentLastMonth && totalSpentLastMonth > 0 && (
        <div className="mt-2 text-xs text-slate-500">
          ${totalSpentLastMonth.toFixed(2)} Last Month
        </div>
      )}
      {totalSpent && totalSpent > 0 && (
        <div className="text-xs text-slate-500">
          ${totalSpent.toFixed(2)} Total
        </div>
      )}
    </>
  )
}