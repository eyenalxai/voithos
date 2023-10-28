'use client'

import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  compareUserUsage,
  filterUserUsage,
  UsageSortKey,
  UserUsage
} from '@/lib/pricing'
import { RenderUsageItem } from '@/components/render-usage-item'
import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

type SelectSortByProps = {
  setSortBy: (value: UsageSortKey) => void
}

export const SelectSortBy = ({ setSortBy }: SelectSortByProps) => {
  return (
    <Select onValueChange={value => setSortBy(value as UsageSortKey)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="totalSpent">Total</SelectItem>
        <SelectItem value="totalSpentThisMonth">This Month</SelectItem>
        <SelectItem value="totalSpentLastMonth">Last Month</SelectItem>
      </SelectContent>
    </Select>
  )
}

type UsageTableProps = {
  userUsages: UserUsage[]
}

export const UsageTable = ({ userUsages }: UsageTableProps) => {
  const [sortBy, setSortBy] = useState<UsageSortKey>('totalSpentThisMonth')

  return (
    <div className={cn('flex', 'flex-col', 'gap-4')}>
      <SelectSortBy setSortBy={setSortBy} />
      <ScrollArea
        className={cn(
          'w-[80vw]',
          'md:w-fit',
          'whitespace-nowrap',
          'rounded-md',
          'border',
          'p-2'
        )}
      >
        <Table>
          <TableCaption>A list of all users and their usage</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>This Month</TableHead>
              <TableHead>Last Month</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userUsages
              .filter(filterUserUsage)
              .sort((a, b) => {
                return compareUserUsage(a, b, sortBy)
              })
              .map(userUsage => {
                return (
                  <RenderUsageItem
                    key={userUsage.username}
                    username={userUsage.username}
                    email={userUsage.email}
                    usage={userUsage.usage}
                  />
                )
              })}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
