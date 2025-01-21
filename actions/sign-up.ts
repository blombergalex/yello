'use server'

import { z } from 'zod'

import { createClient } from '@/utils/supabase/server'
import { signUpSchema } from './schemas'
import { revalidatePath } from 'next/cache'

export const signUp = async (data: z.infer<typeof signUpSchema>) => {
  const supabase = await createClient()

  const parsedData = signUpSchema.parse(data)

  const { data: existingUsername } = await supabase
    .from('users')
    .select('username')
    .eq('username', parsedData.username)
    .single()

  if (existingUsername) {
    return { error: 'Username already taken' }
  }

  const { data: existingUserEmail } = await supabase
    .from('users')
    .select('email')
    .eq('email', parsedData.email)
    .single()

  if (existingUserEmail) {
    return { error: 'A user with this email already exists' }
  }

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.signUp(parsedData)

  if (authError) {
    return { error: authError.message }
  }

  if (user && user.email) {
    const { data: userInfo, error: registerError } = await supabase
      .from('users')
      .insert([{ id: user.id, email: user.email, username: data.username }])
      .select('*')

    if (registerError) {
      return { error: 'Could not register public user', userInfo }
    }
  }

  revalidatePath('/sign-up')
}
