import React from "react";
import { NavLink } from "react-router-dom";

const tabs = [
  { label: "Inquiries", to: "/admin/inquiries", end: true },
  { label: "Follow-ups", to: "/admin/inquiries/followups" },
];

function InquiryTabs() {
  return (
    <div className="flex gap-1 rounded-xl bg-slate-100 p-1">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.end}
          className={({ isActive }) =>
            `whitespace-nowrap rounded-lg px-4 py-1.5 text-sm font-semibold transition ${
              isActive ? "bg-white text-brand shadow-sm" : "text-slate-500 hover:text-ink"
            }`
          }
        >
          {tab.label}
        </NavLink>
      ))}
    </div>
  );
}

export default InquiryTabs;
