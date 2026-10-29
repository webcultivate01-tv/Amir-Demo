import React from "react";

/* Section label: same pattern as the About page */
export const SectionLabel = ({ children, light = false }) => (
  <div className="flex items-center gap-3">
    <span className={`block h-px w-7 ${light ? "bg-white" : "bg-[#EC1F36]"}`} />
    <p
      className={`font-poppins text-[11px] font-medium uppercase tracking-[0.18em] ${
        light ? "text-white" : "text-[#EC1F36]"
      }`}
    >
      {children}
    </p>
  </div>
);

export const Arrow = ({ className = "h-4 w-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className={className}
    aria-hidden="true"
    focusable="false"
  >
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);
