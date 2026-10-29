import React from "react";
import { ArrowRight } from "lucide-react";
import { heroStories } from "../../../../data/newsMagazine";
import { Eyebrow } from "./Ornaments";
import Reveal from "./Reveal";
import "./magazine.css";

/* One numbered story card. `featured` renders larger with a bigger headline. */
const StoryCard = ({ story, featured = false, delay = 0 }) => (
  <Reveal
    as="article"
    delay={delay}
    className={`group relative flex h-full flex-col overflow-hidden rounded-[20px] bg-mag-offwhite shadow-[0_8px_30px_-12px_rgba(17,17,17,0.15)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_-15px_rgba(227,27,35,0.3)] ${
      featured ? "" : ""
    }`}
  >
    <div className={`relative w-full shrink-0 overflow-hidden ${featured ? "aspect-[4/3]" : "aspect-[16/11]"}`}>
      <img
        src={story.image}
        alt=""
        loading={featured ? "eager" : "lazy"}
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <span
        aria-hidden="true"
        className={`absolute bottom-3 right-4 font-anton text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.45)] ${
          featured ? "text-[64px]" : "text-[40px]"
        }`}
      >
        {story.number}
      </span>
    </div>

    <div className="flex flex-1 flex-col p-5">
      <Eyebrow>{story.category}</Eyebrow>
      <h3
        className={`mt-3 font-syne font-bold leading-[1.15] text-mag-ink ${
          featured ? "text-[24px] sm:text-[28px]" : "text-[18px]"
        }`}
      >
        {story.title}
      </h3>
      {featured && (
        <p className="mt-3 max-w-[90%] font-sans text-[14px] leading-[1.7] text-mag-ink/70">
          {story.excerpt}
        </p>
      )}
      <a
        href={`#story-${story.id}`}
        className="mt-auto inline-flex items-center gap-2 pt-5 font-poppins text-[13px] font-semibold uppercase tracking-[0.08em] text-mag-crimson transition-colors hover:text-mag-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mag-accent"
      >
        Read more
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
      </a>
    </div>
  </Reveal>
);

export default function Hero() {
  const [featured, ...rest] = heroStories;

  return (
    <section
      aria-labelledby="news-hero-title"
      className="bg-mag-offwhite px-4 pb-14 pt-14 sm:px-6 sm:pt-20 lg:px-10 lg:pt-24"
    >
      <div className="mx-auto max-w-[1320px]">
        <div className="mx-auto max-w-[760px] text-center">
          <Reveal>
            <Eyebrow className="justify-center">News &amp; Media</Eyebrow>
          </Reveal>
          <Reveal delay={90}>
            <h1
              id="news-hero-title"
              className="mt-4 font-syne text-[32px] font-extrabold uppercase leading-[1.08] tracking-tight text-mag-ink sm:text-[44px] lg:text-[54px]"
            >
              Beyond the Bite: <span className="text-mag-accent">Stories</span> from Our Fresh Counter
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mx-auto mt-5 max-w-[520px] font-sans text-[15px] leading-7 text-mag-ink/70 lg:text-[17px]">
              Recipes, kitchen tips and fresh news from the Amir Freshcut family.
            </p>
          </Reveal>
        </div>

        {/* Desktop: one large featured card + 2x2 grid */}
        <div className="mt-12 hidden gap-6 lg:grid lg:grid-cols-2">
          <StoryCard story={featured} featured />
          <div className="grid grid-cols-2 gap-6">
            {rest.map((story, i) => (
              <StoryCard key={story.id} story={story} delay={(i + 1) * 90} />
            ))}
          </div>
        </div>

        {/* Tablet: 2-column grid, all five cards */}
        <div className="mt-10 hidden grid-cols-2 gap-6 sm:grid lg:hidden">
          {heroStories.map((story, i) => (
            <StoryCard key={story.id} story={story} featured={story.featured} delay={i * 90} />
          ))}
        </div>

        {/* Mobile: swipeable horizontal carousel, scroll-snap */}
        <div
          className="mag-hero-track -mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:hidden"
          role="list"
          aria-label="Top stories"
        >
          {heroStories.map((story, i) => (
            <div key={story.id} role="listitem" className="w-[82%] shrink-0 snap-center">
              <StoryCard story={story} delay={i * 90} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
