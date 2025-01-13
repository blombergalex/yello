import { createClient } from './client'

export const getPins = () => {
  const supabase = createClient()

  return supabase
    .from('pins')
    .select('id, created_at, coordinates, description, users("name"), injured')
    .order('created_at', { ascending: false })
}
