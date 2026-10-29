// Timestamps are stored in UTC; everything shown or entered in the admin UI goes through the admin's timezone.
export const DEFAULT_TIMEZONE = "Asia/Kolkata";


const partsIn = (date, timeZone) => {
  const parts = {};
  new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })
    .formatToParts(date)
    .forEach((p) => (parts[p.type] = p.value));
  return parts;
};

// "02 Oct 2026, 09:45 AM"
export const formatDateTime = (value, timeZone = DEFAULT_TIMEZONE) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  const p = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })
    .formatToParts(date)
    .reduce((acc, part) => ({ ...acc, [part.type]: part.value }), {});
  return `${p.day} ${p.month} ${p.year}, ${p.hour}:${p.minute} ${String(p.dayPeriod).toUpperCase()}`;
};

// UTC ISO -> "YYYY-MM-DDTHH:mm" for <input type="datetime-local">, in the admin's timezone
export const toLocalInput = (value, timeZone = DEFAULT_TIMEZONE) => {
  if (!value) return "";
  const p = partsIn(new Date(value), timeZone);
  return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}`;
};

// "YYYY-MM-DDTHH:mm" typed in the admin's timezone -> UTC ISO string
export const fromLocalInput = (value, timeZone = DEFAULT_TIMEZONE) => {
  if (!value) return null;
  const [datePart, timePart] = value.split("T");
  const [y, mo, d] = datePart.split("-").map(Number);
  const [h, mi] = timePart.split(":").map(Number);
  const wallAsUtc = Date.UTC(y, mo - 1, d, h, mi);

  // find the offset in effect at that wall-clock time (re-checked once to survive DST edges)
  const offsetAt = (instant) => {
    const p = partsIn(new Date(instant), timeZone);
    return Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second) - instant;
  };
  let instant = wallAsUtc - offsetAt(wallAsUtc);
  instant = wallAsUtc - offsetAt(instant);
  return new Date(instant).toISOString();
};

export const getTimezones = () => {
  try {
    return Intl.supportedValuesOf("timeZone");
  } catch {
    return [DEFAULT_TIMEZONE, "UTC", "Asia/Dubai", "Europe/London", "America/New_York"];
  }
};

export const isPast = (value) => !!value && new Date(value).getTime() < Date.now();

