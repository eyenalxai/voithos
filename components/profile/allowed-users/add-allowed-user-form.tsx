import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { addAllowedUser } from '@/lib/actions'

export const AddAllowedUsersFormSchema = z.object({
  email: z
    .string()
    .email()
    .min(3)
    .max(100)
    .transform(v => v.trim().toLowerCase())
})

export const AddAllowedUserForm = () => {
  const form = useForm<z.infer<typeof AddAllowedUsersFormSchema>>({
    resolver: zodResolver(AddAllowedUsersFormSchema)
  })

  const onSubmit = async (
    values: z.infer<typeof AddAllowedUsersFormSchema>
  ) => {
    await addAllowedUser(values.email)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={cn('font-semibold')}>Email</FormLabel>
              <FormControl>
                <Input placeholder="oof@boof.com" {...field} />
              </FormControl>
              <FormDescription>
                Email address of the user you want to allow
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={form.formState.isSubmitting}
          className={cn('mt-4')}
          type="submit"
        >
          {form.formState.isSubmitting ? 'Adding...' : 'Add'}
        </Button>
      </form>
    </Form>
  )
}
