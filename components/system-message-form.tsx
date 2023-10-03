'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

import { useSystemMessage } from '@/lib/hook/system-message'
import { cn } from '@/lib/utils'
import { IconBxsErrorCircle, IconCheckCircle } from '@/components/ui/icons'

const schema = z.object({
  content: z.string().min(5).max(1024)
})

export function SystemMessageForm() {
  const {
    systemMessage,
    setSystemMessageMutation,
    isLoading,
    isSuccess,
    isError
  } = useSystemMessage()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema)
  })

  if (!systemMessage) return null

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
          disabled={isLoading || errors.content !== undefined}
          type="submit"
          variant="ghost"
          className={cn('m-2')}
        >
          Save
        </Button>
        {errors.content?.message !== undefined && (
          <>
            <IconBxsErrorCircle className={cn('w-8', 'h-8', 'fill-red-500')} />
            <p className={cn('text-red-500', 'mx-4', 'text-sm')}>
              {errors.content.message.toString()}
            </p>
          </>
        )}
        {isSuccess && <IconCheckCircle className={cn('w-8', 'h-8')} />}
      </div>
    </form>
  )
}
