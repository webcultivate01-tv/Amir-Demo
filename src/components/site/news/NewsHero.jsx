import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { slides } from "./newsData";
import { Arrow } from "./Ornaments";

/* Each slide enters with its own motion (see news.css) */
const slideAnims = ["fade", "right", "left", "zoom", "up"];

const Chevron =({ d }) => (
  <svg
    viewBox="0 0 24 24"
    className="h-8 w-8"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path d={d} />
  </svg>
);

const arrowBtn =
  "absolute top-1/2 z-20 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EC1F36] sm:flex";

export default function NewsHero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef(null);
  const count = slides.length;

  /* As the next section slides over the pinned hero, it eases back and dims */
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 700], [1, 0.94], { clamp: true });
  const shade = useTransform(scrollY, [0, 700], [0, 0.45], { clamp: true });
  const onLight = Boolean(slides[index].light);
  const arrowTone = onLight
    ? "text-[#EC1F36]/60 hover:text-[#EC1F36]"
    : "text-white/60 hover:text-white";

  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + count) % count),
    [count]
  );

  /* Autoplay: restarts on every slide change, stops while hovered/focused */
  useEffect(() => {
    if (paused) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }
    const timer = setTimeout(next, 6000);
    return () => clearTimeout(timer);
  }, [index, paused, next]);

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") next();
    else if (e.key === "ArrowLeft") prev();
  };

  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
  };

  return (
    <motion.section
      style={{ scale, transformOrigin: "50% 100%" }}
      aria-roledescription="carousel"
      aria-label="Featured AMIR stories"
      className="news-hero sticky top-0 z-0 isolate h-[80svh] min-h-[520px] overflow-hidden bg-[#271719] text-white"
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <h1 className="sr-only">AMIR News &amp; Media</h1>

      {slides.map((slide, i) => {
        const active = i === index;

        return (
          <div
            key={slide.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            aria-hidden={!active}
            {...(active ? {} : { inert: "" })}
            data-anim={slide.light ? "fade" : slideAnims[i % slideAnims.length]}
            className={`news-slide absolute inset-0 ${active ? "is-active" : ""}`}
          >
            {/* Background */}
            {slide.mascot ? (
              <>
                <div className="absolute inset-0 bg-[#14090b]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,rgba(236,31,54,0.8),rgba(127,23,34,0.45)_50%,transparent_82%)]" />
                <img
                  src={slide.image}
                  alt=""
                  aria-hidden="true"
                  draggable="false"
                  className="news-float absolute bottom-[8%] left-1/2 h-[60%] w-auto -translate-x-1/2 object-contain opacity-30"
                />
              </>
            ) : (
              <div className={`absolute inset-0 ${slide.light ? "" : "news-ken"}`}>
                <img
                  src={slide.image}
                  alt=""
                  aria-hidden="true"
                  draggable="false"
                  fetchPriority={i === 0 ? "high" : "auto"}
                  loading={i === 0 ? "eager" : "lazy"}
                  className="absolute inset-0 h-full w-full min-h-full min-w-full object-cover"
                  style={{ objectPosition: slide.position }}
                />
              </div>
            )}

            {/* Image contrast overlays */}
            {slide.fade && (
              <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/20 to-transparent" />
            )}
            {slide.dim && <div className="absolute inset-0 bg-[#271719]/55" />}
            {!slide.light && (
              <>
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/55" />
              </>
            )}

            {slide.light ? (
              <div className={`relative flex h-full items-center justify-center px-6 pb-16 sm:px-10 ${slide.pad}`}>
                <div className="w-full max-w-[560px] text-center">
                  <p
                    className="news-rise font-poppins text-[11px] font-semibold uppercase tracking-[0.2em] text-[#EC1F36]"
                    style={{ animationDelay: "0.1s" }}
                  >
                    {slide.label}
                  </p>
                  <h2
                    className="news-rise mt-5 font-seasons text-[30px] font-medium leading-[1.1] tracking-[-0.02em] text-[#171719] sm:text-[42px] lg:text-[52px]"
                    style={{ animationDelay: "0.2s" }}
                  >
                    {slide.heading}{" "}
                    <span className="italic text-[#EC1F36]">{slide.headingAccent}</span>
                  </h2>
                  <p
                    className="news-rise mx-auto mt-6 max-w-[460px] font-poppins text-[15px] leading-[1.75] text-[#171719]/70 lg:text-[17px]"
                    style={{ animationDelay: "0.3s" }}
                  >
                    {slide.blurb}
                  </p>
                  <div
                    className="news-rise mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
                    style={{ animationDelay: "0.4s" }}
                  >
                    <Link
                      to="/catalog"
                      className="group inline-flex h-9 min-w-[140px] items-center justify-center gap-2 rounded-lg bg-[#EC1F36] px-4 font-poppins text-[11px] font-bold uppercase tracking-[0.12em] text-white transition-colors duration-300 hover:bg-[#c8172d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#EC1F36]"
                    >
                      Explore the products
                      <Arrow className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                    <Link
                      to="/contact"
                      className="inline-flex h-9 min-w-[140px] items-center justify-center rounded-lg border border-[#EC1F36] px-4 font-poppins text-[11px] font-bold uppercase tracking-[0.12em] text-[#EC1F36] transition-colors duration-300 hover:bg-[#EC1F36] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#EC1F36]"
                    >
                      Contact now
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
            <div className="relative flex h-full items-center justify-center px-5 text-center sm:px-10 lg:px-16">
              <h2
                className="news-rise mx-auto max-w-5xl font-seasons text-4xl font-medium leading-[1.08] tracking-tight sm:text-6xl md:text-7xl lg:text-[88px]"
                style={{ animationDelay: "0.15s" }}
              >
                {slide.title}
                <br />
                <span className="italic text-[#EC1F36]">{slide.accent}</span>
              </h2>
            </div>
            )}
          </div>
        );
      })}

      {/* Faint prev / next */}
      <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        className={`${arrowBtn} ${arrowTone} left-6 lg:left-10`}
      >
        <Chevron d="m15 5-7 7 7 7" />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className={`${arrowBtn} ${arrowTone} right-6 lg:right-10`}
      >
        <Chevron d="m9 5 7 7-7 7" />
      </button>

      {/* Pagination */}
      <div className="absolute inset-x-0 bottom-8 z-20 flex items-center justify-center gap-2.5">
        {slides.map((slide, i) => {
          const active = i === index;

          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show slide ${i + 1}`}
              aria-current={active ? "true" : undefined}
              className="flex h-6 w-6 items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span
                className={`block h-2 rounded-full transition-all duration-500 ${
                  active
                    ? `w-7 ${onLight ? "bg-[#EC1F36]" : "bg-white"}`
                    : onLight
                    ? "w-2 bg-[#EC1F36]/30 hover:bg-[#EC1F36]/60"
                    : "w-2 bg-white/40 hover:bg-white/70"
                }`}
              />
            </button>
          );
        })}
      </div>

      <motion.div
        aria-hidden="true"
        style={{ opacity: shade }}
        className="pointer-events-none absolute inset-0 z-30 bg-black"
      />
    </motion.section>
  );
}
