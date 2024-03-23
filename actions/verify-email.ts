'use server'

import { getUserByEmail } from '@/data/user'
import { getVerificationTokenByToken } from '@/data/verification-token'
import { db } from '@/lib/db'

export const verifyEmail = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token)

  if (!existingToken) return { error: 'Invalid token' }

  if (existingToken.expire < new Date()) return { error: 'Token expired' }

  const existingUser = await getUserByEmail(existingToken.email)

  if (!existingUser) return { error: 'User not found' }

  await db.user.update({
    where: { email: existingToken.email },
    data: {
      emailVerified: new Date(),
      email: existingToken.email
    }
  })

  await db.verificationToken.delete({
    where: { id: existingToken.id }
  })

  return { success: 'Email verified' }
}
