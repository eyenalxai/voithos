'use client'

import { AllowedUser } from '@/lib/schema'
import { AddAllowedUserForm } from '@/components/profile/allowed-users/add-allowed-user-form'
import { DeleteAllowedUserForm } from '@/components/profile/allowed-users/delete-allowed-user-form'
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
    <div>
      <p className={cn('font-semibold', 'text-lg', 'my-1')}>Allowed Users</p>
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
                'w-80'
              )}
            >
              <p key={allowedUser.id}>{allowedUser.email}</p>
              <DeleteAllowedUserForm allowedUser={allowedUser} />
            </div>
          )
        })}
        <AddAllowedUserForm />
      </div>
    </div>
  )
}
