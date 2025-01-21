'use server'

import { createClient } from '@/utils/supabase/server'

export const deletePin = async (pinId: string) => {
  const supabase = await createClient()

  const { data: pin, error: pinError } = await supabase
    .from('pins')
    .select('user_id')
    .eq('id', pinId)
    .single()

  if (pinError || !pin) {
    throw new Error('Could not get pin')
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()
  const isPinCreator = user && user.id === pin?.user_id

  if (!isPinCreator) {
    throw new Error('You are not allowed to delete this pin')
  }

  await supabase.from('pins').delete().eq('id', pinId).throwOnError()
}
