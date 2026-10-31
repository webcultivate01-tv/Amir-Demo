import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import InquiryTabs from "./InquiryTabs";

const icon = (children) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5 shrink-0"
  >
    {children}
  </svg>
);

const icons = {
  dashboard: icon(
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </>
  ),
  enquiries: icon(
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  projects: icon(
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 3v18M3 9h6" />
    </>
  ),
  clients: icon(
    <>
      <path d="M3 21V4a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v17" />
      <path d="M14 10h6a1 1 0 0 1 1 1v10" />
      <path d="M7 8h3M7 12h3M7 16h3M3 21h18" />
    </>
  ),
  monthly: icon(
    <>
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <path d="M8 2v4M16 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
    </>
  ),
  billing: icon(
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5M9 13h6M9 17h6" />
    </>
  ),
  hosting: icon(
    <>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </>
  ),
  admins: icon(
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
    </>
  ),
  reports: icon(
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5M9 17v-3M12 17v-5M15 17v-2" />
    </>
  ),
  account: icon(
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
    </>
  ),
  logout: icon(
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
  ),
};

export const navItems = [
  { label: "Dashboard", to: "/admin/dashboard", icon: icons.dashboard },
  { label: "Inquiry Management", to: "/admin/inquiries", icon: icons.enquiries },
  { label: "Profile Management", to: "/admin/profile", icon: icons.admins },
];

const pageMeta = [
  { to: "/admin/dashboard", title: "Dashboard", subtitle: "" },
  { to: "/admin/inquiries", title: "Inquiry Management", subtitle: "Every inquiry that has come in through the website." },
  { to: "/admin/profile", title: "Profile Management", subtitle: "Manage your admin account" },
];

const formatNow = (date, timeZone) => {
  const opts = {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  try {
    return date.toLocaleString("en-US", { ...opts, timeZone });
  } catch {
    return date.toLocaleString("en-US", opts);
  }
};

const initials = (name = "") => (name.trim()[0] || "A").toUpperCase();

function Avatar({ photo, name, size = "h-9 w-9", text = "text-sm", rounded = "rounded-xl" }) {
  const [failed, setFailed] = useState(false);
  if (photo && !failed) {
    return (
      <img
        src={photo}
        alt={name || "Admin"}
        onError={() => setFailed(true)}
        className={`${size} shrink-0 ${rounded} object-cover ring-2 ring-mist shadow-md shadow-slate-900/15 transition duration-200 group-hover:scale-105 group-hover:shadow-lg`}
      />
    );
  }
  return (
    <div
      className={`${size} ${text} flex shrink-0 items-center justify-center ${rounded} bg-gradient-to-br from-slate-900 via-slate-800 to-brand font-extrabold uppercase text-white ring-2 ring-mist shadow-md shadow-slate-900/25 transition duration-200 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-brand/40`}
    >
      {initials(name)}
    </div>
  );
}

function AdminLayout() {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [now, setNow] = useState(new Date());
  const { pathname } = useLocation();
  const matched = pageMeta.find((p) => pathname.startsWith(p.to)) || pageMeta[0];
  const page =
    matched.to === "/admin/dashboard"
      ? { ...matched, subtitle: `Welcome back, ${userData?.name || "Admin"}` }
      : matched;

  const showInquiryTabs = pathname === "/admin/inquiries" || pathname === "/admin/inquiries/followups";

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const rawPhoto = userData?.photo || userData?.profileImage || userData?.avatar;
  const photo = rawPhoto
    ? /^(https?:|data:)/.test(rawPhoto)
      ? rawPhoto
      : serverUrl + "/" + rawPhoto.replace(/^\//, "")
    : null;

  const handleLogout = async () => {
    try {
      await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true });
      dispatch(setUserData(null));
      navigate("/admin");
      toast.success("Logout Successfully", { position: "top-center", autoClose: 1000 });
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  const linkClass = ({ isActive }) =>
    "flex items-center gap-3.5 rounded-lg px-4 py-2.5 text-[15px] font-medium transition-colors duration-150 " +
    (isActive
      ? "bg-brand-soft text-brand"
      : "text-slate-700 hover:bg-slate-50 hover:text-brand");

  return (
    <div className="min-h-screen bg-[#f8f9fc] text-ink">
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={
          "fixed inset-y-0 left-0 z-40 flex w-[300px] max-w-[85vw] flex-col border-r border-mist-line bg-white transition-transform duration-200 lg:translate-x-0 " +
          (open ? "translate-x-0" : "-translate-x-full")
        }
      >
        {/* Top: logo + admin panel */}
        <div className="mx-5 flex items-center justify-center gap-3 border-b border-mist-line py-4 pl-4">
          <img
            src={serverUrl + "/uploads/amir-logo.png"}
            alt="Amir Chicken"
            className="h-11 w-auto shrink-0 object-contain"
          />
          <div className="min-w-0 leading-tight">
            <p className="truncate text-base font-bold text-ink">Admin Panel</p>
            <p className="truncate text-xs font-medium text-slate-500">Amir Chicken</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-5">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={linkClass}
              onClick={() => setOpen(false)}
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom: user + logout */}
        <div className="mx-5 border-t border-mist-line py-4">
          <div className="flex items-center gap-3 px-1 pb-4">
            <Avatar photo={photo} name={userData?.name} size="h-11 w-11" text="text-base" rounded="rounded-full" />
            <div className="min-w-0 flex-1 leading-tight">
              <p className="truncate text-sm font-bold text-ink">{userData?.name || "Admin"}</p>
              <p className="text-xs font-medium text-slate-500">Admin</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2.5 rounded-lg border border-mist-line bg-white py-2.5 text-sm font-semibold text-ink transition-colors hover:border-red-200 hover:bg-red-50 hover:text-[#c4161c]"
          >
            {icons.logout}
            Log out
          </button>
        </div>
      </aside>

      <div className="lg:pl-[300px]">
        {/* Top navbar */}
        <header className="sticky top-0 z-20 flex h-[86px] items-center justify-between gap-4 border-b border-mist-line bg-white px-4 sm:px-10">
          <div className="flex min-w-0 items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="rounded-lg p-2 text-slate-600 hover:bg-mist-deep lg:hidden"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="h-6 w-6"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div className="min-w-0 leading-tight">
              <h1 className="truncate text-2xl font-bold tracking-tight text-ink">{page.title}</h1>
              <p className="mt-1 truncate text-sm text-slate-500">{page.subtitle}</p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-4">
            {showInquiryTabs && <InquiryTabs />}
            <span className="hidden whitespace-nowrap text-sm font-medium tabular-nums text-slate-500 md:block">
              {formatNow(now, userData?.timezone)}
            </span>
            <div className="hidden h-8 w-px bg-mist-line md:block" />
            <div className="flex items-center gap-3">
              <p className="hidden max-w-[160px] truncate text-base font-bold text-ink sm:block">
                {userData?.name || "Admin"}
              </p>
              <Avatar photo={photo} name={userData?.name} size="h-11 w-11" text="text-base" rounded="rounded-full" />
            </div>
          </div>
        </header>

        <main className="px-4 py-8 sm:px-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
