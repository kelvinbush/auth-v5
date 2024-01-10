import type { NextAuthConfig } from 'next-auth'
import { LoginSchema } from '@/schemas'
import { getUserByEmail } from '@/data/user'
import bcrypt from 'bcryptjs'
import Credentials from 'next-auth/providers/credentials'

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedCredentials = LoginSchema.safeParse(credentials)

        if (!validatedCredentials.success) return null

        const { email, password } = validatedCredentials.data
        const user = await getUserByEmail(email)

        if (!user || !user.password) return null

        const isValidPassword = await bcrypt.compare(password, user.password)

        if (isValidPassword) return user

        return null
      }
    })
  ]
} satisfies NextAuthConfig
