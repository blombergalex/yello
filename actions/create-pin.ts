"use server";

import { createClient } from "@/utils/supabase/server";
import { pinSchema } from "./schemas";
import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ServerActionResult } from "@/utils/action-utils";

export const createPin = async (
  data: z.infer<typeof pinSchema>
): Promise<ServerActionResult> => {
  const parsedData = pinSchema.parse(data);
  
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "User not authenticated" };
  }

  const { data: profile, error: profileError } = await supabase
    .from("users")
    .select("username")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    return {
      error: "User profile not found, valid user login is needed to post",
    };
  }

  const {} = await supabase
    .from("pins")
    .insert([{ ...parsedData, user_id: user.id }])
    .throwOnError();

  revalidatePath("/");
  redirect("/");
};
