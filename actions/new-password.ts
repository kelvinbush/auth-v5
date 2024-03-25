"use server";

import { NewPasswordSchema } from "@/schemas";
import * as z from "zod";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token: string | null,
) => {
  if (!token) return { error: "Invalid Password reset token" };

  const validPassword = NewPasswordSchema.safeParse(values);

  if (!validPassword.success) {
    return { error: "Invalid Input" };
  }

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) return { error: "Invalid Password reset token" };

  if (existingToken.expire > new Date(new Date().getTime() + 3600 * 1000))
    return { error: "Token has expired" };

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) return { error: "User not found" };

  const { password } = validPassword.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      password: hashedPassword,
    },
  });

  return {
    success: "Password Reset Successful, Return to Login",
  };
};
