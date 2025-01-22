import { createClient } from '@/utils/supabase/client'

export const User = async () => {
  const supabase = await createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return user ? user :  null
}