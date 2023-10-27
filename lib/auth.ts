import GitHubProvider from 'next-auth/providers/github'
import { NextAuthOptions } from 'next-auth'
import { JWT } from '@/lib/session'
import { saveUser } from '@/lib/query/user'

type GitHubProfile = {
  id: number
  login: string
  email: string
}

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!
    })
  ],
  jwt: {
    maxAge: 60 * 60 * 24 * 30 // 30 days
  },
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/'
  },
  callbacks: {
    // @ts-ignore
    async jwt({ token, profile }: { token: JWT; profile?: GitHubProfile }) {
      if (profile) {
        const allowedEmails = JSON.parse(process.env.ALLOWED_EMAILS || '[]')
        if (
          allowedEmails.length > 0 &&
          !allowedEmails.includes(profile.email)
        ) {
          return Promise.reject(new Error('Not allowed'))
        }

        const user = await saveUser({
          username: profile.login,
          email: profile.email
        })

        token = {
          ...token,
          id: user[0].id
        }
      }
      return token
    },

    async session({ session, token }) {
      return {
        ...session,
        id: token.id
      }
    }
  }
}
