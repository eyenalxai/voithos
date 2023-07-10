import { cn } from '@/lib/utils'
import { SignInButton } from '@/components/sign-in-button'

export default function SignInPage() {
  return (
    <div
      className={cn(
        'flex',
        'flex-col',
        'gap-4',
        'mt-24',
        'items-center',
        'justify-center'
      )}
    >
      <h3>If you haven&apos;t been invited, please don&apos;t try</h3>
      <SignInButton />
    </div>
  )
}
