'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { SystemMessage } from '@/lib/schema'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { DEFAULT_SYSTEM_MESSAGE_CONTENT } from '@/lib/constants'
import { saveSystemMessage } from '@/lib/actions'
import { cn } from '@/lib/utils'

export const SystemMessageFormSchema = z.object({
  content: z.string().min(5).max(1024)
})

type SystemMessageFormProps = {
  initialSystemMessage: SystemMessage | undefined
}

export function SystemMessageForm({
  initialSystemMessage
}: SystemMessageFormProps) {
  const form = useForm<z.infer<typeof SystemMessageFormSchema>>({
    resolver: zodResolver(SystemMessageFormSchema)
  })

  const onSubmit = async (values: z.infer<typeof SystemMessageFormSchema>) => {
    await saveSystemMessage(values.content)
  }

  return (
    <div className={cn('flex', 'flex-col', 'items-start', 'gap-2')}>
      <p className={cn('font-semibold', 'text-lg')}>Settings</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={cn('font-semibold')}>
                  System Message
                </FormLabel>
                <FormControl>
                  <Textarea
                    className={cn('h-96', 'resize-y')}
                    defaultValue={
                      initialSystemMessage?.content ||
                      DEFAULT_SYSTEM_MESSAGE_CONTENT
                    }
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Customize your interactions with ChatGPT by providing specific
                  details and guidelines for your chats
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
            {form.formState.isSubmitting ? 'Saving...' : 'Save'}
          </Button>
        </form>
      </Form>
    </div>
  )
}
