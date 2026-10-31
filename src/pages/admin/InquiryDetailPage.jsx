import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { serverUrl } from "../../App";
import StatusBadge from "../../components/StatusBadge";
import { FOLLOWUP_TYPES, INQUIRY_STATUSES, inputClass } from "../../utils/inquiry";
import { DEFAULT_TIMEZONE, formatDateTime, fromLocalInput, isPast } from "../../utils/dateTime";

const cardClass = "rounded-xl border border-mist-line bg-white p-5 sm:p-6";
const primaryBtn =
  "flex items-center justify-center rounded-lg bg-[#c4161c] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#a51217] disabled:cursor-not-allowed disabled:opacity-50";
const outlineBtn =
  "rounded-lg border border-mist-line bg-white px-3.5 py-2 text-sm font-semibold text-ink transition hover:border-brand/40 hover:bg-brand-soft hover:text-brand disabled:cursor-not-allowed disabled:opacity-50";

function Card({ title, children }) {
  return (
    <section className={cardClass}>
      <h2 className="mb-4 text-base font-bold text-ink">{title}</h2>
      {children}
    </section>
  );
}

function Field({ label, children }) {
  return (
    <div className="min-w-0">
      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</dt>
      <dd className="mt-1 break-words text-sm text-ink">{children}</dd>
    </div>
  );
}

const DOT = {
  created: "bg-blue-500",
  status: "bg-brand",
  note: "bg-amber-500",
  followup: "bg-orange-500",
  followup_done: "bg-emerald-500",
  reply: "bg-violet-500",
};

const emptyFollowup = { at: "", type: "Call", notes: "" };

function InquiryDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const timeZone = userData?.timezone || DEFAULT_TIMEZONE;

  const [inquiry, setInquiry] = useState(null);
  const [activities, setActivities] = useState([]);
  const [notes, setNotes] = useState([]);
  const [followups, setFollowups] = useState([]);
  const [replies, setReplies] = useState([]);
  const [replyForm, setReplyForm] = useState({ subject: "", message: "" });
  const [notFound, setNotFound] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [followupForm, setFollowupForm] = useState(emptyFollowup);
  const [busy, setBusy] = useState("");
  const [tab, setTab] = useState("reply");

  const sync = (data) => {
    setInquiry(data.inquiry);
    setActivities(data.activities);
    setNotes(data.notes);
    setFollowups(data.followups);
    setReplies(data.replies);
  };

  useEffect(() => {
    let cancelled = false;
    axios
      .get(`${serverUrl}/api/inquiries/${id}`, { withCredentials: true })
      .then((result) => !cancelled && sync(result.data))
      .catch((error) => {
        console.log(error);
        if (!cancelled) setNotFound(true);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  const toastError = (message) => toast.error(message, { position: "top-center", autoClose: 2000 });

  // every change goes through here: one request, then the page re-syncs from the response
  const run = async (key, request, onDone) => {
    setBusy(key);
    try {
      const result = await request();
      if (result.data.inquiry) sync(result.data);
      toast.success(result.data.message, { position: "top-center", autoClose: 1200 });
      onDone?.();
    } catch (error) {
      console.log(error);
      toastError(error.response?.data?.message || "Something went wrong");
    } finally {
      setBusy("");
    }
  };
  const api = `${serverUrl}/api/inquiries/${id}`;
  const opts = { withCredentials: true };

  const changeStatus = (status) => run("status", () => axios.patch(api, { status }, opts));

  const addNote = (e) => {
    e.preventDefault();
    run("note", () => axios.post(`${api}/notes`, { note: newNote }, opts), () => setNewNote(""));
  };
  const sendReply = (e) => {
    e.preventDefault();
    run(
      "reply",
      () => axios.post(`${api}/reply`, replyForm, opts),
      () => setReplyForm({ subject: "", message: "" })
    );
  };
  const removeNote = (noteId) => {
    if (!window.confirm("Delete this note? This cannot be undone.")) return;
    run(`note-${noteId}`, () => axios.delete(`${api}/notes/${noteId}`, opts));
  };

  const addFollowup = (e) => {
    e.preventDefault();
    const body = {
      scheduledAt: fromLocalInput(followupForm.at, timeZone),
      type: followupForm.type,
      notes: followupForm.notes,
    };
    run("followup", () => axios.post(`${api}/followups`, body, opts), () => setFollowupForm(emptyFollowup));
  };
  const completeFollowup = (followupId) =>
    run(`followup-${followupId}`, () => axios.patch(`${api}/followups/${followupId}`, {}, opts));
  const removeFollowup = (followupId) => {
    if (!window.confirm("Delete this follow-up? This cannot be undone.")) return;
    run(`followup-${followupId}`, () => axios.delete(`${api}/followups/${followupId}`, opts));
  };

  const removeInquiry = () => {
    if (!window.confirm(`Delete ${inquiry.name}? This cannot be undone.`)) return;
    run("delete", () => axios.delete(api, opts), () => navigate("/admin/inquiries"));
  };

  if (notFound) {
    return (
      <div className={`${cardClass} text-center`}>
        <p className="font-semibold text-ink">Inquiry not found</p>
        <Link to="/admin/inquiries" className={`${outlineBtn} mt-4 inline-block`}>Back to inquiries</Link>
      </div>
    );
  }
  if (!inquiry) {
    return (
      <div className="flex justify-center py-20">
        <ClipLoader size={32} color="#4f46e5" />
      </div>
    );
  }

  const renderActivity = (a) => {
    if (a.type === "status") {
      const [from, to] = a.detail.split("|");
      return (
        <p className="text-sm text-ink">
          Status changed from <b>{from}</b> to <b>{to}</b>
        </p>
      );
    }
    if (a.type === "followup" || a.type === "followup_done") {
      // "ISO|Type"; the old single follow-up logged just "ISO", or "" when it was cleared
      const [when, type] = a.detail.split("|");
      if (!when) return <p className="text-sm text-ink">Follow-up cleared</p>;
      return (
        <p className="text-sm text-ink">
          {a.type === "followup" ? "Follow-up scheduled" : "Follow-up completed"}
          {type && <> — <b>{type}</b></>} for <b>{formatDateTime(when, timeZone)}</b>
        </p>
      );
    }
    if (a.type === "reply") {
      return (
        <p className="text-sm text-ink">
          Email reply sent — <b>{a.detail}</b>
        </p>
      );
    }
    if (a.type === "note") {
      return a.detail ? (
        <div className="text-sm text-ink">
          Note added
          <p className="mt-1 whitespace-pre-wrap rounded-lg bg-mist/70 px-3 py-2 text-slate-700">{a.detail}</p>
        </div>
      ) : (
        <p className="text-sm text-ink">Note cleared</p>
      );
    }
    return <p className="text-sm text-ink">{a.detail}</p>;
  };

  const openReply = () => {
    setTab("reply");
    setReplyForm((form) => (form.subject ? form : { ...form, subject: `Re: ${inquiry.inquiryType} - Amir Chicken` }));
  };
  const initials = inquiry.name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("");
  const pending = followups.filter((f) => f.status !== "Completed");
  const nextFollowup = [...pending].sort((a, b) => new Date(a.scheduledAt) - new Date(b.scheduledAt))[0];
  const tabs = [
    { key: "reply", label: "Reply", count: replies.length },
    { key: "followups", label: "Follow-ups", count: pending.length },
    { key: "notes", label: "Notes", count: notes.length },
    { key: "activity", label: "Activity", count: activities.length },
  ];

  return (
    <>
      <Link to="/admin/inquiries" className="text-sm font-semibold text-slate-500 hover:text-brand">
        ← All inquiries
      </Link>

      {/* Hero */}
      <section className={`${cardClass} mt-3`}>
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-soft text-lg font-bold text-brand">
              {initials || "?"}
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="break-words text-2xl font-bold tracking-tight text-ink">{inquiry.name}</h1>
                <StatusBadge status={inquiry.status} />
              </div>
              <p className="mt-1 text-sm text-slate-500">
                {inquiry.inquiryType} · Received {formatDateTime(inquiry.createdAt, timeZone)}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href={`tel:${inquiry.mobile}`} className={primaryBtn}>Call</a>
            <button onClick={openReply} className={outlineBtn}>Reply</button>
            <button
              onClick={removeInquiry}
              disabled={busy === "delete"}
              className={`${outlineBtn} hover:!border-red-300 hover:!bg-red-50 hover:!text-red-600`}
            >
              Delete
            </button>
          </div>
        </div>

        <div className="mt-5 border-t border-mist-line pt-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Update status</p>
          <div className="flex flex-wrap gap-2">
            {INQUIRY_STATUSES.map((s) => {
              const active = s === inquiry.status;
              const behind = INQUIRY_STATUSES.indexOf(s) < INQUIRY_STATUSES.indexOf(inquiry.status);
              return (
                <button
                  key={s}
                  type="button"
                  disabled={active || behind || busy === "status"}
                  aria-pressed={active}
                  onClick={() => changeStatus(s)}
                  className={`rounded-full px-3.5 py-1.5 text-sm font-semibold ring-1 ring-inset transition disabled:cursor-default ${
                    active
                      ? "bg-brand text-white ring-brand"
                      : "bg-white text-slate-600 ring-mist-line hover:bg-brand-soft hover:text-brand disabled:opacity-50"
                  }`}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <div className="mt-6 grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="flex min-w-0 flex-col gap-6">
          <Card title="Message">
            <p className="whitespace-pre-wrap break-words rounded-lg bg-mist/70 px-4 py-4 text-[15px] leading-relaxed text-ink">
              {inquiry.message}
            </p>
          </Card>

          <section className={`${cardClass} !p-0`}>
            <div role="tablist" className="flex gap-1 overflow-x-auto border-b border-mist-line px-3 sm:px-4">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  role="tab"
                  aria-selected={tab === t.key}
                  onClick={() => setTab(t.key)}
                  className={`-mb-px flex items-center gap-2 whitespace-nowrap border-b-2 px-3 py-3.5 text-sm font-semibold transition ${
                    tab === t.key ? "border-brand text-brand" : "border-transparent text-slate-500 hover:text-ink"
                  }`}
                >
                  {t.label}
                  <span className="rounded-full bg-mist px-2 py-0.5 text-xs text-slate-600">{t.count}</span>
                </button>
              ))}
            </div>

            <div className="p-5 sm:p-6">
              {tab === "reply" && (
                <>
                  <form onSubmit={sendReply} className="flex flex-col gap-3">
                    <p className="text-sm text-slate-600">
                      To: <b className="text-ink">{inquiry.name}</b> &lt;{inquiry.email}&gt;
                    </p>
                    <input
                      type="text"
                      required
                      maxLength={200}
                      aria-label="Reply subject"
                      placeholder="Subject"
                      value={replyForm.subject}
                      onChange={(e) => setReplyForm({ ...replyForm, subject: e.target.value })}
                      className={inputClass}
                    />
                    <textarea
                      rows={7}
                      required
                      maxLength={5000}
                      aria-label="Reply message"
                      placeholder={`Hi ${inquiry.name.split(" ")[0]},`}
                      value={replyForm.message}
                      onChange={(e) => setReplyForm({ ...replyForm, message: e.target.value })}
                      className={inputClass}
                    />
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs text-slate-500">
                        Sent from your name; the customer's answer goes to {userData?.email || "your email"}.
                      </p>
                      <button
                        type="submit"
                        disabled={!replyForm.subject.trim() || !replyForm.message.trim() || busy === "reply"}
                        className={primaryBtn}
                      >
                        {busy === "reply" ? <ClipLoader size={18} color="white" /> : "Send reply"}
                      </button>
                    </div>
                  </form>

                  {replies.length > 0 && (
                    <ul className="mt-5 flex flex-col gap-3 border-t border-mist-line pt-5">
                      {replies.map((r) => (
                        <li key={r.id} className="rounded-lg border border-mist-line px-4 py-3">
                          <p className="text-sm font-semibold text-ink">{r.subject}</p>
                          <p className="mt-1 whitespace-pre-wrap break-words text-sm text-slate-700">{r.body}</p>
                          <p className="mt-2 text-xs text-slate-500">
                            Sent by {r.adminName || "Admin"} · {formatDateTime(r.createdAt, timeZone)}
                          </p>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}

              {tab === "followups" && (
                <>
                  <form onSubmit={addFollowup} className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_140px]">
                    <input
                      type="datetime-local"
                      required
                      aria-label="Follow-up date and time"
                      value={followupForm.at}
                      onChange={(e) => setFollowupForm({ ...followupForm, at: e.target.value })}
                      className={inputClass}
                    />
                    <select
                      aria-label="Follow-up type"
                      value={followupForm.type}
                      onChange={(e) => setFollowupForm({ ...followupForm, type: e.target.value })}
                      className={inputClass}
                    >
                      {FOLLOWUP_TYPES.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      maxLength={1000}
                      aria-label="Follow-up notes"
                      placeholder="What should be discussed? (optional)"
                      value={followupForm.notes}
                      onChange={(e) => setFollowupForm({ ...followupForm, notes: e.target.value })}
                      className={`${inputClass} sm:col-span-2`}
                    />
                    <div className="flex items-center justify-between gap-3 sm:col-span-2">
                      <p className="text-xs text-slate-500">Times are in your timezone ({timeZone}).</p>
                      <button type="submit" disabled={!followupForm.at || busy === "followup"} className={primaryBtn}>
                        {busy === "followup" ? <ClipLoader size={18} color="white" /> : "Add follow-up"}
                      </button>
                    </div>
                  </form>

                  {followups.length === 0 ? (
                    <p className="mt-5 text-sm text-slate-500">No follow-ups scheduled yet.</p>
                  ) : (
                    <ul className="mt-5 flex flex-col gap-3 border-t border-mist-line pt-5">
                      {followups.map((f) => {
                        const done = f.status === "Completed";
                        const overdue = !done && isPast(f.scheduledAt);
                        return (
                          <li
                            key={f.id}
                            className={`flex flex-wrap items-start justify-between gap-3 rounded-lg border px-4 py-3 ${
                              overdue ? "border-red-200 bg-red-50/50" : "border-mist-line"
                            }`}
                          >
                            <div className="min-w-0">
                              <p
                                className={`text-sm font-semibold ${
                                  done ? "text-slate-400 line-through" : overdue ? "text-red-600" : "text-ink"
                                }`}
                              >
                                {f.type} · {formatDateTime(f.scheduledAt, timeZone)}
                              </p>
                              {f.notes && (
                                <p className="mt-0.5 whitespace-pre-wrap break-words text-sm text-slate-600">{f.notes}</p>
                              )}
                              <p className="mt-0.5 text-xs text-slate-500">
                                {done ? `Completed ${formatDateTime(f.completedAt, timeZone)}` : overdue ? "Overdue" : "Pending"}
                              </p>
                            </div>
                            <div className="flex gap-1.5">
                              {!done && (
                                <button
                                  onClick={() => completeFollowup(f.id)}
                                  disabled={busy === `followup-${f.id}`}
                                  className={outlineBtn}
                                >
                                  Mark done
                                </button>
                              )}
                              <button
                                onClick={() => removeFollowup(f.id)}
                                disabled={busy === `followup-${f.id}`}
                                className={outlineBtn}
                              >
                                Delete
                              </button>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </>
              )}

              {tab === "notes" && (
                <>
                  <form onSubmit={addNote}>
                    <textarea
                      rows={3}
                      maxLength={2000}
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="e.g. Customer interested in bulk chicken supply for restaurant."
                      aria-label="New note"
                      className={inputClass}
                    />
                    <div className="mt-3 flex justify-end">
                      <button type="submit" disabled={!newNote.trim() || busy === "note"} className={primaryBtn}>
                        {busy === "note" ? <ClipLoader size={18} color="white" /> : "Add note"}
                      </button>
                    </div>
                  </form>

                  {notes.length === 0 ? (
                    <p className="mt-2 text-sm text-slate-500">No notes yet.</p>
                  ) : (
                    <ul className="mt-4 flex flex-col gap-3 border-t border-mist-line pt-4">
                      {notes.map((n) => (
                        <li key={n.id} className="rounded-lg bg-mist/70 px-4 py-3">
                          <p className="whitespace-pre-wrap break-words text-sm text-ink">{n.note}</p>
                          <div className="mt-2 flex items-center justify-between gap-3 text-xs text-slate-500">
                            <span>{n.adminName || "Admin"} · {formatDateTime(n.createdAt, timeZone)}</span>
                            <button
                              onClick={() => removeNote(n.id)}
                              disabled={busy === `note-${n.id}`}
                              className="font-semibold text-red-600 hover:underline"
                            >
                              Delete
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}

              {tab === "activity" && (
                <ol className="relative flex flex-col gap-5 border-l border-mist-line pl-5">
                  {activities.map((a) => (
                    <li key={a.id} className="relative">
                      <span className={`absolute -left-[25px] top-1.5 h-2.5 w-2.5 rounded-full ring-4 ring-white ${DOT[a.type] || "bg-slate-400"}`} />
                      {renderActivity(a)}
                      <p className="mt-1 text-xs text-slate-500">
                        {a.adminName || "Website"} · {formatDateTime(a.createdAt, timeZone)}
                      </p>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </section>
        </div>

        <aside className="flex flex-col gap-6">
          <Card title="Contact">
            <dl className="flex flex-col gap-4">
              <Field label="Mobile">
                <a href={`tel:${inquiry.mobile}`} className="text-brand hover:underline">{inquiry.mobile}</a>
              </Field>
              <Field label="Email">
                <a href={`mailto:${inquiry.email}`} className="text-brand hover:underline">{inquiry.email}</a>
              </Field>
              <Field label="Location">{inquiry.location || "—"}</Field>
            </dl>
          </Card>

          <Card title="Inquiry Details">
            <dl className="flex flex-col gap-4">
              <Field label="Type">{inquiry.inquiryType}</Field>
              <Field label="Received">{formatDateTime(inquiry.createdAt, timeZone)}</Field>
              <Field label="Last updated">{formatDateTime(inquiry.updatedAt, timeZone)}</Field>
            </dl>
          </Card>

          <Card title="Next Follow-up">
            {nextFollowup ? (
              <div>
                <p className={`text-sm font-semibold ${isPast(nextFollowup.scheduledAt) ? "text-red-600" : "text-ink"}`}>
                  {nextFollowup.type} · {formatDateTime(nextFollowup.scheduledAt, timeZone)}
                </p>
                {nextFollowup.notes && <p className="mt-1 text-sm text-slate-600">{nextFollowup.notes}</p>}
                {isPast(nextFollowup.scheduledAt) && <p className="mt-1 text-xs font-semibold text-red-600">Overdue</p>}
              </div>
            ) : (
              <p className="text-sm text-slate-500">Nothing scheduled.</p>
            )}
          </Card>
        </aside>
      </div>
    </>
  );
}

export default InquiryDetailPage;
