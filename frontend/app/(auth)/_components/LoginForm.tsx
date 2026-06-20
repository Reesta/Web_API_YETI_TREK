"use client";

import Link from "next/link";
import { useState } from "react";
import { loginAction } from "../../../lib/actions/auth-action";
import { LoginFormValues, validateLoginForm } from "./schema";

export default function LoginForm() {
  const [formData, setFormData] = useState<LoginFormValues>({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });

    setError("");
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const validationError = validateLoginForm(formData);

    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);

    try {
      const response = await loginAction({
        email: formData.email,
        password: formData.password,
      });

      if (!response?.success) {
        setError(response?.message || "Login failed");
        return;
      }

      // Cookie is stored in loginAction
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Login Error:", error);
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg login-bg">
        <div className="auth-overlay" />

        <div className="auth-left-content">
          <h1>Welcome Back</h1>

          <p>
            Log in to continue your adventure with Yeti Trek.
          </p>

          <div className="features">
            <div className="feature-item">
              <span>♙</span>
              <p>Expert Local Guides</p>
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
        <div className="auth-card login-card">
          <h2>Login</h2>

          <p className="subtitle">
            Access your Yeti Trek account.
          </p>

          {error && (
            <p className="message error-message">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit}>
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

            <button
              type="submit"
              className="auth-btn"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login →"}
            </button>
          </form>

          <p className="auth-link">
            Don&apos;t have an account?{" "}
            <Link href="/register">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
