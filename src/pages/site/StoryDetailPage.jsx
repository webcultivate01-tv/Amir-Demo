import React, { useEffect, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Calendar, ChevronLeft, ChevronRight, Clock, ShieldCheck } from "lucide-react";
import { newsStories } from "../../data/newsStories.js";


const RelatedStories = ({ stories }) => {
  const trackRef = useRef(null);
  const [paused, setPaused] = useState(false);

  const slide = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild;
    const step = card ? card.offsetWidth + 20 : el.clientWidth;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    if (dir > 0 && atEnd) el.scrollTo({ left: 0, behavior: "smooth" });
    else if (dir < 0 && el.scrollLeft <= 4) el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
    else el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  useEffect(() => {
    if (paused || stories.length <= 3) return undefined;
    const t = setInterval(() => slide(1), 4000);
    return () => clearInterval(t);
  }, [paused, stories.length]);

  if (stories.length === 0) return null;

  return (
    <section
      className="border-t border-neutral-100 bg-[#FBF8F7] px-6 py-14 sm:px-10 lg:px-16"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-[1480px]">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-seasons text-2xl font-medium tracking-tight sm:text-3xl">
            Related News
          </h2>
          <div className="flex gap-2">
            {[-1, 1].map((dir) => (
              <button
                key={dir}
                type="button"
                onClick={() => slide(dir)}
                aria-label={dir < 0 ? "Previous stories" : "Next stories"}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 bg-white text-[#171719] transition-colors hover:border-[#EC1F36] hover:bg-[#EC1F36] hover:text-white"
              >
                {dir < 0 ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </button>
            ))}
          </div>
        </div>

        <div
          ref={trackRef}
          className="mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {stories.map((s) => (
            <Link
              key={s.id}
              to={`/news/${s.id}`}
              className="group flex w-full shrink-0 snap-start flex-col overflow-hidden rounded-[22px] border border-neutral-200 bg-white shadow-[0_18px_45px_-18px_rgba(23,23,25,0.35)] transition-all duration-500 hover:-translate-y-1 hover:border-[#EC1F36]/40 sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]"
            >
              <div className="aspect-[16/10] w-full overflow-hidden bg-white p-4">
                <img
                  src={s.image}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <span className="inline-flex w-fit rounded-full bg-[#FBE8E9] px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-[#EC1F36]">
                  {s.category}
                </span>
                <h3 className="mt-3 line-clamp-2 font-seasons text-xl font-medium leading-snug tracking-tight">
                  {s.title}
                </h3>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-semibold text-[#EC1F36] group-hover:text-[#171719]">
                  Read More <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

const StoryDetailPage = () => {
  const { id } = useParams();
  const story = newsStories.find((s) => s.id === id);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [id]);

  if (!story) return <Navigate to="/news" replace />;

  const related = newsStories.filter((s) => s.id !== story.id);
  const [lead, ...rest] = story.content;
  const beforeImage = rest.slice(0, 1);
  const afterImage = rest.slice(1);

  return (
    <main className="bg-white text-[#171719]">
      {/* ── Hero ── */}
      <section className="bg-[#FBF8F7] px-6 pb-12 pt-8 sm:px-10 sm:pt-10 lg:px-16 lg:pb-16 lg:pt-10">
        <div className="mx-auto grid max-w-[1280px] items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <Link
              to="/news"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-neutral-500 transition-colors hover:text-[#EC1F36]"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to News & Media
            </Link>

            <span className="mt-6 inline-flex rounded-full bg-[#FBE8E9] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#EC1F36]">
              {story.category}
            </span>

            <h1 className="mt-5 font-seasons text-4xl font-medium leading-[1.08] tracking-[-0.025em] sm:text-5xl xl:text-[3.5rem]">
              {story.title}
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-600">
              {story.summary}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-neutral-200 pt-6 text-sm text-neutral-500">
              <span className="inline-flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#EC1F36]" aria-hidden="true" />
                <time>{story.date}</time>
              </span>
              {story.readingTime && (
                <span className="inline-flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#EC1F36]" aria-hidden="true" />
                  {story.readingTime}
                </span>
              )}
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#EC1F36]" aria-hidden="true" />
                Amir Editorial Team
              </span>
            </div>
          </div>

          {/* Single image, sits directly on the section — no nested frames */}
          <div className="relative mx-auto flex w-full max-w-[520px] items-center justify-center">
            <div
              className="absolute inset-[6%] rounded-full bg-gradient-to-br from-[#FBE8E9] to-white"
              aria-hidden="true"
            />
            <img
              src={story.image}
              alt={story.title}
              className="relative aspect-square w-full object-contain drop-shadow-[0_28px_40px_rgba(23,23,25,0.18)]"
            />
          </div>
        </div>
      </section>

      {/* ── Article + sidebar ── */}
      <section className="px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
        <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16">
          <article className="min-w-0">
            <p className="font-seasons text-2xl font-medium leading-[1.45] text-[#171719] sm:text-[1.7rem]">
              {lead}
            </p>

            <div className="mt-8 space-y-6">
              {beforeImage.map((p, i) => (
                <p key={i} className="text-[17px] leading-8 text-neutral-600">
                  {p}
                </p>
              ))}
            </div>

            {story.inlineImage && (
              <figure className="my-10 overflow-hidden rounded-[22px]">
                <img
                  src={story.inlineImage}
                  alt=""
                  loading="lazy"
                  className="aspect-[16/9] w-full object-cover"
                />
              </figure>
            )}

            <div className="space-y-6">
              {afterImage.map((p, i) => (
                <p key={i} className="text-[17px] leading-8 text-neutral-600">
                  {p}
                </p>
              ))}
            </div>
          </article>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[22px] border border-neutral-200 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#EC1F36]">
                About Amir
              </p>
              <p className="mt-3 text-[15px] leading-7 text-neutral-600">
                Fresh chicken, mutton, fish and eggs since 1991 — now across 580+ stores in Maharashtra.
              </p>
              <Link
                to="/contact"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#EC1F36] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#171719]"
              >
                Contact Us <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <RelatedStories stories={related} />
    </main>
  );
};

export default StoryDetailPage;
