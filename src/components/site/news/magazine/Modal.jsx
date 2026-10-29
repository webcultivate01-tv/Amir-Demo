import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";

/* Accessible modal: traps focus, closes on Escape or backdrop click,
   restores focus to the trigger element on close. */
export default function Modal({ titleId, title, onClose, children }) {
  const dialogRef = useRef(null);
  const triggerRef = useRef(document.activeElement);

  useEffect(() => {
    const dialog = dialogRef.current;
    const focusable = dialog?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstField = dialog?.querySelector("input, textarea, select");
    (firstField || focusable?.[0])?.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      triggerRef.current?.focus?.();
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-mag-ink/60 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative max-h-[90vh] w-full max-w-[540px] overflow-y-auto rounded-[20px] bg-white p-6 shadow-[0_40px_80px_-30px_rgba(28,28,28,0.5)] sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <h3 id={titleId} className="font-syne text-[22px] font-bold uppercase text-mag-ink">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="-m-2 rounded-full p-2 text-mag-ink/60 transition-colors hover:bg-mag-cream hover:text-mag-crimson focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mag-accent"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
}
