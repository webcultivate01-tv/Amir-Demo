import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import StoryArt from "./StoryArt";
import { Arrow, SectionLabel } from "./Ornaments";

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/* Mounted only while a story is open, so mount/unmount handles
   scroll-lock and focus return. */
export default function StoryModal({ story, onClose }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    const returnTo = document.activeElement;
    const prevOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = prevOverflow;
      if (returnTo && typeof returnTo.focus === "function") returnTo.focus();
    };
  }, []);

  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      onClose();
      return;
    }

    if (e.key !== "Tab") return;

    const nodes = dialogRef.current?.querySelectorAll(FOCUSABLE);
    if (!nodes || nodes.length === 0) return;

    const first = nodes[0];
    const last = nodes[nodes.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const titleId = `story-title-${story.id}`;

  return createPortal(
    <div
      className="news-backdrop-in fixed inset-0 z-[100] flex items-center justify-center bg-[#171719]/75 p-3 backdrop-blur-sm sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onKeyDown={onKeyDown}
        className="news-modal-in relative max-h-[92vh] w-full max-w-[980px] overflow-y-auto rounded-[24px] bg-white text-[#EC1F36] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.6)]"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close story"
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[#EC1F36]/30 bg-white text-[#EC1F36] transition-all duration-300 shadow-md hover:rotate-90 hover:bg-[#EC1F36] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EC1F36]"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <div className="grid md:grid-cols-[0.85fr_1.15fr]">
          <div className="group relative aspect-[4/3] md:aspect-auto md:min-h-[460px]">
            <StoryArt art={story.art} />
            <div className="pointer-events-none absolute inset-3 border border-white/30" />
          </div>

          <div className="px-6 pb-10 pt-8 sm:px-10 md:px-12 md:py-14">
            <SectionLabel>
              {story.category} &mdash; {story.place}
            </SectionLabel>

            <h2
              id={titleId}
              className="mt-5 pr-10 font-seasons text-[28px] leading-[1.1] tracking-[-0.01em] text-[#171719] sm:text-[34px]"
            >
              {story.title}
            </h2>

            <div className="mt-6 h-[3px] w-10 bg-[#EC1F36]" />

            <div className="mt-6 space-y-4">
              {story.body.map((para, i) => (
                <p
                  key={i}
                  className="font-poppins text-[15px] leading-[1.8] text-[#171719]/70"
                >
                  {para}
                </p>
              ))}
            </div>

            <p className="mt-6 font-poppins text-[10px] uppercase tracking-[0.14em] text-[#EC1F36]/55">
              {story.read}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              {story.cta && (
                <Link
                  to={story.cta.to}
                  onClick={onClose}
                  className="inline-flex h-14 items-center gap-3 rounded-lg bg-[#EC1F36] px-8 font-poppins text-[13px] font-bold uppercase tracking-[0.12em] text-white transition-colors duration-300 hover:bg-[#c8172d]"
                >
                  {story.cta.label}
                  <Arrow className="h-4 w-4" />
                </Link>
              )}

              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-14 items-center rounded-lg border border-[#EC1F36] px-8 font-poppins text-[13px] font-bold uppercase tracking-[0.12em] text-[#EC1F36] transition-colors duration-300 hover:bg-[#EC1F36] hover:text-white"
              >
                Back to news
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
