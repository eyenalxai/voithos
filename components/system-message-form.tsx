'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

import { useSystemMessage } from '@/lib/hook/system-message'
import { cn } from '@/lib/utils'

const schema = z.object({
  content: z.string()
})

export function SystemMessageForm() {
  const { systemMessage, setSystemMessageMutation } = useSystemMessage()

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
      {errors.content?.message && <p>{errors.content?.message.toString()}</p>}
      <Button type="submit" variant="ghost" className="m-2">
        Save
      </Button>
    </form>
  )
}
