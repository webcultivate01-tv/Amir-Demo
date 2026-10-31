import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export default function StoryModal({ story, onClose, layout = "split" }) {
  const panelRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Lock background scroll while the modal is open, restore on close.
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  // Move focus into the modal on open, return it to the trigger on close.
  useEffect(() => {
    const previouslyFocused = document.activeElement;
    closeButtonRef.current?.focus();
    return () => {
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, []);

  // Escape to close, Tab to stay trapped inside the dialog.
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll(FOCUSABLE_SELECTOR)
      ).filter((el) => el.offsetParent !== null);
      if (focusable.length === 0) return;

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
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const onBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: EASE }}
      onClick={onBackdropClick}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#171719]/65 p-4 backdrop-blur-sm sm:p-6"
    >
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="story-modal-title"
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.32, ease: EASE }}
        className={
          layout === "stacked"
            ? "relative flex max-h-[88vh] w-full max-w-xl flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_40px_100px_-20px_rgba(23,23,25,0.45)] sm:rounded-[28px]"
            : layout === "story"
            ? "relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_40px_100px_-20px_rgba(23,23,25,0.45)] sm:rounded-[28px]"
            : "relative h-[85vh] max-h-[720px] w-full max-w-4xl overflow-hidden rounded-[24px] bg-white shadow-[0_40px_100px_-20px_rgba(23,23,25,0.45)] sm:rounded-[28px]"
        }
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close story"
          className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#171719] shadow-md backdrop-blur transition-colors hover:bg-white hover:text-[#EC1F36] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EC1F36]"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>

        {layout === "story" ? (
          <div className="flex h-full flex-col overflow-y-auto">
            <div className="flex w-full shrink-0 items-center justify-center bg-neutral-100">
              <img
                src={story.image}
                alt={story.title}
                className="max-h-[42vh] w-full object-contain sm:max-h-[48vh]"
              />
            </div>

            <div className="px-6 py-7 sm:px-9 sm:py-9">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="rounded-full bg-[#FBE8E9] px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-[#EC1F36]">
                  {story.category}
                </span>
                <span className="h-1 w-1 rounded-full bg-neutral-300" aria-hidden="true" />
                <time className="text-xs font-medium uppercase tracking-[0.12em] text-neutral-400">
                  {story.date}
                </time>
                {story.readingTime && (
                  <>
                    <span className="h-1 w-1 rounded-full bg-neutral-300" aria-hidden="true" />
                    <span className="text-xs font-medium uppercase tracking-[0.12em] text-neutral-400">
                      {story.readingTime}
                    </span>
                  </>
                )}
              </div>

              <h2
                id="story-modal-title"
                className="mt-4 font-seasons text-2xl font-medium leading-[1.15] tracking-[-0.02em] text-[#171719] sm:text-3xl"
              >
                {story.title}
              </h2>

              <p className="mt-4 text-[15px] font-medium leading-7 text-[#171719]/80">
                {story.summary}
              </p>

              <div className="mt-5 space-y-4 border-t border-neutral-100 pt-5">
                {story.content.map((paragraph, index) => (
                  <p key={index} className="text-[15px] leading-7 text-neutral-600">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ) : layout === "stacked" ? (
          <div className="flex h-full flex-col overflow-y-auto">
            <div className="relative h-56 w-full shrink-0 overflow-hidden sm:h-72">
              <img src={story.image} alt={story.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            </div>

            <div className="mx-auto w-full max-w-md px-6 py-7 sm:px-8 sm:py-9">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#801821]">
                  {story.category}
                </span>
                <span className="h-1 w-1 rounded-full bg-neutral-300" aria-hidden="true" />
                <time className="text-xs font-medium uppercase tracking-[0.12em] text-neutral-400">
                  {story.date}
                </time>
              </div>

              <h2
                id="story-modal-title"
                className="mt-4 font-seasons text-[26px] font-medium leading-[1.15] tracking-[-0.02em] text-[#171719] sm:text-[30px]"
              >
                {story.title}
              </h2>

              <p className="mt-3 text-[16px] font-medium leading-7 text-[#171719]/75">
                {story.summary}
              </p>

              <div className="mt-6 space-y-4 border-t border-neutral-100 pt-6">
                {story.content.map((paragraph, index) => (
                  <p key={index} className="text-[15px] leading-7 text-neutral-600">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex h-full flex-col overflow-y-auto md:flex-row md:overflow-hidden">
            <div className="relative h-64 w-full shrink-0 overflow-hidden sm:h-80 md:h-full md:w-[42%]">
              <img
                src={story.image}
                alt={story.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex-1 p-6 sm:p-8 md:h-full md:overflow-y-auto md:p-10">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#801821]">
                  {story.category}
                </span>
                <span className="h-1 w-1 rounded-full bg-neutral-300" aria-hidden="true" />
                <time className="text-xs font-medium uppercase tracking-[0.12em] text-neutral-400">
                  {story.date}
                </time>
              </div>

              <h2
                id="story-modal-title"
                className="mt-4 font-seasons text-2xl font-medium leading-[1.15] tracking-[-0.02em] text-[#171719] sm:text-3xl"
              >
                {story.title}
              </h2>

              <p className="mt-4 text-[15px] font-medium leading-7 text-[#171719]/80">
                {story.summary}
              </p>

              <div className="mt-5 space-y-4 border-t border-neutral-100 pt-5">
                {story.content.map((paragraph, index) => (
                  <p key={index} className="text-[15px] leading-7 text-neutral-600">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>,
    document.body
  );
}
