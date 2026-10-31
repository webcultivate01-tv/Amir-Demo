import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { serverUrl } from "../../App";
import StatusBadge from "../../components/StatusBadge";
import InquiryStatCards from "../../components/InquiryStatCards";
import { INQUIRY_STATUSES, INQUIRY_TYPES, STATUS_STYLES, inputClass } from "../../utils/inquiry";
import { DEFAULT_TIMEZONE, formatDateTime, isPast } from "../../utils/dateTime";

const PAGE_SIZE = 10;
const OPEN_STATUSES = ["New", "Contacted", "In Progress", "Follow-up Required"];

const actionClass =
  "rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-200 active:scale-95";
const callClass =
  "rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100 active:scale-95";
const emailClass =
  "rounded-lg bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700 transition hover:bg-sky-100 active:scale-95";
const viewClass =
  "shrink-0 rounded-lg bg-brand px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm shadow-brand/30 transition hover:brightness-110 active:scale-95";

function InquiriesPage() {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const timeZone = userData?.timezone || DEFAULT_TIMEZONE;

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [status, setStatus] = useState("");
  const [inquiryType, setInquiryType] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [data, setData] = useState({ inquiries: [], total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(search.trim());
      setPage(1);
    }, 300);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    axios
      .get(serverUrl + "/api/inquiries", {
        params: { search: debouncedSearch, status, inquiryType, sort, page, limit: PAGE_SIZE },
        withCredentials: true,
      })
      .then((result) => {
        if (cancelled) return;
        setData(result.data);
        setLoadedCount((n) => n + 1);
      })
      .catch((error) => {
        console.log(error);
        if (!cancelled) {
          toast.error(error.response?.data?.message || "Could not load inquiries", {
            position: "top-center",
            autoClose: 2000,
          });
        }
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [debouncedSearch, status, inquiryType, sort, page]);

  const filtered = !!(debouncedSearch || status || inquiryType);
  const clearFilters = () => {
    setSearch("");
    setStatus("");
    setInquiryType("");
    setPage(1);
  };
  const changeFilter = (setter) => (e) => {
    setter(e.target.value);
    setPage(1);
  };

  const stop = (e) => e.stopPropagation();
  const open = (id) => navigate(`/admin/inquiries/${id}`);

  const followUp = (inquiry) =>
    inquiry.followUpAt && OPEN_STATUSES.includes(inquiry.status) ? (
      <p
        className={`mt-1 whitespace-nowrap text-xs ${
          isPast(inquiry.followUpAt) ? "font-semibold text-red-600" : "text-slate-500"
        }`}
      >
        Follow-up: {formatDateTime(inquiry.followUpAt, timeZone)}
      </p>
    ) : null;

  const updateStatus = async (inquiry, newStatus) => {
    if (inquiry.status === newStatus) return;
    try {
      await axios.patch(`${serverUrl}/api/inquiries/${inquiry.id}`, { status: newStatus }, { withCredentials: true });
      setData((d) => ({
        ...d,
        inquiries: d.inquiries.map((x) => (x.id === inquiry.id ? { ...x, status: newStatus } : x)),
      }));
      setLoadedCount((n) => n + 1);
      toast.success(`Marked as ${newStatus}`, { position: "top-center", autoClose: 1500 });
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not update status", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  const contactLinks = (inquiry) => (
    <>
      <a href={`tel:${inquiry.mobile}`} onClick={stop} className={callClass}>Call</a>
      <a href={`mailto:${inquiry.email}`} onClick={stop} className={emailClass}>Email</a>
    </>
  );

  return (
    <>
      <InquiryStatCards
        refreshKey={loadedCount}
        activeStatus={status}
        onSelect={(s) => {
          setStatus(s);
          setPage(1);
        }}
      />

      {/* Filters */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_200px_220px_150px]">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name, mobile, email, or location"
          aria-label="Search inquiries"
          className={`${inputClass} sm:col-span-2 lg:col-span-1`}
        />
        <select value={status} onChange={changeFilter(setStatus)} aria-label="Filter by status" className={inputClass}>
          <option value="">All statuses</option>
          {INQUIRY_STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <select value={inquiryType} onChange={changeFilter(setInquiryType)} aria-label="Filter by inquiry type" className={inputClass}>
          <option value="">All inquiry types</option>
          {INQUIRY_TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        <select value={sort} onChange={changeFilter(setSort)} aria-label="Sort order" className={inputClass}>
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-mist-line bg-white shadow-sm">
        {loading && data.inquiries.length === 0 ? (
          <div className="flex justify-center py-16">
            <ClipLoader size={32} color="#4f46e5" />
          </div>
        ) : data.inquiries.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="font-semibold text-ink">{filtered ? "No inquiries match your filters" : "No inquiries yet"}</p>
            <p className="mt-1 text-sm text-slate-500">
              {filtered ? "Try a different search or clear the filters." : "New website inquiries will show up here."}
            </p>
            {filtered && (
              <button onClick={clearFilters} className={`${actionClass} mt-4`}>
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <div className={loading ? "opacity-60 transition-opacity" : "transition-opacity"}>
            {/* Desktop table */}
            <div className="hidden md:block">
              <table className="w-full table-fixed text-left text-sm">
                <colgroup>
                  <col className="w-[6%]" />
                  <col className="w-[16%]" />
                  <col className="w-[13%]" />
                  <col className="w-[15%]" />
                  <col className="w-[13%]" />
                  <col className="w-[15%]" />
                  <col className="w-[22%]" />
                </colgroup>
                <thead className="border-b border-mist-line bg-brand-soft/60 text-xs font-bold uppercase tracking-wide text-brand">
                  <tr>
                    {["No", "Name", "Number", "Inquiry Type", "Location", "Date", "Actions"].map((h) => (
                      <th key={h} className="truncate px-3 py-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-mist-line">
                  {data.inquiries.map((i, index) => (
                    <tr key={i.id} onClick={() => open(i.id)} className="cursor-pointer transition-colors hover:bg-mist/60">
                      <td className="px-3 py-3 font-semibold text-slate-500">{(page - 1) * PAGE_SIZE + index + 1}</td>
                      <td className="truncate px-3 py-3 text-slate-700" title={i.name}>{i.name}</td>
                      <td className="truncate px-3 py-3 text-slate-700">{i.mobile}</td>
                      <td className="truncate px-3 py-3 text-slate-700" title={i.inquiryType}>{i.inquiryType}</td>
                      <td className="truncate px-3 py-3 text-slate-700" title={i.location}>{i.location || "—"}</td>
                      <td className="truncate px-3 py-3 text-slate-600" title={formatDateTime(i.createdAt, timeZone)}>
                        {formatDateTime(i.createdAt, timeZone)}
                      </td>
                      <td className="px-3 py-3" onClick={stop}>
                        <div className="flex items-center gap-2">
                          <select
                            value={i.status}
                            onChange={(e) => updateStatus(i, e.target.value)}
                            aria-label={`Status for ${i.name}`}
                            className={`min-w-0 flex-1 cursor-pointer rounded-full px-2.5 py-1 text-xs font-semibold outline-none ring-1 ring-inset focus:ring-2 ${STATUS_STYLES[i.status] || STATUS_STYLES.Closed}`}
                          >
                            {INQUIRY_STATUSES.map((s) => (
                              <option
                                key={s}
                                value={s}
                                disabled={INQUIRY_STATUSES.indexOf(s) < INQUIRY_STATUSES.indexOf(i.status)}
                                className="bg-white text-ink"
                              >
                                {s}
                              </option>
                            ))}
                          </select>
                          <button onClick={() => open(i.id)} className={viewClass}>
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <ul className="divide-y divide-mist-line md:hidden">
              {data.inquiries.map((i) => (
                <li key={i.id} onClick={() => open(i.id)} className="cursor-pointer px-4 py-4 active:bg-mist/60">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-ink">{i.name}</p>
                      <p className="text-xs text-slate-400">{i.inquiryType}</p>
                    </div>
                    <StatusBadge status={i.status} />
                  </div>
                  <p className="mt-2 text-sm text-slate-700">
                    {i.mobile}
                    {i.location ? ` · ${i.location}` : ""}
                  </p>
                  {followUp(i)}
                  <p className="mt-1 text-xs text-slate-500">
                    Created {formatDateTime(i.createdAt, timeZone)} · Updated {formatDateTime(i.updatedAt, timeZone)}
                  </p>
                  <div className="mt-3 flex gap-1.5">
                    <button onClick={() => open(i.id)} className={viewClass}>View</button>
                    {contactLinks(i)}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {data.total > 0 && (
          <div className="flex items-center justify-between gap-3 border-t border-mist-line px-4 py-3 text-sm text-slate-600">
            <span>
              {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, data.total)} of {data.total}
            </span>
            <div className="flex gap-2">
              <button
                disabled={page <= 1 || loading}
                onClick={() => setPage((p) => p - 1)}
                className={`${actionClass} disabled:cursor-not-allowed disabled:opacity-40`}
              >
                Previous
              </button>
              <button
                disabled={page >= data.totalPages || loading}
                onClick={() => setPage((p) => p + 1)}
                className={`${actionClass} disabled:cursor-not-allowed disabled:opacity-40`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default InquiriesPage;
