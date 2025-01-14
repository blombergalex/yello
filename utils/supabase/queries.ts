import { QueryData } from '@supabase/supabase-js'
import { createClient } from './client'

export const getPins = () => {
  const supabase = createClient()

  return supabase
    .from('pins')
    .select('coordinates, created_at, description, id, injured, users("name")')
    .order('created_at', { ascending: true })
}

export type pinType = QueryData<ReturnType<typeof getPins>>