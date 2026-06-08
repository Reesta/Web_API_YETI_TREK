"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerAction } from "../../../lib/actions/auth-action";
import { RegisterFormValues, validateRegisterForm } from "./schema";

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
    <div className="auth-page">
      <div className="auth-bg signup-bg">
        <div className="auth-overlay" />

        <div className="auth-left-content">
          <h1>Join Yeti Trek</h1>

          <p>
            Begin your next adventure with Nepal&apos;s <br />
            most trusted trekking community.
          </p>

          <div className="features">
            <div className="feature-item">
              <span>♙</span>
              <p>Explore Local Trails</p>
            </div>

            <div className="feature-item">
              <span>♢</span>
              <p>Safety Guaranteed</p>
            </div>

            <div className="feature-item">
              <span>☾</span>
              <p>Unforgettable Experiences</p>
            </div>
          </div>
        </div>
      </div>

      <div className="auth-form-section">
        <div className="auth-card register-card">
          <h2>Yeti Trek</h2>
          <p className="subtitle">Create your account and start exploring</p>

          {error && <p className="message error-message">{error}</p>}
          {success && <p className="message success-message">{success}</p>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>

              <div className="input-box">
                <span>♙</span>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your name"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Email Address</label>

              <div className="input-box">
                <span>✉</span>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Phone Number</label>

              <div className="input-box">
                <span>☏</span>
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Enter your phone number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>

              <div className="input-box">
                <span>▢</span>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Confirm Password</label>

              <div className="input-box">
                <span>▢</span>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button type="submit" className="auth-btn" disabled={isLoading}>
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          <p className="auth-link">
            Already have an account? <Link href="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}