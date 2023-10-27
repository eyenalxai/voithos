import { Configuration, OpenAIApi } from 'openai-edge'
import { openAiConfig } from '@/lib/config/openai'

const config = new Configuration({
  apiKey: openAiConfig.OPENAI_API_KEY
})
export const openai = new OpenAIApi(config)
