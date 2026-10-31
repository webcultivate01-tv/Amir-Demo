import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { serverUrl } from "../../App";
import { setUserData } from "../../redux/userSlice";

const inputClass =
  "w-full rounded-xl border border-mist-line bg-white px-4 py-3.5 text-[15px] outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-brand focus:ring-4 focus:ring-brand/10";
const labelClass = "text-[15px] font-semibold text-ink";
const cardClass =
  "flex flex-col gap-5 rounded-3xl border border-mist-line bg-white p-6 sm:p-8";

const photoUrl = (raw) =>
  raw ? (/^(https?:|data:)/.test(raw) ? raw : serverUrl + "/" + raw.replace(/^\//, "")) : null;

const iconWrap = (children) => (
  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      {children}
    </svg>
  </span>
);

function SaveButton({ loading, children, className = "mt-auto py-3" }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-indigo-700 font-semibold text-white shadow-lg shadow-indigo-600/30 transition hover:from-blue-600 hover:to-indigo-800 disabled:opacity-70 ${className}`}
    >
      {loading ? <ClipLoader size={24} color="white" /> : children}
    </button>
  );
}

function ProfilePage() {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  useEffect(() => {
    setName(userData?.name || "");
    setEmail(userData?.email || "");
  }, [userData]);

  useEffect(() => {
    if (!file) return setPreview(null);
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const toastError = (message) =>
    toast.error(message, { position: "top-center", autoClose: 2000 });

  const handleFile = (e) => {
    const picked = e.target.files?.[0];
    if (!picked) return;
    if (!/^image\/(jpeg|png|webp)$/.test(picked.type)) {
      return toastError("Only JPG, PNG or WEBP images are allowed");
    }
    if (picked.size > 2 * 1024 * 1024) return toastError("Image must be 2MB or smaller");
    setFile(picked);
  };

  const save = async (form, setLoading, onDone) => {
    setLoading(true);
    try {
      const result = await axios.put(serverUrl + "/api/auth/profile", form, {
        withCredentials: true,
      });
      dispatch(setUserData(result.data.user));
      onDone();
      toast.success(result.data.message, { position: "top-center", autoClose: 1500 });
    } catch (error) {
      console.log(error);
      toastError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return toastError("Name is required");
    const form = new FormData();
    form.append("name", name.trim());
    form.append("email", email.trim());
    if (file) form.append("photo", file);
    save(form, setProfileLoading, () => {
      setFile(null);
      if (fileRef.current) fileRef.current.value = "";
    });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password.length < 8) return toastError("Password must be at least 8 characters");
    if (password !== confirmPassword) return toastError("Passwords do not match");
    const form = new FormData();
    form.append("password", password);
    save(form, setPasswordLoading, () => {
      setPassword("");
      setConfirmPassword("");
    });
  };

  const shown = preview || photoUrl(userData?.photo);

  return (
    <div className="flex flex-col gap-6">
      {/* Profile photo */}
      <div className={cardClass}>
        <h2 className="text-lg font-bold text-ink">Profile Photo</h2>
        <div className="flex flex-wrap items-center gap-5">
          {shown ? (
            <img src={shown} alt="Profile" className="h-24 w-24 rounded-full object-cover ring-2 ring-mist-line" />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-900 text-3xl font-extrabold uppercase text-white">
              {(name.trim()[0] || "A").toUpperCase()}
            </div>
          )}
          <div className="flex flex-col gap-1.5">
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFile}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="w-fit rounded-xl border border-mist-line px-5 py-2.5 text-sm font-semibold text-ink hover:bg-slate-50"
            >
              {shown ? "Change photo" : "Upload photo"}
            </button>
            <p className="text-xs text-slate-500">
              {file ? "Click Save changes to apply the new photo." : "JPG, PNG or WEBP (Max 2MB)"}
            </p>
          </div>
        </div>
      </div>

      <div className="grid items-stretch gap-6 lg:grid-cols-2">
        {/* Profile details */}
        <form onSubmit={handleProfileSubmit} className={cardClass}>
          <div className="flex items-center gap-4">
            {iconWrap(<><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" /></>)}
            <div>
              <h2 className="text-lg font-bold text-ink">Profile Details</h2>
              <p className="text-sm text-slate-500">Update your basic information</p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className={labelClass}>Name</label>
              <input id="name" className={inputClass} value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className={labelClass}>Email</label>
              <input id="email" type="email" className={inputClass} value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>

          <div className="mt-auto">
            <SaveButton loading={profileLoading} className="px-6 py-3.5 text-[15px]">Save changes</SaveButton>
          </div>
        </form>

        {/* Change password */}
        <form onSubmit={handlePasswordSubmit} className={cardClass}>
          <div className="flex items-center gap-4">
            {iconWrap(<><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></>)}
            <div>
              <h2 className="text-lg font-bold text-ink">Change Password</h2>
              <p className="text-sm text-slate-500">Set a new password for your account</p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className={labelClass}>New password</label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Enter new password"
                className={inputClass}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="confirmPassword" className={labelClass}>Confirm new password</label>
              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Confirm new password"
                className={inputClass}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input type="checkbox" checked={showPassword} onChange={(e) => setShowPassword(e.target.checked)} />
            Show passwords
          </label>

          <div className="mt-auto">
            <SaveButton loading={passwordLoading} className="px-6 py-3.5 text-[15px]">Update password</SaveButton>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfilePage;
