import React from "react";
import { STATUS_STYLES } from "../utils/inquiry";

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${
        STATUS_STYLES[status] || STATUS_STYLES.Closed
      }`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;
