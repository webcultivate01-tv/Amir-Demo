import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { serverUrl } from "../../App";
import { inputClass } from "../../utils/inquiry";
import { DEFAULT_TIMEZONE, formatDateTime, fromLocalInput, isPast, toLocalInput } from "../../utils/dateTime";

const PAGE_SIZE = 10;

const actionClass =
  "rounded-lg border border-mist-line px-2.5 py-1 text-xs font-semibold text-slate-700 transition hover:border-brand/40 hover:bg-brand-soft hover:text-brand disabled:cursor-not-allowed disabled:opacity-40";

function FollowupsPage() {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const timeZone = userData?.timezone || DEFAULT_TIMEZONE;

  const [status, setStatus] = useState("Pending");
  const [when, setWhen] = useState("all");
  const [customDate, setCustomDate] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState({ followups: [], total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(0);
  const [completing, setCompleting] = useState(null);

  // the selected day as a [from, to) UTC range, computed in the admin's timezone
  const range = (() => {
    const dayOffset = { today: 0, tomorrow: 1 }[when];
    let day = when === "custom" ? customDate : "";
    if (dayOffset !== undefined) {
      const [y, m, d] = toLocalInput(new Date(), timeZone).slice(0, 10).split("-").map(Number);
      day = new Date(Date.UTC(y, m - 1, d + dayOffset)).toISOString().slice(0, 10);
    }
    if (!day) return {};
    const [y, m, d] = day.split("-").map(Number);
    const next = new Date(Date.UTC(y, m - 1, d + 1)).toISOString().slice(0, 10);
    return { from: fromLocalInput(`${day}T00:00`, timeZone), to: fromLocalInput(`${next}T00:00`, timeZone) };
  })();

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    axios
      .get(serverUrl + "/api/inquiries/followups", {
        params: { status, page, limit: PAGE_SIZE, from: range.from, to: range.to },
        withCredentials: true,
      })
      .then((result) => !cancelled && setData(result.data))
      .catch((error) => {
        console.log(error);
        if (!cancelled) {
          toast.error(error.response?.data?.message || "Could not load follow-ups", {
            position: "top-center",
            autoClose: 2000,
          });
        }
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [status, page, reload, range.from, range.to]);

  const complete = async (followup) => {
    setCompleting(followup.id);
    try {
      const result = await axios.patch(`${serverUrl}/api/inquiries/followups/${followup.id}`, {}, { withCredentials: true });
      toast.success(result.data.message, { position: "top-center", autoClose: 1200 });
      setReload((n) => n + 1);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong", { position: "top-center", autoClose: 2000 });
    } finally {
      setCompleting(null);
    }
  };

  const open = (inquiryId) => navigate(`/admin/inquiries/${inquiryId}`);

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <select
          value={when}
          onChange={(e) => {
            setWhen(e.target.value);
            setPage(1);
          }}
          aria-label="Filter follow-ups by date"
          className={`${inputClass} sm:max-w-[200px]`}
        >
          <option value="all">All dates</option>
          <option value="today">Today</option>
          <option value="tomorrow">Tomorrow</option>
          <option value="custom">Custom date</option>
        </select>
        {when === "custom" && (
          <input
            type="date"
            value={customDate}
            onChange={(e) => {
              setCustomDate(e.target.value);
              setPage(1);
            }}
            aria-label="Pick a follow-up date"
            className={`${inputClass} sm:max-w-[200px]`}
          />
        )}
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          aria-label="Filter follow-ups by status"
          className={`${inputClass} sm:max-w-[200px]`}
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="">All follow-ups</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-xl border border-mist-line bg-white">
        {loading && data.followups.length === 0 ? (
          <div className="flex justify-center py-16">
            <ClipLoader size={32} color="#4f46e5" />
          </div>
        ) : data.followups.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="font-semibold text-ink">No follow-ups here</p>
            <p className="mt-1 text-sm text-slate-500">Schedule follow-ups from an inquiry&apos;s detail page.</p>
          </div>
        ) : (
          <ul className={`divide-y divide-mist-line ${loading ? "opacity-60 transition-opacity" : "transition-opacity"}`}>
            {data.followups.map((f) => {
              const done = f.status === "Completed";
              const overdue = !done && isPast(f.scheduledAt);
              return (
                <li
                  key={f.id}
                  onClick={() => open(f.inquiryId)}
                  className="flex cursor-pointer flex-wrap items-start justify-between gap-3 px-4 py-4 transition-colors hover:bg-mist/60"
                >
                  <div className="min-w-0">
                    <p className={`text-sm font-semibold ${done ? "text-slate-400 line-through" : overdue ? "text-red-600" : "text-ink"}`}>
                      {f.type} · {formatDateTime(f.scheduledAt, timeZone)}
                      {overdue && <span className="ml-2 text-xs font-bold uppercase">Overdue</span>}
                    </p>
                    <p className="mt-0.5 text-sm text-ink">
                      {f.name}
                    </p>
                    <p className="text-xs text-slate-500">{f.mobile}</p>
                    {f.notes && <p className="mt-1 whitespace-pre-wrap break-words text-sm text-slate-600">{f.notes}</p>}
                    {done && <p className="mt-1 text-xs text-slate-500">Completed {formatDateTime(f.completedAt, timeZone)}</p>}
                  </div>
                  {!done && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        complete(f);
                      }}
                      disabled={completing === f.id}
                      className={actionClass}
                    >
                      Mark done
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        )}

        {data.total > 0 && (
          <div className="flex items-center justify-between gap-3 border-t border-mist-line px-4 py-3 text-sm text-slate-600">
            <span>
              {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, data.total)} of {data.total}
            </span>
            <div className="flex gap-2">
              <button disabled={page <= 1 || loading} onClick={() => setPage((p) => p - 1)} className={actionClass}>
                Previous
              </button>
              <button disabled={page >= data.totalPages || loading} onClick={() => setPage((p) => p + 1)} className={actionClass}>
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default FollowupsPage;
