import Link from 'next/link'
import { UserCircleIcon as SolidUserCircleIcon } from '@heroicons/react/16/solid'
import { createClient } from '@/utils/supabase/server'

import { LogOutButton } from './logout-button'
import { CreateButton } from './create-button'

export const ActionBar = async () => {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  let username = null

  if (user) {
    const { data, error } = await supabase
      .from('users')
      .select('id, username')
      .eq('id', user.id)

    if (error) {
      throw error
    }

    if (data && data.length > 0) {
      const [{ username: fetchedUsername }] = data
      username = fetchedUsername
    }
  }

  return (
    <section>
      {user ? (
        <div className="grid grid-cols-3 items-center bg-yellow-500 w-screen px-2">
          <div className="flex flex-col justify-start">
            <h3 className="text-small uppercase font-semibold text-white w-fit items-center ml-1">
              {username}
            </h3>
            <div className="flex items-center">
              <SolidUserCircleIcon className="text-white size-11" />
            </div>
          </div>
          <div className='flex justify-center'>
            <CreateButton />
          </div>
          <div className='flex justify-end'>
            <LogOutButton />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-3 items-center bg-yellow-500 w-screen px-2">
        <Link href='/log-in' className="flex flex-col justify-start">
          <h3 className="text-small uppercase font-semibold text-white w-fit items-center">
            Log in
          </h3>
          <div className="flex items-center">
            <SolidUserCircleIcon className="text-white size-11" />
          </div>
        </Link>
        <div className='flex justify-center'>
          <CreateButton />
        </div>
        <div className='flex justify-end'>
        </div>
      </div>
      )}
    </section>
  )
}
