export const INQUIRY_TYPES = [
  "General Enquiry",
  "Product Enquiry",
  "Bulk / Wholesale Enquiry",
  "Franchise Enquiry",
  "Store Enquiry",
  "Business Enquiry",
  "Feedback",
  "Other",
];

export const INQUIRY_STATUSES = [
  "New",
  "Contacted",
  "In Progress",
  "Follow-up Required",
  "Converted",
  "Closed",
  "Not Interested",
  "Spam",
];

export const FOLLOWUP_TYPES = ["Call", "Email", "Meeting"];

export const STATUS_STYLES = {
  New: "bg-indigo-50 text-indigo-700 ring-indigo-600/20",
  Contacted: "bg-sky-50 text-sky-700 ring-sky-600/20",
  "In Progress": "bg-amber-50 text-amber-700 ring-amber-600/20",
  "Follow-up Required": "bg-orange-50 text-orange-700 ring-orange-600/20",
  Converted: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  Closed: "bg-slate-100 text-slate-600 ring-slate-500/20",
  "Not Interested": "bg-rose-50 text-rose-700 ring-rose-600/20",
  Spam: "bg-fuchsia-50 text-fuchsia-700 ring-fuchsia-600/20",
};

export const inputClass =
  "w-full rounded-lg border border-mist-line bg-white px-3 py-2 text-sm text-ink outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-brand/60 focus:ring-4 focus:ring-brand/10";
