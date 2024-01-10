'use server'
import * as z from 'zod'
import { RegisterSchema } from '@/schemas'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { getUserByEmail } from '@/data/user'

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validation = RegisterSchema.safeParse(values)

  if (!validation.success) {
    return {
      error: 'Invalid input'
    }
  }

  const { email, password, name } = validation.data
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return {
      error: 'Email already in use'
    }
  }

  await db.user.create({
    data: {
      email,
      password: hashedPassword,
      name
    }
  })

  //TODO: Send email

  return {
    success: 'User created'
  }
}
