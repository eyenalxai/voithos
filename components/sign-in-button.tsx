'use client'

import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'

export const SignInButton = () => {
  return (
    <Button
      variant={'outline'}
      onClick={() =>
        signIn('github', {
          callbackUrl: '/'
        })
      }
    >
      Sign in via GitHub
    </Button>
  )
}
