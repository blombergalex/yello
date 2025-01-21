'use client'

import { useState } from 'react'
import { Button } from '@nextui-org/react'
import { logOut } from '@/actions/log-out'

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
      className="border-1 border-white w-fit bg-transparent self-center text-white"
      onPress={handleLogOut}
      disabled={isPending}
    >
      {isPending ? 'Bye...' : 'Log out'}
    </Button>
  )
}