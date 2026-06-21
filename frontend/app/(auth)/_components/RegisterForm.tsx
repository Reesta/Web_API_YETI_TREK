"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { registerAction } from "../../../lib/actions/auth-action";
import { RegisterFormValues, validateRegisterForm } from "./schema";

const inputClass =
  "w-full flex-1 border-0 bg-transparent text-[15px] text-white outline-none placeholder:text-[#7d8792]";
const inputBoxClass =
  "flex h-[54px] items-center rounded-md border border-[#2a3846] bg-[#0c1622] px-4";
const labelClass =
  "mb-2.5 block text-[13px] font-semibold uppercase tracking-[1.5px] text-[#d4d6da]";

export default function RegisterForm() {
  const router = useRouter();

  const [formData, setFormData] = useState<RegisterFormValues>({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationError = validateRegisterForm(formData);

    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);

    const response = await registerAction({
      fullName: formData.fullName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      password: formData.password,
    });

    setIsLoading(false);

    if (response?.success === false) {
      setError(response.message || "Registration failed");
      return;
    }

    setSuccess(response?.message || "Account created successfully");

    setTimeout(() => {
      router.push("/login");
    }, 1000);
  };

  return (
    <div className="grid min-h-screen grid-cols-1 bg-[#020910] lg:grid-cols-[1fr_520px]">
      <div className="relative hidden min-h-screen bg-[url('/signup.png')] bg-cover bg-center lg:block">
        <div className="absolute inset-0 bg-[#020910]/75" />

        <div className="relative z-10 flex min-h-screen flex-col justify-center pl-16">
          <h1 className="mb-7 text-[56px] font-black leading-tight tracking-[4px] text-white">
            Join Yeti Trek
          </h1>

          <p className="text-[23px] leading-relaxed tracking-[1px] text-[#f5f5f5]">
            Begin your next adventure with Nepal&apos;s
            <br />
            most trusted trekking community.
          </p>

          <div className="mt-16 grid gap-7">
            {["Explore Local Trails", "Safety Guaranteed", "Unforgettable Experiences"].map(
              (item) => (
                <div key={item} className="flex items-center gap-5">
                  <span className="w-6 text-2xl text-[#e0a12b]">•</span>
                  <p className="text-[17px] font-bold text-white">{item}</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <div className="flex min-h-screen items-center justify-center bg-[#020910] p-8 max-lg:p-6">
        <div className="w-full max-w-[450px] rounded-xl border border-[#1d2a36] bg-[#07111b] p-9 max-lg:p-7">
          <h2 className="mb-3 text-center text-[34px] font-black tracking-[4px] text-[#e0a12b]">
            Yeti Trek
          </h2>
          <p className="mb-8 text-center text-[15px] text-[#aab4c0]">
            Create your account and start exploring
          </p>

          {error && (
            <p className="mb-5 rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-[#ff7777]">
              {error}
            </p>
          )}
          {success && (
            <p className="mb-5 rounded-md border border-emerald-400/30 bg-emerald-400/10 p-3 text-sm text-[#6ee792]">
              {success}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            <AuthInput
              label="Full Name"
              marker="N"
              name="fullName"
              placeholder="Enter your name"
              value={formData.fullName}
              onChange={handleChange}
            />
            <AuthInput
              label="Email Address"
              marker="@"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            <AuthInput
              label="Phone Number"
              marker="P"
              name="phoneNumber"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            <AuthInput
              label="Password"
              marker="#"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
            <AuthInput
              label="Confirm Password"
              marker="#"
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            <button
              type="submit"
              className="mt-1 flex h-14 w-full items-center justify-center rounded-md border-0 bg-[#e0a12b] text-base font-bold text-black disabled:cursor-not-allowed disabled:opacity-70"
              disabled={isLoading}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          <p className="mt-8 text-center text-[15px] text-[#aab4c0]">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-[#e0a12b]">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function AuthInput({
  label,
  marker,
  type = "text",
  name,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  marker: string;
  type?: string;
  name: keyof RegisterFormValues;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="mb-5">
      <label className={labelClass}>{label}</label>
      <div className={inputBoxClass}>
        <span className="mr-3.5 text-[#7d8792]">{marker}</span>
        <input
          className={inputClass}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
