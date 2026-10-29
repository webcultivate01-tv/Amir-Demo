import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SiteLayout from "./components/site/SiteLayout";
import HomePage from "./pages/site/HomePage";
import AboutPage from "./pages/site/AboutPage";
import CatalogPage from "./pages/site/CatalogPage";
import ContactPage from "./pages/site/ContactPage";
import NewsPage from "./pages/site/NewsPage";
import PrivacyPolicyPage from "./pages/site/PrivacyPolicyPage";
import TermsPage from "./pages/site/TermsPage";

function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
