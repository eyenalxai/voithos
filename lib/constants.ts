import { ChatCompletionRequestMessage } from 'openai-edge'

export const CHATS_QUERY_KEY = 'chats'

const SYSTEM_MESSAGE_CONTENT =
  'Be concise and brief, avoid unnecessary explanations, eliminate repetitions, and if requested to edit something, send only the changes'

export const SYSTEM_MESSAGE: ChatCompletionRequestMessage = {
  content: SYSTEM_MESSAGE_CONTENT,
  role: 'system'
}
