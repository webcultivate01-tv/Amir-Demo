import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { serverUrl } from "../App";
import InquiryStatCards from "../components/InquiryStatCards";
import { STATUS_STYLES } from "../utils/inquiry";

const STATUS_COLORS = {
  New: "#6366f1",
  Contacted: "#0ea5e9",
  "In Progress": "#f59e0b",
  "Follow-up Required": "#f97316",
  Converted: "#10b981",
  Closed: "#94a3b8",
  "Not Interested": "#f43f5e",
  Spam: "#d946ef",
};

const TYPE_COLOR = "#4f46e5";

function Card({ title, subtitle, children, className = "" }) {
  return (
    <section className={`rounded-xl border border-mist-line bg-white p-5 shadow-sm ${className}`}>
      <h2 className="text-sm font-bold text-ink">{title}</h2>
      {subtitle && <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );
}

// ring chart: one arc per status, total in the centre
function DonutChart({ byStatus, total }) {
  const entries = Object.entries(byStatus).filter(([, count]) => count > 0);
  const r = 70;
  const c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row">
      <svg viewBox="0 0 200 200" className="h-44 w-44 shrink-0 -rotate-90" role="img" aria-label="Inquiries by status">
        <circle cx="100" cy="100" r={r} fill="none" stroke="#eef0f6" strokeWidth="26" />
        {entries.map(([status, count]) => {
          const len = (count / total) * c;
          const el = (
            <circle
              key={status}
              cx="100"
              cy="100"
              r={r}
              fill="none"
              stroke={STATUS_COLORS[status]}
              strokeWidth="26"
              strokeDasharray={`${Math.max(len - 2, 0)} ${c}`}
              strokeDashoffset={-offset}
            >
              <title>{`${status}: ${count}`}</title>
            </circle>
          );
          offset += len;
          return el;
        })}
        <g className="rotate-90" style={{ transformOrigin: "100px 100px" }}>
          <text x="100" y="104" textAnchor="middle" className="fill-ink text-[34px] font-bold">
            {total}
          </text>
          <text x="100" y="124" textAnchor="middle" className="fill-slate-500 text-[11px] font-semibold">
            inquiries
          </text>
        </g>
      </svg>
      <ul className="grid w-full grid-cols-1 gap-x-6 gap-y-1.5 text-xs min-[420px]:grid-cols-2 sm:grid-cols-1 lg:grid-cols-2">
        {Object.entries(byStatus).map(([status, count]) => (
          <li key={status} className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-2 text-slate-600">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: STATUS_COLORS[status] }} />
              {status}
            </span>
            <span className="font-semibold tabular-nums text-ink">{count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// area + line chart of inquiries per day
function TrendChart({ daily }) {
  const W = 600;
  const H = 200;
  const pad = { t: 12, r: 12, b: 24, l: 28 };
  const max = Math.max(4, ...daily.map((d) => d.count));
  const x = (i) => pad.l + (i * (W - pad.l - pad.r)) / (daily.length - 1);
  const y = (v) => pad.t + (1 - v / max) * (H - pad.t - pad.b);
  const line = daily.map((d, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(d.count).toFixed(1)}`).join(" ");
  const area = `${line} L${x(daily.length - 1)} ${H - pad.b} L${x(0)} ${H - pad.b} Z`;
  const ticks = [0, 0.5, 1].map((f) => Math.round(max * f));
  const label = (day) => new Date(day + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-52 w-full" role="img" aria-label="Inquiries over the last 30 days">
      <defs>
        <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={TYPE_COLOR} stopOpacity="0.28" />
          <stop offset="100%" stopColor={TYPE_COLOR} stopOpacity="0" />
        </linearGradient>
      </defs>
      {ticks.map((t) => (
        <g key={t}>
          <line x1={pad.l} x2={W - pad.r} y1={y(t)} y2={y(t)} stroke="#e5e9f4" strokeDasharray="3 4" />
          <text x={pad.l - 6} y={y(t) + 3} textAnchor="end" className="fill-slate-400 text-[10px]">
            {t}
          </text>
        </g>
      ))}
      <path d={area} fill="url(#trendFill)" />
      <path d={line} fill="none" stroke={TYPE_COLOR} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      {daily.map((d, i) => (
        <circle key={d.day} cx={x(i)} cy={y(d.count)} r={d.count ? 3.5 : 6} fill={d.count ? TYPE_COLOR : "transparent"}>
          <title>{`${label(d.day)}: ${d.count}`}</title>
        </circle>
      ))}
      {[0, Math.floor(daily.length / 2), daily.length - 1].map((i) => (
        <text key={i} x={x(i)} y={H - 6} textAnchor={i === 0 ? "start" : i === daily.length - 1 ? "end" : "middle"} className="fill-slate-400 text-[10px]">
          {label(daily[i].day)}
        </text>
      ))}
    </svg>
  );
}

// horizontal bars, longest = 100%
function TypeBars({ byType }) {
  const entries = Object.entries(byType).sort((a, b) => b[1] - a[1]);
  const max = Math.max(1, ...entries.map(([, n]) => n));
  return (
    <ul className="space-y-3">
      {entries.map(([type, count]) => (
        <li key={type}>
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="font-medium text-slate-600">{type}</span>
            <span className="font-semibold tabular-nums text-ink">{count}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-mist-deep">
            <div className="h-full rounded-full bg-brand transition-all duration-700" style={{ width: `${(count / max) * 100}%` }} />
          </div>
        </li>
      ))}
    </ul>
  );
}

function ConversionGauge({ rate }) {
  const r = 52;
  const c = Math.PI * r; // half circle
  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 140 85" className="w-48" role="img" aria-label={`Conversion rate ${rate}%`}>
        <path d="M18 75 A52 52 0 0 1 122 75" fill="none" stroke="#eef0f6" strokeWidth="14" strokeLinecap="round" />
        <path
          d="M18 75 A52 52 0 0 1 122 75"
          fill="none"
          stroke="#10b981"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={`${(rate / 100) * c} ${c}`}
        />
        <text x="70" y="68" textAnchor="middle" className="fill-ink text-[24px] font-bold">
          {rate}%
        </text>
      </svg>
      <p className="-mt-1 text-xs text-slate-500">of inquiries converted</p>
    </div>
  );
}

const timeAgo = (value) => {
  const mins = Math.max(0, Math.floor((Date.now() - new Date(value).getTime()) / 60000));
  if (mins < 60) return `${mins || 1}m ago`;
  if (mins < 1440) return `${Math.floor(mins / 60)}h ago`;
  return `${Math.floor(mins / 1440)}d ago`;
};

function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios
      .get(serverUrl + "/api/inquiries/stats", { withCredentials: true })
      .then((result) => setStats(result.data))
      .catch((error) => console.log(error));
  }, []);

  const total = stats?.total || 0;
  const conversion = total ? Math.round((stats.byStatus.Converted / total) * 100) : 0;
  const last7 = stats ? stats.daily.slice(-7).reduce((s, d) => s + d.count, 0) : 0;

  return (
    <div className="space-y-5">
      <InquiryStatCards />

      {stats && (
        <>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-gradient-to-br from-brand to-indigo-400 p-5 text-white shadow-sm">
              <p className="text-xs font-semibold text-white/80">Last 7 days</p>
              <p className="mt-1 text-3xl font-bold tabular-nums">{last7}</p>
              <p className="text-xs text-white/80">new inquiries received</p>
            </div>
            <Link to="/admin/inquiries/followups" className="rounded-xl border border-mist-line bg-white p-5 shadow-sm transition-colors hover:border-brand">
              <p className="text-xs font-semibold text-slate-500">Pending follow-ups</p>
              <p className="mt-1 text-3xl font-bold tabular-nums text-amber-600">{stats.followups.pending}</p>
              <p className="text-xs text-slate-500">scheduled calls, emails &amp; meetings</p>
            </Link>
            <Link to="/admin/inquiries/followups" className="rounded-xl border border-mist-line bg-white p-5 shadow-sm transition-colors hover:border-brand">
              <p className="text-xs font-semibold text-slate-500">Overdue follow-ups</p>
              <p className={`mt-1 text-3xl font-bold tabular-nums ${stats.followups.overdue ? "text-rose-600" : "text-emerald-600"}`}>
                {stats.followups.overdue}
              </p>
              <p className="text-xs text-slate-500">{stats.followups.overdue ? "need attention now" : "all caught up"}</p>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            <Card title="Inquiry trend" subtitle="New inquiries per day, last 30 days" className="lg:col-span-2">
              <TrendChart daily={stats.daily} />
            </Card>
            <Card title="Conversion rate" subtitle="Converted vs. all inquiries">
              <ConversionGauge rate={conversion} />
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <Card title="Status breakdown" subtitle="Where every inquiry stands">
              <DonutChart byStatus={stats.byStatus} total={total} />
            </Card>
            <Card title="Inquiry types" subtitle="What customers are asking about">
              <TypeBars byType={stats.byType} />
            </Card>
          </div>

          <Card title="Recent inquiries" subtitle="The latest messages from customers">
            {stats.recent.length === 0 ? (
              <p className="py-6 text-center text-sm text-slate-500">No inquiries yet.</p>
            ) : (
              <ul className="divide-y divide-mist-line">
                {stats.recent.map((item) => (
                  <li key={item.id}>
                    <Link to={`/admin/inquiries/${item.id}`} className="flex items-center justify-between gap-3 py-3 hover:bg-mist/60">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-ink">{item.name}</p>
                        <p className="truncate text-xs text-slate-500">
                          {item.inquiryType} · {timeAgo(item.createdAt)}
                        </p>
                      </div>
                      <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${STATUS_STYLES[item.status]}`}>
                        {item.status}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </>
      )}
    </div>
  );
}

export default Dashboard;
