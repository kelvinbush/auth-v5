"use server";

import { getUserByEmail } from "@/data/user";
import { ResetSchema } from "@/schemas";
import * as z from "zod";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validation = ResetSchema.safeParse(values);

  if (!validation.success) return { error: "Invalid email" };

  const { email } = validation.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) return { error: "User not found" };

  const passwordResetToken = await generatePasswordResetToken(email);

  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token,
  );

  return { success: "Password reset email sent" };
};
