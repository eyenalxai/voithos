import { UserUsage } from '@/lib/pricing'
import { TableCell, TableRow } from '@/components/ui/table'

export const RenderUsageItem = ({ username, email, usage }: UserUsage) => {
  const totalSpentThisMonth = (usage.totalSpentThisMonth || 0).toFixed(2)
  const totalSpentLastMonth = (usage.totalSpentLastMonth || 0).toFixed(2)
  const totalSpent = (usage.totalSpent || 0).toFixed(2)

  return (
    <TableRow key={username}>
      <TableCell className="font-medium">{username}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>${totalSpentThisMonth}</TableCell>
      <TableCell>${totalSpentLastMonth}</TableCell>
      <TableCell className="text-right">${totalSpent}</TableCell>
    </TableRow>
  )
}
