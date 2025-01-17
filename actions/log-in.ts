"use server";

import { z } from "zod";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { logInSchema } from "./schemas";
import { ServerActionResult } from "@/utils/action-utils";

export const logIn = async (
  data: z.infer<typeof logInSchema>
): Promise<ServerActionResult> => {
  const supabase = await createClient();

  const parsedData = logInSchema.parse(data);

  const { error } = await supabase.auth.signInWithPassword(parsedData);
  if (error) {
    console.error("error: ", error?.message);
    return { error: error.message};
  }

  redirect("/");
};