import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../App";

const cards = [
  { label: "Total Inquiries", status: "", get: (s) => s.total, accent: "text-brand", tile: "bg-brand-soft text-brand", path: "M4 6h16M4 12h16M4 18h10" },
  { label: "New", status: "New", get: (s) => s.byStatus.New, accent: "text-blue-600", tile: "bg-blue-50 text-blue-600", path: "M12 5v14M5 12h14" },
  { label: "In Progress", status: "In Progress", get: (s) => s.byStatus["In Progress"], accent: "text-amber-600", tile: "bg-amber-50 text-amber-600", path: "M12 6v6l4 2M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" },
  { label: "Follow-up Required", status: "Follow-up Required", get: (s) => s.byStatus["Follow-up Required"], accent: "text-orange-600", tile: "bg-orange-50 text-orange-600", path: "M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5" },
  { label: "Converted", status: "Converted", get: (s) => s.byStatus.Converted, accent: "text-emerald-600", tile: "bg-emerald-50 text-emerald-600", path: "M20 6 9 17l-5-5" },
  { label: "Closed", status: "Closed", get: (s) => s.byStatus.Closed, accent: "text-slate-600", tile: "bg-slate-100 text-slate-600", path: "M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4" },
];

// `refreshKey` changes whenever the list reloads, so the counts stay in step with the data
// With `onSelect`, cards become filter buttons; `status` is "" for the Total card
function InquiryStatCards({ refreshKey = 0, activeStatus = "", onSelect }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    let cancelled = false;
    axios
      .get(serverUrl + "/api/inquiries/stats", { withCredentials: true })
      .then((result) => !cancelled && setStats(result.data))
      .catch((error) => console.log(error));
    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
      {cards.map((card) => {
        const clickable = !!onSelect;
        const active = clickable && !!activeStatus && activeStatus === card.status;
        const Tag = clickable ? "button" : "div";
        return (
        <Tag
          key={card.label}
          type={clickable ? "button" : undefined}
          onClick={clickable ? () => onSelect(card.status) : undefined}
          aria-pressed={clickable ? active : undefined}
          className={`flex items-center gap-3 rounded-xl border bg-white px-4 py-3.5 text-left shadow-sm transition-colors ${
            active ? "border-brand ring-1 ring-brand" : "border-mist-line"
          } ${clickable ? "cursor-pointer hover:border-brand" : ""}`}
        >
          <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${card.tile}`}>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d={card.path} />
            </svg>
          </span>
          <div className="min-w-0">
            <p className={`text-2xl font-bold leading-none tabular-nums ${card.accent}`}>
              {stats ? card.get(stats) : "–"}
            </p>
            <p className="mt-1 truncate text-xs font-semibold text-slate-500">{card.label}</p>
          </div>
        </Tag>
        );
      })}
    </div>
  );
}

export default InquiryStatCards;
