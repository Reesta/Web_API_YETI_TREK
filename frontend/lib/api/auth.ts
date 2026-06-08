import { axiosInstance } from "./axios-instance";
import { AUTH_ENDPOINTS } from "./endpoints";

export type RegisterPayload = {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export const registerApi = async (payload: RegisterPayload) => {
  const response = await axiosInstance.post(AUTH_ENDPOINTS.REGISTER, payload);
  return response.data;
};

export const loginApi = async (payload: LoginPayload) => {
  const response = await axiosInstance.post(AUTH_ENDPOINTS.LOGIN, payload);
  return response.data;
};