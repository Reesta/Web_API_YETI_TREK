"use server";
import { AxiosError } from "axios";
import { revalidatePath } from "next/cache";
import { getTokenCookie } from "@/lib/cookies";
import { deleteAdminMomentApi, getAdminMomentsApi, updateAdminMomentApi } from "@/lib/api/admin/admin-moments";
const token = async () => { const value = await getTokenCookie(); if (!value) throw new Error("Login required"); return value; };
const fail = (error: unknown) => ({ success: false, data: null, message: (error as AxiosError<{message?: string}>).response?.data?.message || "Unable to manage moment" });
export async function getAdminMomentsAction() { try { const r = await getAdminMomentsApi(await token()); return { success: true, data: r.data, message: r.message }; } catch (e) { return fail(e); } }
export async function updateAdminMomentAction(id: string, payload: Parameters<typeof updateAdminMomentApi>[2]) { try { const r = await updateAdminMomentApi(await token(), id, payload); revalidatePath("/"); revalidatePath("/admin/moments"); return { success: true, data: r.data, message: r.message }; } catch (e) { return fail(e); } }
export async function deleteAdminMomentAction(id: string) { try { const r = await deleteAdminMomentApi(await token(), id); revalidatePath("/"); revalidatePath("/admin/moments"); return { success: true, data: null, message: r.message }; } catch (e) { return fail(e); } }
