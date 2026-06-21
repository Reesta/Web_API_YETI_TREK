"use client";

import { useState } from "react";
import { KeyRound, Save } from "lucide-react";
import { updateProfileAction } from "@/lib/actions/auth-action";

const labelClass = "grid gap-2";
const labelTextClass =
  "flex items-center gap-2 text-xs font-black uppercase tracking-[0.08em] text-[#d9dee5]";
const inputClass =
  "h-[50px] w-full rounded-lg border border-[#3a444f] bg-[#101820] px-3.5 text-[15px] text-white outline-none transition placeholder:text-[#7f8b98] focus:border-[#e0a12b] focus:ring-4 focus:ring-[#e0a12b]/10";

export default function PasswordUpdateForm() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setMessage("");
    setError("");

    const formData = new FormData(form);
    const newPassword = String(formData.get("newPassword") || "");
    const confirmPassword = String(formData.get("confirmPassword") || "");

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match");
      return;
    }

    setIsSaving(true);
    const response = await updateProfileAction(formData);
    setIsSaving(false);

    if (!response?.success) {
      setError(response?.message || "Password update failed");
      return;
    }

    form.reset();
    setMessage("Password updated successfully");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="grid max-w-[560px] gap-[18px]">
        <PasswordField
          label="Current Password"
          name="currentPassword"
          placeholder="Enter current password"
        />
        <PasswordField
          label="New Password"
          name="newPassword"
          placeholder="Enter new password"
        />
        <PasswordField
          label="Confirm Password"
          name="confirmPassword"
          placeholder="Confirm new password"
        />
      </div>

      {error && <p className="mt-4 rounded-lg border border-red-400/30 bg-red-500/10 p-3 text-sm text-[#ffb1b1]">{error}</p>}
      {message && <p className="mt-4 rounded-lg border border-emerald-400/30 bg-emerald-400/10 p-3 text-sm text-[#a7efc4]">{message}</p>}

      <button
        type="submit"
        disabled={isSaving}
        className="mt-5 inline-flex h-[50px] items-center justify-center gap-2 rounded-lg bg-[#e0a12b] px-5 text-[15px] font-black text-[#111] disabled:cursor-not-allowed disabled:opacity-65"
      >
        <Save size={18} />
        {isSaving ? "Saving..." : "Change Password"}
      </button>
    </form>
  );
}

function PasswordField({
  label,
  name,
  placeholder,
}: {
  label: string;
  name: string;
  placeholder: string;
}) {
  return (
    <label className={labelClass}>
      <span className={labelTextClass}>
        <KeyRound size={16} />
        {label}
      </span>
      <input
        className={inputClass}
        type="password"
        name={name}
        placeholder={placeholder}
        required
      />
    </label>
  );
}
