"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { createClient } from "@/utils/supabase/server";
import { signUpSchema } from "./schemas";

export const signUp = async (data: z.infer<typeof signUpSchema>) => {
  const supabase = await createClient();

  const parsedData = signUpSchema.parse(data);

  const { data: existingUsername } = await supabase.from("users")
    .select("username")
    .eq("username", parsedData.username)
    .single();

  if (existingUsername) {
    console.log(existingUsername);
    return { error: "Username already taken" };
  }

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.signUp(parsedData);

  if (authError) {
    return { error: authError.message };
  }

  if (user && user.email) {
    const { data: userInfo, error: registerError } = await supabase
      .from("users")
      .insert([{ id: user.id, username: data.username }])
      .select("*");

    console.log(userInfo, registerError);

    if (registerError) {
      return { error: "Could not register public user" };
    }
  }

  redirect("/");
};
