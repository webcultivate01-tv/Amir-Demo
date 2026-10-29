import React from "react";

/* Small uppercase red eyebrow label, shared across every magazine section */
export const Eyebrow = ({ children, className = "" }) => (
  <p
    className={`font-poppins text-[11px] font-bold uppercase tracking-[0.22em] text-mag-accent ${className}`}
  >
    {children}
  </p>
);

/* Heavy uppercase section heading. `light` swaps to off-white text for
   headings sitting directly on a charcoal contrast block. */
export const SectionHeading = ({ as = "h2", id, children, className = "", light = false }) => {
  const Tag = as;
  return (
    <Tag
      id={id}
      className={`font-syne text-[28px] font-bold uppercase leading-[1.05] tracking-tight sm:text-[36px] lg:text-[44px] ${
        light ? "text-mag-offwhite" : "text-mag-ink"
      } ${className}`}
    >
      {children}
    </Tag>
  );
};
