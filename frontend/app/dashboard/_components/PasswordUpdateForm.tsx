"use client";

import { useState } from "react";
import { KeyRound, Save } from "lucide-react";
import { updateProfileAction } from "@/lib/actions/auth-action";

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
    <form onSubmit={handleSubmit} className="yt-form">
      <div className="yt-form-stack">
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

      {error && <p className="yt-form-error">{error}</p>}
      {message && <p className="yt-form-success">{message}</p>}

      <button
        type="submit"
        disabled={isSaving}
        className="yt-primary-btn"
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
    <label>
      <span>
        <KeyRound size={16} />
        {label}
      </span>
      <input
        type="password"
        name={name}
        placeholder={placeholder}
        required
      />
    </label>
  );
}
