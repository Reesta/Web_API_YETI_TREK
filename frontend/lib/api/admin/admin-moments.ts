import { axiosInstance } from "../axios-instance";
import { Moment } from "../moments";
const headers = (token: string) => ({ Authorization: `Bearer ${token}` });
export type AdminMoment = Moment;
export const getAdminMomentsApi = async (token: string) => (await axiosInstance.get("/admin/moments", { headers: headers(token), params: { page: 1, limit: 50 } })).data;
export const updateAdminMomentApi = async (token: string, id: string, payload: Partial<Pick<Moment, "title" | "caption" | "location" | "trailSlug" | "status">>) => (await axiosInstance.patch(`/admin/moments/${id}`, payload, { headers: headers(token) })).data;
export const deleteAdminMomentApi = async (token: string, id: string) => (await axiosInstance.delete(`/admin/moments/${id}`, { headers: headers(token) })).data;
