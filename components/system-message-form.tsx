'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

import { useSystemMessage } from '@/lib/hook/system-message'
import { cn } from '@/lib/utils'
import { IconBxsErrorCircle, IconCheckCircle } from '@/components/ui/icons'
import { SystemMessage } from '@/lib/schema'

const schema = z.object({
  content: z.string().min(5).max(1024)
})

type SystemMessageFormProps = {
  initialSystemMessage: SystemMessage | undefined
}

export function SystemMessageForm({
  initialSystemMessage
}: SystemMessageFormProps) {
  const {
    systemMessage,
    setSystemMessageMutation,
    isPending,
    isSuccess,
    isError
  } = useSystemMessage(initialSystemMessage)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema)
  })

  if (!systemMessage) return null

  const errorMessage = errors.content?.message?.toString()

  return (
    <form
      className="mt-12"
      onSubmit={handleSubmit(data => setSystemMessageMutation(data.content))}
    >
      <h2 className="mx-4 my-2">System Message</h2>
      <Textarea
        className={cn('w-full', 'h-96')}
        {...register('content')}
        defaultValue={systemMessage?.content}
      />
      <div className={cn('flex', 'flex-row', 'items-center')}>
        <Button
          disabled={isPending || errors.content !== undefined}
          type="submit"
          variant="ghost"
          className={cn('m-2')}
        >
          Save
        </Button>
        {(errorMessage || isError) && (
          <>
            <IconBxsErrorCircle className={cn('w-8', 'h-8', 'fill-red-500')} />
            {errorMessage !== undefined && (
              <p className={cn('text-red-500', 'mx-4', 'text-sm')}>
                {errorMessage}
              </p>
            )}
          </>
        )}
        {isSuccess && <IconCheckCircle className={cn('w-8', 'h-8')} />}
      </div>
    </form>
  )
}
