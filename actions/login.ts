'use server'
import * as z from 'zod'
import { LoginSchema } from '@/schemas'

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validation = LoginSchema.safeParse(values)

  if (!validation.success) {
    return {
      error: 'Invalid input'
    }
  }

  return {
    success: 'Email sent'
  }
}
