import { cn } from '@/lib/utils'
import { SignInButton } from '@/components/sign-in-button'

export default function SignInPage() {
  return (
    <div className={cn('flex', 'mt-24', 'items-center', 'justify-center')}>
      <SignInButton />
    </div>
  )
}
