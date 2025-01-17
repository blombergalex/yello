'use server'

import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export const logOut = async () => {
  const supabase = await createClient()
  supabase.auth.signOut()

  redirect('/log-in')
}
