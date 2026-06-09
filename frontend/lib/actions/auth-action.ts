"use server";

import {
  loginApi,
  LoginPayload,
  registerApi,
  RegisterPayload,
} from "../api/auth";

import {
  setTokenCookie,
  storeUserData,
} from "@/lib/cookies";

export const registerAction = async (
  payload: RegisterPayload
) => {
  try {
    return await registerApi(payload);
  } catch (error: any) {
    return (
      error.response?.data || {
        success: false,
        message: "Registration failed",
      }
    );
  }
};

export const loginAction = async (
  payload: LoginPayload
) => {
  try {
    const response = await loginApi(payload);

    if (response.data.token) {
      await setTokenCookie(response.data.token);
    }

    if (response.data.user) {
      await storeUserData(response.data.user);
    }

    return response;
  } catch (error: any) {
    return (
      error.response?.data || {
        success: false,
        message: "Login failed",
      }
    );
  }
};