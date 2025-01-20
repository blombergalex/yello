'use client'

import { useState } from 'react'
import { Button } from '@nextui-org/react'
import { logOut } from '@/actions/log-out'
import { logOutButtonClasses } from '@/utils/classes'

export const LogOutButton = () => {
  const [isPending, setIsPending] = useState(false)

  const handleLogOut = async () => {
    setIsPending(true)
    try {
      await logOut()
    } finally {
      setIsPending(false)
    }
  }

  return (
    <Button
      className={logOutButtonClasses}
      onPress={handleLogOut}
      disabled={isPending}
    >
      {isPending ? 'Exiting...' : 'Log out'}
    </Button>
  )
}