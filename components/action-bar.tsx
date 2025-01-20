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
    <section className="flex justify-between items-center p-2 bg-white">
      <div>
        {user ? (
          <div>
            <div className="mx-2">
              <h3 className="text-small uppercase font-semibold text-yellow-500">
                {username}
              </h3>
              <SolidUserCircleIcon className="text-yellow-500" />
            </div>
            <LogOutButton />
          </div>
        ) : (
          <Link
            href="/log-in"
            className="text-yellow-500 text-small cursor-pointer"
          >
            Log in
          </Link>
        )}
      </div>
      <CreateButton />
    </section>
  )
}
