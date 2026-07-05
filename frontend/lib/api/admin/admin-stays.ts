import { axiosInstance } from "../axios-instance";
import { Stay } from "../stays";

export type AdminStay = Stay;

export type StayListMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

const authHeaders = (token: string) => ({ Authorization: `Bearer ${token}` });

export const getAdminStaysApi = async (
  token: string,
  params: { page: number; limit: number; search: string },
) => {
  const response = await axiosInstance.get("/admin/stays", {
    headers: authHeaders(token),
    params,
  });
  return response.data;
};

export const getAdminStayApi = async (token: string, id: string) => {
  const response = await axiosInstance.get(`/admin/stays/${id}`, {
    headers: authHeaders(token),
  });
  return response.data;
};

export const createAdminStayApi = async (token: string, payload: FormData) => {
  const response = await axiosInstance.post("/admin/stays", payload, {
    headers: authHeaders(token),
  });
  return response.data;
};

export const updateAdminStayApi = async (
  token: string,
  id: string,
  payload: FormData,
) => {
  const response = await axiosInstance.patch(`/admin/stays/${id}`, payload, {
    headers: authHeaders(token),
  });
  return response.data;
};

export const deleteAdminStayApi = async (token: string, id: string) => {
  const response = await axiosInstance.delete(`/admin/stays/${id}`, {
    headers: authHeaders(token),
  });
  return response.data;
};
