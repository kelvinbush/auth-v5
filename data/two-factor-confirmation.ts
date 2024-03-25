import { db } from "@/lib/db";

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    const existingConfirmation = db.twoFactorConfirmation.findUnique({
      where: { userId },
    });

    return existingConfirmation;
  } catch (e) {
    return null;
  }
};
