'use client'
import React, { useState, useTransition } from 'react'
import { CardWrapper } from '@/components/auth/card-wrapper'
import { useForm } from 'react-hook-form'
import { LoginSchema } from '@/schemas'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { FormError } from '@/components/form-error'
import { FormSuccess } from '@/components/form-success'
import { login } from '@/actions/login'
import { useSearchParams } from 'next/navigation'

export const LoginForm = () => {
  const searchParams = useSearchParams()
  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked' ? 'Email already in use with different provider' : ''
  const [isPending, startTransition] = useTransition()
  const [success, setSuccess] = useState<string | undefined>('')
  const [errors, setErrors] = useState<string | undefined>('')
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setErrors('')
    setSuccess('')
    startTransition(() => {
      login(values).then(data => {
        setErrors(data?.error)
        setSuccess(data?.success)
      })
    })
  }

  return (
    <CardWrapper
      headerLabel={'Welcome back'}
      backButtonLabel={"Don't have an account?"}
      backButtonHref={'/auth/register'}
      showSocial>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={'space-y-6'}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name={'email'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={'johndoe@mail.com'} type={'email'} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={'password'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={'********'} type={'password'} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={errors || urlError} />
          <FormSuccess message={success} />
          <Button type={'submit'} className={'w-full'} disabled={isPending}>
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
