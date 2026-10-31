import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { newsStories } from "../../../data/newsStories.js";

const EASE = [0.22, 1, 0.36, 1];
const PAGE_SIZE = 3;
const MOBILE_QUERY = "(max-width: 639px)";

const NAV_BTN =
  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EC1F36] border-neutral-300 text-neutral-600 hover:border-[#EC1F36] hover:text-[#EC1F36] disabled:cursor-default disabled:bg-neutral-100 disabled:text-neutral-400 disabled:hover:border-neutral-300 disabled:hover:text-neutral-400";

function ChevronIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="size-3 overflow-visible" fill="currentColor" viewBox="0 0 451.846 451.847" aria-hidden="true"><path d="M345.441 248.292 151.154 442.573c-12.359 12.365-32.397 12.365-44.75 0-12.354-12.354-12.354-32.391 0-44.744L278.318 225.92 106.409 54.017c-12.354-12.359-12.354-32.394 0-44.748 12.354-12.359 32.391-12.359 44.75 0l194.287 194.284c6.177 6.18 9.262 14.271 9.262 22.366 0 8.099-3.091 16.196-9.267 22.373" /></svg>
  );
}

function StoryCard({ story, index, reduce }) {
  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: EASE }}
      className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-neutral-200 bg-white shadow-[0_18px_45px_-18px_rgba(23,23,25,0.35)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#EC1F36]/30 hover:shadow-[0_32px_65px_-20px_rgba(236,31,54,0.35)]"
    >
      <div className="aspect-[16/10] w-full overflow-hidden bg-[#FBF8F7] p-4">
        <img
          src={story.image}
          alt={story.title}
          loading="lazy"
          className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <span className="inline-flex w-fit items-center rounded-full bg-[#FBE8E9] px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-[#EC1F36]">
          {story.category}
        </span>

        <div className="mt-4 flex items-center gap-2 text-sm text-neutral-500">
          <Calendar className="h-4 w-4" aria-hidden="true" />
          <time>{story.date}</time>
        </div>

        <h3 className="mt-3 font-seasons text-xl font-medium leading-snug tracking-tight text-[#171719]">
          {story.title}
        </h3>

        <p className="mt-3 text-[15px] leading-6 text-neutral-500">
          {story.description}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-neutral-100 pt-4">
          <span className="text-sm text-neutral-500">{story.readingTime}</span>

          <Link
            to={`/news/${story.id}`}
            className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-[#EC1F36] transition-colors hover:text-[#171719] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EC1F36]"
          >
            Read More
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default function LatestStories() {
  const reduce = useReducedMotion();
  const [page, setPage] = useState(1);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia(MOBILE_QUERY).matches
  );
  const gridRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const onChange = (e) => {
      setIsMobile(e.matches);
      setPage(1);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Mobile shows 3 stories per page; larger screens show them all.
  const totalPages = isMobile ? Math.ceil(newsStories.length / PAGE_SIZE) : 1;
  const pagedStories = isMobile
    ? newsStories.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
    : newsStories;

  const goToPage = (p) => {
    setPage(p);
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="latest-stories" className="scroll-mt-24 bg-white px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1480px]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#EC1F36]">
              Latest Stories
            </p>
            <h2 className="mt-3 font-seasons text-4xl font-medium leading-[1.05] tracking-[-0.03em] text-[#171719] sm:text-5xl">
              In the News
            </h2>
          </motion.div>

          <Link
            to="/about"
            className="group inline-flex w-fit items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-[#171719] transition-colors hover:text-[#EC1F36]"
          >
            View All Stories
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1">
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>
          </Link>
        </div>

        <div ref={gridRef} className="mt-10 scroll-mt-24 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {pagedStories.map((story, index) => (
            <StoryCard key={story.id} story={story} index={index} reduce={reduce} />
          ))}
        </div>

        {/* PAGINATION (mobile only) */}
        {isMobile && totalPages > 1 && (
          <nav aria-label="Pagination" className="mt-10 flex justify-center space-x-4">
            <button
              type="button"
              aria-label="Previous page"
              disabled={page === 1}
              onClick={() => goToPage(page - 1)}
              className={`${NAV_BTN} rotate-180`}
            >
              <ChevronIcon />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                aria-current={n === page ? "page" : undefined}
                onClick={() => goToPage(n)}
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EC1F36] ${
                  n === page
                    ? "border-[#EC1F36] bg-[#EC1F36] text-white"
                    : "border-neutral-300 text-[#171719] hover:border-[#EC1F36] hover:bg-[#FFF4F5] hover:text-[#EC1F36]"
                }`}
              >
                {n}
              </button>
            ))}

            <button
              type="button"
              aria-label="Next page"
              disabled={page === totalPages}
              onClick={() => goToPage(page + 1)}
              className={NAV_BTN}
            >
              <ChevronIcon />
            </button>
          </nav>
        )}
      </div>

    </section>
  );
}
