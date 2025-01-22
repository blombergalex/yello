import { QueryData } from '@supabase/supabase-js'
import { createClient } from './client'

export const getPins = () => {
  const supabase = createClient()

  return supabase
    .from('pins')
    .select('coordinates, created_at, description, id, injured, user_id, users(username)')
                                                            //profiles1:profiles!userid(*), profiles2:profiles!ReplyingTo(*)')
    // .select(`
    //   coordinates, 
    //   created_at, 
    //   description, 
    //   id, 
    //   injured, 
    //   users: (username, user_id), 
    // `)
    .order('created_at', { ascending: true })
}

export type pinType = QueryData<ReturnType<typeof getPins>>