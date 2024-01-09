'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface BackButtonProps {
  label: string
  href: string
}

export const BackButton = ({ label, href }: BackButtonProps) => {
  return (
    <Button variant={'link'} className={'font-normal w-full'} size={'sm'} asChild>
      <Link className={'underline-offset-1'} href={href}>
        {label}
      </Link>
    </Button>
  )
}
