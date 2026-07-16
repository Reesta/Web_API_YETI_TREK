import { axiosInstance } from "./axios-instance";

export type Moment = {
  id: string;
  title: string;
  caption: string;
  location: string;
  trailSlug?: string;
  image: string;
  status: "pending" | "approved" | "rejected";
  uploadedBy: { id: string; fullName: string; profileImage: string };
  createdAt: string;
  updatedAt: string;
};

const authHeaders = (token: string) => ({ Authorization: `Bearer ${token}` });
export const getMomentsApi = async () => (await axiosInstance.get("/moments")).data;
export const getMyMomentsApi = async (token: string) =>
  (await axiosInstance.get("/moments/mine", { headers: authHeaders(token) })).data;
export const createMomentApi = async (token: string, payload: FormData) =>
  (await axiosInstance.post("/moments", payload, { headers: authHeaders(token) })).data;
export const updateMomentApi = async (token: string, id: string, payload: FormData) =>
  (await axiosInstance.patch(`/moments/${id}`, payload, { headers: authHeaders(token) })).data;
export const deleteMomentApi = async (token: string, id: string) =>
  (await axiosInstance.delete(`/moments/${id}`, { headers: authHeaders(token) })).data;
