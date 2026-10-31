import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import amirNavbarLogo from "../../images/amir-seal-of-trust.png";

const inputClass =
  "border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:bg-white focus:border-black focus:ring-4 focus:ring-black/10 w-full";
const linkClass =
  "text-sm text-gray-500 hover:text-black transition-colors text-center disabled:opacity-50";
const labelClass = "text-sm font-semibold text-gray-800";

function EyeIcon({ open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      {open ? (
        <>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </>
      ) : (
        <>
          <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
          <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </>
      )}
    </svg>
  );
}

function PasswordInput({ id, value, onChange, placeholder }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        id={id}
        type={show ? "text" : "password"}
        placeholder={placeholder}
        autoComplete="new-password"
        className={inputClass + " pr-11"}
        onChange={onChange}
        value={value}
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        aria-label={show ? "Hide password" : "Show password"}
        className="absolute inset-y-0 right-0 px-3.5 text-gray-400 hover:text-black transition-colors"
      >
        <EyeIcon open={show} />
      </button>
    </div>
  );
}

function SubmitButton({ loading, children }) {
  return (
    <button
      type="submit"
      className="bg-[#c4161c] text-white font-semibold rounded-xl py-3 flex items-center justify-center shadow-lg shadow-[#c4161c]/30 transition-all duration-200 hover:bg-[#a51217] hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:shadow-md disabled:opacity-70 disabled:hover:translate-y-0"
      disabled={loading}
    >
      {loading ? <ClipLoader size={24} color="white" /> : children}
    </button>
  );
}

function AdminLogin() {
  // view: "login" | "email" | "code" | "reset"
  const [view, setView] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  const showError = (error) => {
    console.log(error);
    toast.error(error.response?.data?.message || "Something went wrong", {
      position: "top-center",
      autoClose: 2000,
    });
  };

  const goToLogin = () => {
    setView("login");
    setPassword("");
    setCode("");
    setNewPassword("");
    setConfirmPassword("");
    setResetToken("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      dispatch(setUserData(result.data.user));
      navigate("/admin/dashboard");
      setLoading(false);
      toast.success("Login Successfully", { position: "top-center", autoClose: 1000 });
    } catch (error) {
      setLoading(false);
      showError(error);
    }
  };

  const requestCode = async () => {
    setLoading(true);
    try {
      await axios.post(
        serverUrl + "/api/auth/send-reset-code",
        { email },
        { withCredentials: true }
      );
      setLoading(false);
      setCooldown(60);
      setCode("");
      setView("code");
      toast.success("Verification code sent to your email", {
        position: "top-center",
        autoClose: 2000,
      });
    } catch (error) {
      setLoading(false);
      showError(error);
    }
  };

  const handleSendCode = (e) => {
    e.preventDefault();
    requestCode();
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/verify-reset-code",
        { email, code },
        { withCredentials: true }
      );
      setResetToken(result.data.resetToken);
      setLoading(false);
      setView("reset");
    } catch (error) {
      setLoading(false);
      showError(error);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match", { position: "top-center", autoClose: 2000 });
      return;
    }
    setLoading(true);
    try {
      await axios.post(
        serverUrl + "/api/auth/reset-password",
        { resetToken, password: newPassword, confirmPassword },
        { withCredentials: true }
      );
      setLoading(false);
      goToLogin();
      toast.success("Password reset successfully. Please login", {
        position: "top-center",
        autoClose: 2500,
      });
    } catch (error) {
      setLoading(false);
      showError(error);
    }
  };

  const titles = {
    login: "Admin Login",
    email: "Forgot Password",
    code: "Verify Code",
    reset: "Reset Password",
  };
  const subtitles = {
    email: "Enter your admin email and we will send you a verification code.",
    code: `Enter the 6-digit code sent to ${email}.`,
    reset: "Choose a new password for your account.",
  };

  const emailField = (
    <div className="flex flex-col gap-1.5">
      <label htmlFor="email" className={labelClass}>
        Email
      </label>
      <input
        id="email"
        type="email"
        placeholder="Enter your email"
        autoComplete="off"
        className={inputClass}
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
    </div>
  );

  const backToLogin = (
    <button
      type="button"
      onClick={goToLogin}
      className={linkClass}
    >
      ← Back to login
    </button>
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 flex items-center justify-center px-4 py-8">
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-black/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-black/10 blur-3xl" />
      <div className="relative w-full max-w-md bg-white/90 backdrop-blur rounded-3xl shadow-2xl shadow-black/10 ring-1 ring-black/5 p-8 sm:p-10 flex flex-col gap-6">
        <img
          src={amirNavbarLogo}
          alt="Amir 2.0"
          className="h-20 w-auto mx-auto object-contain"
        />
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-center text-gray-900">
            {titles[view]}
          </h1>
          {subtitles[view] ? (
            <p className="text-sm text-gray-500 text-center leading-relaxed">{subtitles[view]}</p>
          ) : (
            <p className="text-sm text-gray-500 text-center">Sign in to manage your store</p>
          )}
        </div>

        {view === "login" && (
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            {emailField}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className={labelClass}>
                Password
              </label>
              <PasswordInput
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <SubmitButton loading={loading}>Login</SubmitButton>
            <button
              type="button"
              onClick={() => setView("email")}
              className={linkClass + " hover:underline"}
            >
              Forgot password?
            </button>
          </form>
        )}

        {view === "email" && (
          <form onSubmit={handleSendCode} className="flex flex-col gap-5">
            {emailField}
            <SubmitButton loading={loading}>Send verification code</SubmitButton>
            {backToLogin}
          </form>
        )}

        {view === "code" && (
          <form onSubmit={handleVerifyCode} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="code" className={labelClass}>
                Verification code
              </label>
              <input
                id="code"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                placeholder="000000"
                className={inputClass + " tracking-[0.5em] text-center text-xl font-semibold"}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                value={code}
              />
            </div>
            <SubmitButton loading={loading}>Verify</SubmitButton>
            <button
              type="button"
              onClick={requestCode}
              disabled={loading || cooldown > 0}
              className={linkClass}
            >
              {cooldown > 0 ? `Resend code in ${cooldown}s` : "Resend code"}
            </button>
            {backToLogin}
          </form>
        )}

        {view === "reset" && (
          <form onSubmit={handleResetPassword} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="newPassword" className={labelClass}>
                New password
              </label>
              <PasswordInput
                id="newPassword"
                placeholder="At least 8 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="confirmPassword" className={labelClass}>
                Confirm password
              </label>
              <PasswordInput
                id="confirmPassword"
                placeholder="Re-enter new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <SubmitButton loading={loading}>Reset password</SubmitButton>
            {backToLogin}
          </form>
        )}
      </div>
    </div>
  );
}

export default AdminLogin;
