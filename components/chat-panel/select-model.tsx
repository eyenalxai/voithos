'use client'

import { ChatGPTModel } from '@/lib/schema'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

type SelectModelProps = {
  model: ChatGPTModel
  setModel: (model: ChatGPTModel) => void
}

export const SelectModel = ({ model, setModel }: SelectModelProps) => {
  return (
    <Select
      onValueChange={value => setModel(value as ChatGPTModel)}
      defaultValue={model}
    >
      <SelectTrigger className={cn('w-44', 'mt-4')}>
        <SelectValue placeholder="GPT Model" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>GPT Models</SelectLabel>
          <SelectItem value={'gpt_3_5_turbo' as ChatGPTModel}>
            GPT 3.5 Turbo
          </SelectItem>
          <SelectItem value={'gpt_4' as ChatGPTModel}>GPT 4 Turbo</SelectItem>
          <SelectItem value={'gpt_4o' as ChatGPTModel}>GPT-4o</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
