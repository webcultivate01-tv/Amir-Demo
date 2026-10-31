import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AdminLayout = lazy(() => import("./components/AdminLayout"));
const ProfilePage = lazy(() => import("./pages/admin/ProfilePage"));
const InquiriesPage = lazy(() => import("./pages/admin/InquiriesPage"));
const InquiryDetailPage = lazy(() => import("./pages/admin/InquiryDetailPage"));
const FollowupsPage = lazy(() => import("./pages/admin/FollowupsPage"));
import SiteLayout from "./components/site/SiteLayout";
import HomePage from "./pages/site/HomePage";
const AboutPage = lazy(() => import("./pages/site/AboutPage"));
const CatalogPage = lazy(() => import("./pages/site/CatalogPage"));
const ContactPage = lazy(() => import("./pages/site/ContactPage"));
const NewsPage = lazy(() => import("./pages/site/NewsPage"));
const StoryDetailPage = lazy(() => import("./pages/site/StoryDetailPage"));
import useGetCurrentUser from "./CustomHooks/getCurrentUser";
const PrivacyPolicyPage = lazy(() => import("./pages/site/PrivacyPolicyPage"));
const TermsPage = lazy(() => import("./pages/site/TermsPage"));

export const serverUrl = "http://localhost:8000";

function App() {
  useGetCurrentUser();
  const { userData, authChecked } = useSelector((state) => state.user);
  const isAdmin = userData?.role === "admin";

  const { pathname } = useLocation();
  const loader = (
    <div className="min-h-screen flex items-center justify-center">
      <ClipLoader size={50} color="#000" />
    </div>
  );

  // Only /admin needs the auth result; the public site renders immediately.
  if (!authChecked && pathname.startsWith("/admin")) {
    return loader;
  }

  return (
    <>
      <ToastContainer limit={1} position="top-center" newestOnTop hideProgressBar={false} />
      <Suspense fallback={loader}>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:id" element={<StoryDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsPage />} />
        </Route>
        <Route
          path="/admin"
          element={isAdmin ? <Navigate to={"/admin/dashboard"} /> : <AdminLogin />}
        />
        <Route
          path="/admin"
          element={isAdmin ? <AdminLayout /> : <Navigate to={"/admin"} />}
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="inquiries" element={<InquiriesPage />} />
          <Route path="inquiries/followups" element={<FollowupsPage />} />
          <Route path="inquiries/:id" element={<InquiryDetailPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      </Suspense>
    </>
  );
}

export default App;
