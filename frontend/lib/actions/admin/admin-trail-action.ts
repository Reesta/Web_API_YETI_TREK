"use server";

import { AxiosError } from "axios";
import { revalidatePath } from "next/cache";
import { getTokenCookie } from "@/lib/cookies";
import {
  AdminTrailPayload,
  createAdminTrailApi,
  deleteAdminTrailApi,
  getAdminTrailApi,
  getAdminTrailsApi,
  updateAdminTrailApi,
} from "@/lib/api/admin/admin-trails";

const failure = (error: unknown, fallback: string) => {
  const axiosError = error as AxiosError<{ message?: string }>;
  return {
    success: false,
    message: axiosError.response?.data?.message || fallback,
    data: null,
    meta: null,
  };
};

const getAdminToken = async () => {
  const token = await getTokenCookie();
  if (!token) throw new Error("You need to login first");
  return token;
};

export const getAdminTrailsAction = async ({
  page = 1,
  limit = 10,
  search = "",
}: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  try {
    const result = await getAdminTrailsApi(await getAdminToken(), {
      page: Math.max(1, page),
      limit: Math.min(50, Math.max(1, limit)),
      search,
    });
    return { success: true, data: result.data, meta: result.meta, message: result.message };
  } catch (error) {
    return failure(error, "Unable to load trails");
  }
};

export const getAdminTrailAction = async (id: string) => {
  try {
    const result = await getAdminTrailApi(await getAdminToken(), id);
    return { success: true, data: result.data, meta: null, message: result.message };
  } catch (error) {
    return failure(error, "Unable to load trail");
  }
};

export const createAdminTrailAction = async (payload: AdminTrailPayload) => {
  try {
    const result = await createAdminTrailApi(await getAdminToken(), payload);
    revalidatePath("/admin/trails");
    revalidatePath("/dashboard/trails");
    return { success: true, data: result.data, meta: null, message: result.message };
  } catch (error) {
    return failure(error, "Unable to create trail");
  }
};

export const createAdminTrailFormAction = async (payload: FormData) => {
  try {
    const result = await createAdminTrailApi(await getAdminToken(), payload);
    revalidatePath("/admin/trails");
    revalidatePath("/dashboard/trails");
    return { success: true, data: result.data, meta: null, message: result.message };
  } catch (error) {
    return failure(error, "Unable to create trail");
  }
};

export const updateAdminTrailAction = async (id: string, payload: AdminTrailPayload) => {
  try {
    const result = await updateAdminTrailApi(await getAdminToken(), id, payload);
    revalidatePath("/admin/trails");
    revalidatePath(`/admin/trails/${id}`);
    revalidatePath("/dashboard/trails");
    revalidatePath(`/dashboard/trails/${result.data.slug}`);
    return { success: true, data: result.data, meta: null, message: result.message };
  } catch (error) {
    return failure(error, "Unable to update trail");
  }
};

export const updateAdminTrailFormAction = async (id: string, payload: FormData) => {
  try {
    const result = await updateAdminTrailApi(await getAdminToken(), id, payload);
    revalidatePath("/admin/trails");
    revalidatePath(`/admin/trails/${id}`);
    revalidatePath("/dashboard/trails");
    revalidatePath(`/dashboard/trails/${result.data.slug}`);
    return { success: true, data: result.data, meta: null, message: result.message };
  } catch (error) {
    return failure(error, "Unable to update trail");
  }
};

export const deleteAdminTrailAction = async (id: string) => {
  try {
    const result = await deleteAdminTrailApi(await getAdminToken(), id);
    revalidatePath("/admin/trails");
    revalidatePath("/dashboard/trails");
    return { success: true, data: null, meta: null, message: result.message };
  } catch (error) {
    return failure(error, "Unable to delete trail");
  }
};
