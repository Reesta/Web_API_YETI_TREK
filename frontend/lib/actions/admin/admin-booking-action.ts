"use server";

import { AxiosError } from "axios";
import { revalidatePath } from "next/cache";
import { getTokenCookie } from "@/lib/cookies";
import {
  AdminBookingPayload,
  deleteAdminBookingApi,
  getAdminBookingApi,
  getAdminBookingsApi,
  updateAdminBookingApi,
} from "@/lib/api/admin/admin-bookings";

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

export const getAdminBookingsAction = async ({
  page = 1,
  limit = 10,
  search = "",
}: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  try {
    const result = await getAdminBookingsApi(await getAdminToken(), {
      page: Math.max(1, page),
      limit: Math.min(50, Math.max(1, limit)),
      search,
    });
    return { success: true, data: result.data, meta: result.meta, message: result.message };
  } catch (error) {
    return failure(error, "Unable to load bookings");
  }
};

export const getAdminBookingAction = async (id: string) => {
  try {
    const result = await getAdminBookingApi(await getAdminToken(), id);
    return { success: true, data: result.data, meta: null, message: result.message };
  } catch (error) {
    return failure(error, "Unable to load booking");
  }
};

export const updateAdminBookingAction = async (
  id: string,
  payload: AdminBookingPayload,
) => {
  try {
    const result = await updateAdminBookingApi(await getAdminToken(), id, payload);
    revalidatePath("/admin/bookings");
    revalidatePath(`/admin/bookings/${id}`);
    revalidatePath("/dashboard/booking-history");
    return { success: true, data: result.data, meta: null, message: result.message };
  } catch (error) {
    return failure(error, "Unable to update booking");
  }
};

export const deleteAdminBookingAction = async (id: string) => {
  try {
    const result = await deleteAdminBookingApi(await getAdminToken(), id);
    revalidatePath("/admin/bookings");
    revalidatePath("/dashboard/booking-history");
    return { success: true, data: null, meta: null, message: result.message };
  } catch (error) {
    return failure(error, "Unable to delete booking");
  }
};
