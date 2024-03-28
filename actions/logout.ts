"use server";

import { signOut } from "@/auth";

export const logout = async () => {
  // some server stuff b4 signing out
  await signOut();
};
