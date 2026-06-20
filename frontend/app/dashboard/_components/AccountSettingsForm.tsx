"use client";

import { useState } from "react";
import { Camera, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { updateProfileAction } from "@/lib/actions/auth-action";
import { useAuth } from "@/context/AuthContext";

export default function AccountSettingsForm() {
  const router = useRouter();
  const { user, setUser } = useAuth();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setError("");
    setIsSaving(true);

    const formData = new FormData(event.currentTarget);
    const image = formData.get("profileImage");

    if (image instanceof File && image.size === 0) {
      formData.delete("profileImage");
    }

    const response = await updateProfileAction(formData);
    setIsSaving(false);

    if (!response?.success) {
      setError(response?.message || "Profile update failed");
      return;
    }

    setUser(response.data);
    setMessage(response.message || "Profile updated successfully");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="yt-form">
      <div className="yt-form-grid">
        <label>
          <span>Full Name</span>
          <input
            name="fullName"
            defaultValue={user.fullName}
          />
        </label>

        <label>
          <span>Email</span>
          <input
            type="email"
            name="email"
            defaultValue={user.email}
          />
        </label>

        <label>
          <span>Phone Number</span>
          <input
            name="phoneNumber"
            defaultValue={user.phoneNumber}
          />
        </label>

        <label>
          <span>
            <Camera size={16} />
            Profile Image
          </span>
          <input
            type="file"
            name="profileImage"
            accept="image/*"
          />
        </label>
      </div>

      {error && <p className="yt-form-error">{error}</p>}
      {message && <p className="yt-form-success">{message}</p>}

      <button
        type="submit"
        disabled={isSaving}
        className="yt-primary-btn"
      >
        <Save size={18} />
        {isSaving ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
