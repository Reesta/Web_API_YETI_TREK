"use server";

import { AxiosError } from "axios";
import { revalidatePath } from "next/cache";
import { getTokenCookie } from "@/lib/cookies";
import {
  createAdminStayApi,
  deleteAdminStayApi,
  getAdminStayApi,
  getAdminStaysApi,
  updateAdminStayApi,
} from "@/lib/api/admin/admin-stays";

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

export const getAdminStaysAction = async ({
  page = 1,
  limit = 10,
  search = "",
}: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  try {
    const result = await getAdminStaysApi(await getAdminToken(), {
      page: Math.max(1, page),
      limit: Math.min(50, Math.max(1, limit)),
      search,
    });
    return { success: true, data: result.data, meta: result.meta, message: result.message };
  } catch (error) {
    return failure(error, "Unable to load stays");
  }
};

export const getAdminStayAction = async (id: string) => {
  try {
    const result = await getAdminStayApi(await getAdminToken(), id);
    return { success: true, data: result.data, meta: null, message: result.message };
  } catch (error) {
    return failure(error, "Unable to load stay");
  }
};

export const createAdminStayFormAction = async (payload: FormData) => {
  try {
    const result = await createAdminStayApi(await getAdminToken(), payload);
    revalidatePath("/admin/stays");
    revalidatePath("/dashboard/stay");
    return { success: true, data: result.data, meta: null, message: result.message };
  } catch (error) {
    return failure(error, "Unable to create stay");
  }
};

export const updateAdminStayFormAction = async (id: string, payload: FormData) => {
  try {
    const result = await updateAdminStayApi(await getAdminToken(), id, payload);
    revalidatePath("/admin/stays");
    revalidatePath("/dashboard/stay");
    revalidatePath(`/dashboard/stay/${result.data.slug}`);
    return { success: true, data: result.data, meta: null, message: result.message };
  } catch (error) {
    return failure(error, "Unable to update stay");
  }
};

export const deleteAdminStayAction = async (id: string) => {
  try {
    const result = await deleteAdminStayApi(await getAdminToken(), id);
    revalidatePath("/admin/stays");
    revalidatePath("/dashboard/stay");
    return { success: true, data: null, meta: null, message: result.message };
  } catch (error) {
    return failure(error, "Unable to delete stay");
  }
};
