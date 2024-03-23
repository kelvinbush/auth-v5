'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { CardWrapper } from '@/components/auth/card-wrapper'
import { BeatLoader } from 'react-spinners'
import { useSearchParams } from 'next/navigation'
import { verifyEmail } from '@/actions/verify-email'
import { FormSuccess } from '../form-success'
import { FormError } from '@/components/form-error'

const VerifyEmailForm = () => {
  const [error, setError] = useState<string | undefined>(undefined)
  const [success, setSuccess] = useState<string | undefined>(undefined)
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const onSubmit = useCallback(async () => {
    if (success || error) return
    if (!token) {
      setError('Invalid token')
      return
    }

    verifyEmail(token)
      .then(response => {
        setError(response.error)
        setSuccess(response.success)
      })
      .catch(() => {
        setError('Something went wrong')
      })
  }, [token, success, error])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <CardWrapper
      headerLabel={'Confirming your verification'}
      backButtonLabel={'Back to Login'}
      backButtonHref={'/auth/login'}>
      <div className={'flex items-center justify-center w-full'}>
        {!success && !error && <BeatLoader />}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  )
}

export default VerifyEmailForm
