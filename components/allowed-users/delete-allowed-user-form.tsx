import { Button } from '@/components/ui/button'
import { AllowedUser } from '@/lib/schema'
import { deleteAllowedUser } from '@/lib/actions'

type DeleteAllowedUserFormProps = {
  allowedUser: AllowedUser
}

export const DeleteAllowedUserForm = ({
  allowedUser
}: DeleteAllowedUserFormProps) => {
  const onSubmit = async () => {
    await deleteAllowedUser(allowedUser.id)
  }

  return (
    <form action={onSubmit}>
      <Button size={'sm'} variant={'outline'}>
        Delete
      </Button>
    </form>
  )
}
