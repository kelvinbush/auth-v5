'use server'
import * as z from 'zod'
import { RegisterSchema } from '@/schemas'

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validation = RegisterSchema.safeParse(values)

  if (!validation.success) {
    return {
      error: 'Invalid input'
    }
  }

  return {
    success: 'Email sent'
  }
}
