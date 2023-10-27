'use client'

import { AllowedUser } from '@/lib/schema'
import { AddAllowedUserForm } from '@/components/allowed-users/add-allowed-user-form'
import { DeleteAllowedUserForm } from '@/components/allowed-users/delete-allowed-user-form'
import { cn } from '@/lib/utils'

type AllowedUsersFormProps = {
  isAdmin: boolean
  allowedUsers: AllowedUser[]
}

export const AllowedUsersDisplay = ({
  isAdmin,
  allowedUsers
}: AllowedUsersFormProps) => {
  if (!isAdmin) return null

  return (
    <div className={cn('flex', 'flex-col', 'gap-2')}>
      {allowedUsers.map(allowedUser => {
        return (
          <div
            key={allowedUser.id}
            className={cn(
              'flex',
              'flex-row',
              'justify-between',
              'items-center',
              'w-72'
            )}
          >
            <p key={allowedUser.id}>{allowedUser.email}</p>
            <DeleteAllowedUserForm allowedUser={allowedUser} />
          </div>
        )
      })}
      <AddAllowedUserForm />
    </div>
  )
}