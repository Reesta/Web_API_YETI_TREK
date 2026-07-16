"use server";

import { AxiosError } from "axios";
import { revalidatePath } from "next/cache";
import { getTokenCookie } from "@/lib/cookies";
import { createMomentApi, deleteMomentApi, getMomentsApi, getMyMomentsApi, updateMomentApi } from "@/lib/api/moments";

const failure = (error: unknown, fallback: string) => {
  const axiosError = error as AxiosError<{ message?: string }>;
  return { success: false, message: axiosError.response?.data?.message || (error instanceof Error ? error.message : fallback), data: null };
};

export async function getMomentsAction() {
  try { const result = await getMomentsApi(); return { success: true, message: result.message, data: result.data }; }
  catch (error) { return failure(error, "Unable to load trek moments"); }
}

export async function getMyMomentsAction() {
  try {
    const token = await getTokenCookie();
    if (!token) throw new Error("You need to login first");
    const result = await getMyMomentsApi(token);
    return { success: true, message: result.message, data: result.data };
  } catch (error) { return failure(error, "Unable to load your moment submissions"); }
}

export async function createMomentAction(payload: FormData) {
  try {
    const token = await getTokenCookie();
    if (!token) throw new Error("You need to login first");
    const result = await createMomentApi(token, payload);
    revalidatePath("/"); revalidatePath("/admin/moments");
    return { success: true, message: "Moment submitted for admin approval", data: result.data };
  } catch (error) { return failure(error, "Unable to submit moment"); }
}

export async function updateMyMomentAction(id: string, payload: FormData) {
  try { const token = await getTokenCookie(); if (!token) throw new Error("You need to login first"); const result = await updateMomentApi(token, id, payload); revalidatePath("/dashboard/profile"); revalidatePath("/admin/moments"); revalidatePath("/"); return { success: true, data: result.data, message: result.message }; }
  catch (error) { return failure(error, "Unable to update your moment"); }
}

export async function deleteMyMomentAction(id: string) {
  try { const token = await getTokenCookie(); if (!token) throw new Error("You need to login first"); const result = await deleteMomentApi(token, id); revalidatePath("/dashboard/profile"); revalidatePath("/admin/moments"); revalidatePath("/"); return { success: true, data: null, message: result.message }; }
  catch (error) { return failure(error, "Unable to delete your moment"); }
}
