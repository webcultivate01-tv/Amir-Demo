import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import storyPhoto from "../../../images/aboutShop.png";
import founderPhoto from "../../../images/vijayMore.png";
import TransformationSection from "../../components/site/home/TransformationSection";

/* =========================================================
   SECTION LABEL
========================================================= */

const SectionLabel = ({ children, centered = false }) => (
  <div className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}>
    <span className="block w-7 h-px bg-[#EC1F36]" />

    <p className="font-poppins text-[11px] font-medium tracking-[0.18em] uppercase text-[#EC1F36]">
      {children}
    </p>

    {centered && <span className="block w-7 h-px bg-[#EC1F36]" />}
  </div>
);


/* =========================================================
   ABOUT PAGE
========================================================= */

/* Grey -> solid word-by-word highlight on load (same as the Contact hero title) */
const HighlightWords = ({ text, activeColor, startIndex = 0 }) => {
  const words = text.split(/\s+/);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timers = words.map((_, i) =>
      setTimeout(() => setActive(i + 1), 400 + (startIndex + i) * 260)
    );
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return words.map((word, i) => (
    <span
      key={i}
      style={{
        color: i < active ? activeColor : "#C7C7C7",
        transition: "color 1.4s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {word}
      {i < words.length - 1 ? " " : ""}
    </span>
  ));
};

/* Counts from 0 to `to` once the element scrolls into view */
const CountUp = ({ to, prefix = "", suffix = "", duration = 1800, indian = false }) => {
  const ref = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(Math.round(eased * to));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [to, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {indian ? value.toLocaleString("en-IN") : value}
      {suffix}
    </span>
  );
};

/* Adds `shown` once the element scrolls into view (drives the promise reveal) */
const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, shown];
};


/* Horizontal scroll reveal: "left" content glides in from the left edge,
   "right" content from the right. Shorter travel on small screens. */
const slideIn = (shown, side, delay = 0) => ({
  className: `will-change-[transform,opacity] transition-[opacity,transform] duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:!transition-none motion-reduce:!opacity-100 motion-reduce:!translate-x-0 ${
    shown
      ? "opacity-100 translate-x-0"
      : side === "left"
      ? "opacity-0 -translate-x-12 sm:-translate-x-20 lg:-translate-x-32"
      : "opacity-0 translate-x-12 sm:translate-x-20 lg:translate-x-32"
  }`,
  style: { transitionDelay: `${delay}s` },
});


/* =========================================================
   THE AMIR PROMISE
========================================================= */

const iconProps = {
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "promise-icon h-6 w-6",
};

const promiseCards = [
  {
    title: "Fresh Cuts on Order",
    text: "Your chicken is cut only when you order it, never pre-packed or kept waiting.",
    icon: (
      <svg {...iconProps}>
        <path d="M6 36 L34 8 L40 14 L16 40 Z" pathLength="1" />
        <path d="M16 40 L10 42 L6 36" pathLength="1" />
        <path d="M30 18 L36 24" pathLength="1" />
      </svg>
    ),
  },
  {
    title: "100% Halal",
    text: "Every product follows 100% Halal practices, backed by Halal registration since 2015.",
    icon: (
      <svg {...iconProps}>
        <path d="M24 5 L40 11 V24 C40 33 33 40 24 43 C15 40 8 33 8 24 V11 Z" pathLength="1" />
        <path d="M16 24 L22 30 L32 18" pathLength="1" />
      </svg>
    ),
  },
  {
    title: "Accurate Weight",
    text: "You get exactly what you pay for, weighed accurately in front of you.",
    icon: (
      <svg {...iconProps}>
        <path d="M24 8 V40" pathLength="1" />
        <path d="M14 40 H34" pathLength="1" />
        <path d="M8 14 H40" pathLength="1" />
        <path d="M8 14 L3 26 H13 Z" pathLength="1" />
        <path d="M40 14 L35 26 H45 Z" pathLength="1" />
      </svg>
    ),
  },
  {
    title: "Fair Pricing",
    text: "Honest, fair prices every day, because trust is built one purchase at a time.",
    icon: (
      <svg {...iconProps}>
        <path d="M6 24 L24 6 H40 V22 L22 40 Z" pathLength="1" />
        <circle cx="32" cy="14" r="2" pathLength="1" />
        <path d="M18 20 H28 M18 25 H28 M18 20 C26 20 26 28 18 28 L26 34" pathLength="1" />
      </svg>
    ),
  },
  {
    title: "Quick Service",
    text: "Fresh cuts without the long wait, so you’re in and out in minutes.",
    icon: (
      <svg {...iconProps}>
        <circle cx="24" cy="26" r="15" pathLength="1" />
        <path d="M24 26 V17" pathLength="1" />
        <path d="M24 26 L30 30" pathLength="1" />
        <path d="M20 6 H28" pathLength="1" />
        <path d="M24 6 V11" pathLength="1" />
      </svg>
    ),
  },
  {
    title: "Standardised Hygiene",
    text: "The same hygiene standards and operating practices in every store, every day.",
    icon: (
      <svg {...iconProps}>
        <path d="M20 8 C21 18 24 21 34 22 C24 23 21 26 20 36 C19 26 16 23 6 22 C16 21 19 18 20 8 Z" pathLength="1" />
        <path d="M37 28 C37.6 33 39 34.4 44 35 C39 35.6 37.6 37 37 42 C36.4 37 35 35.6 30 35 C35 34.4 36.4 33 37 28 Z" pathLength="1" />
      </svg>
    ),
  },
];

const PromiseSection = () => {
  const [ref, shown] = useInView(0.12);
  const innerRef = useRef(null);

  /* Scroll-out: as the section leaves the top of the screen, its content
     recedes (tilts back, scales down, fades) instead of just scrolling away */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;

    const update = () => {
      raf = 0;
      const section = ref.current;
      const inner = innerRef.current;
      if (!section || !inner) return;
      const rect = section.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -rect.top / (rect.height * 0.75)));
      if (p === 0) {
        inner.style.transform = "";
        inner.style.opacity = "";
        inner.style.filter = "";
        return;
      }
      inner.style.transform = `perspective(1200px) translate3d(0, ${p * 30}px, ${-p * 160}px) rotateX(${p * 14}deg) scale(${1 - p * 0.06})`;
      inner.style.opacity = String(1 - p);
      inner.style.filter = `blur(${p * 6}px)`;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref]);

  return (
    <section
      ref={ref}
      className={`promise ${shown ? "is-shown" : ""} bg-white border-t border-[#EC1F36]/15 text-[#171719] lg:min-h-[100svh] flex items-center py-14 lg:py-10 px-6 sm:px-10 lg:px-16`}
    >
      <div ref={innerRef} className="w-full max-w-[1200px] mx-auto" style={{ transformOrigin: "50% 0%" }}>
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-10 mb-10 lg:mb-12">
          <div className="promise-rise" style={{ "--d": "0s" }}>
            <div className="flex items-center gap-3">
              <span className="promise-line block w-7 h-px bg-[#EC1F36]" />
              <p className="font-poppins text-[11px] font-medium tracking-[0.18em] uppercase text-[#EC1F36]">
                The Amir Promise
              </p>
            </div>

            <h2 className="mt-4 whitespace-nowrap font-seasons text-[28px] min-[420px]:text-[34px] sm:text-[44px] md:text-[52px] lg:text-[60px] leading-[0.98] tracking-[-0.02em] text-[#171719]">
              Freshness. Fairness.{" "}
              <span className="italic text-[#EC1F36]">Trust.</span>
            </h2>
          </div>

          <p
            className="promise-rise max-w-[340px] font-poppins text-[14px] leading-[1.65] text-[#171719]/70"
            style={{ "--d": "0.15s" }}
          >
            Since 1991, every Amir store has followed the same six standards,
            the practices that made us pioneers of organised, hygienic meat
            retail.
          </p>
        </div>

        {/* CARDS */}
        <div className="promise-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {promiseCards.map((card, i) => (
            <article
              key={card.title}
              className="promise-card promise-card-3d group relative bg-white border border-[#EC1F36]/15 rounded-xl p-5 lg:p-6 flex flex-col overflow-hidden"
              style={{
                "--d": `${0.25 + i * 0.12}s`,
                "--ry": `${[-22, 0, 22][i % 3]}deg`,
              }}
            >
              {/* very light tint on hover */}
              <span className="promise-fill pointer-events-none absolute inset-0" />

              {/* small number, top right */}
              <span className="absolute top-4 right-4 font-poppins text-[12px] font-medium tracking-[0.12em] leading-none text-[#EC1F36]/60 transition-colors duration-500 group-hover:text-[#EC1F36] select-none">
                0{i + 1}
              </span>

              <div className="relative flex items-center justify-center h-11 w-11 rounded-full bg-[#EC1F36]/[0.08] text-[#EC1F36]">
                {card.icon}
              </div>

              <h3 className="relative mt-4 font-seasons text-[20px] lg:text-[22px] leading-[1.1] text-[#171719] transition-colors duration-500 group-hover:text-[#EC1F36]">
                {card.title}
              </h3>

              <p className="relative mt-2 font-poppins text-[15px] leading-[1.6] text-[#171719]/75 max-w-[340px]">
                {card.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};


/* =========================================================
   OUR STORY
========================================================= */

const STORY_PHOTO = storyPhoto;

const StorySection = () => {
  const [ref, shown] = useInView(0.15);
  const fromLeft = slideIn(shown, "left");
  const fromRight = slideIn(shown, "right", 0.1);

  return (
    <section
      ref={ref}
      className="bg-white border-t border-[#EC1F36]/15 py-14 sm:py-20 lg:py-24 px-6 sm:px-12 lg:px-24 xl:px-32"
    >
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-10 items-center">
        {/* TEXT — left */}
        <div {...fromLeft}>
          <div>
            <SectionLabel>Our Story · Since 1991</SectionLabel>

            <h2 className="mt-4 font-seasons text-[32px] sm:text-[44px] lg:text-[52px] leading-[1.02] tracking-[-0.02em] text-[#171719]">
              From One Counter to a{" "}
              <span className="italic text-[#EC1F36]">Trusted Network</span>
            </h2>
          </div>

          <div>
            <p className="mt-6 font-poppins text-[15px] sm:text-[16px] leading-[1.75] text-[#171719]/75">
              In 1991, Amir began as a single chicken and eggs store in Gadital,
              Hadapsar. The idea was simple: meat retail could be fresh, fair
              and organised, and it could create steady livelihoods along the
              way.
            </p>

            <p className="mt-4 font-poppins text-[15px] sm:text-[16px] leading-[1.75] text-[#171719]/75">
              That one counter became a private limited company in 2005 and
              opened to franchise partners in 2016. Today, 580+ Amir stores
              across Pune, Nashik and Ahilyanagar support over 2,500
              livelihoods, and every one still follows the promise we started
              with.
            </p>

            <p className="mt-6 pt-5 border-t border-[#EC1F36]/15 font-poppins text-[12px] font-medium tracking-[0.16em] uppercase text-[#EC1F36]">
              1991 Founded · 580+ Stores
            </p>
          </div>
        </div>

        {/* PHOTO — right */}
        <figure {...fromRight}>
          <img
            src={STORY_PHOTO}
            alt="An early Amir store counter"
            loading="lazy"
            className="block w-full max-w-[420px] h-auto mx-auto lg:mr-0 lg:ml-auto"
          />
        </figure>
      </div>
    </section>
  );
};


/* =========================================================
   FOUNDER
========================================================= */

const FounderSection = () => {
  const [ref, shown] = useInView(0.15);
  const fromLeft = slideIn(shown, "left");
  const fromRight = slideIn(shown, "right", 0.1);

  return (
    <section
      ref={ref}
      className="bg-white border-t border-[#EC1F36]/15 py-14 sm:py-20 lg:py-24 px-6 sm:px-12 lg:px-24 xl:px-32"
    >
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 xl:gap-32 items-center">
        {/* PHOTO — left, in a circle on the brand red */}
        <figure
          className={`flex flex-col items-center ${fromLeft.className}`}
          style={fromLeft.style}
        >
          <div className="w-full max-w-[380px] sm:max-w-[420px] aspect-square rounded-full bg-[#EC1F36] overflow-hidden pt-[4%]">
            <img
              src={founderPhoto}
              alt="Mr. Vijay More, Founder of Amir"
              loading="lazy"
              className="block w-[96%] h-auto mx-auto"
            />
          </div>

          <figcaption className="mt-5 text-center font-poppins text-[12px] font-medium tracking-[0.16em] uppercase text-[#171719]/60">
            Mr. Vijay More, Founder · Since 1991
          </figcaption>
        </figure>

        {/* TEXT — right */}
        <div {...fromRight}>
          <div>
            <SectionLabel>The Vision Behind Amir</SectionLabel>

            <h2 className="mt-4 font-seasons text-[32px] sm:text-[44px] lg:text-[52px] leading-[1.02] tracking-[-0.02em] text-[#171719]">
              Mr. Vijay{" "}
              <span className="italic text-[#EC1F36]">More</span>
            </h2>

            <p className="mt-2 font-poppins text-[13px] font-medium tracking-[0.16em] uppercase text-[#171719]/60">
              Founder, Amir
            </p>
          </div>

          <div>
            <p className="mt-6 font-poppins text-[15px] sm:text-[16px] leading-[1.75] text-[#171719]/75">
              Born in Maharashtra’s drought-affected Ahmednagar region, Mr.
              Vijay More saw first-hand the challenges faced by educated rural
              youth.
            </p>

            <p className="mt-4 font-poppins text-[15px] sm:text-[16px] leading-[1.75] text-[#171719]/75">
              In 1991, he founded Amir with two clear ambitions:
            </p>

            <div className="mt-5 border-l-[3px] border-[#EC1F36] bg-[#EC1F36]/[0.06] rounded-r-lg px-5 py-4">
              <p className="font-seasons text-[22px] sm:text-[26px] leading-[1.25] text-[#171719]">
                Organise meat retail.
              </p>
              <p className="font-seasons italic text-[22px] sm:text-[26px] leading-[1.25] text-[#EC1F36]">
                Create sustainable livelihoods.
              </p>
            </div>

            <p className="mt-6 font-poppins text-[15px] sm:text-[16px] leading-[1.75] text-[#171719]/75">
              More than three decades later, both ambitions live on in every
              Amir store, and in the 2,500+ livelihoods the network supports
              today.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};


/* =========================================================
   BRAND JOURNEY — pinned section, vertical scroll drives a
   horizontal 3D carousel (cards swing in/out around the centre)
========================================================= */

const journey = [
  {
    year: "1991",
    title: "The First Store",
    text: "The first Amir store opens at Gadital, Hadapsar.",
  },
  {
    year: "2005",
    title: "Becoming a Company",
    text: "The business evolves from a proprietorship into a private limited company.",
  },
  {
    year: "2015",
    title: "Recognised Standards",
    text: "Trademark, ISO and Halal registrations secured.",
  },
  {
    year: "2016",
    title: "Franchising Begins",
    text: "Franchising and brand transformation begin, bringing a modern identity, hygienic store formats and standard operating practices.",
  },
  {
    year: "2019",
    title: "Record Sales",
    text: "Monthly broiler sales reach a record 6,85,000 kg.",
  },
  {
    year: "Today",
    title: "A Growing Network",
    text: "580+ stores and 2,500+ livelihoods across Pune, Nashik and Ahilyanagar.",
    featured: true,
  },
  {
    year: "Next",
    title: "The Multi-Protein Chapter",
    text: "Amir is evolving into a complete fresh-protein destination, with chicken, eggs, mutton, fish, seafood and frozen foods under one roof, supported by mobile ordering and home delivery.",
    featured: true,
  },
];

const JourneySection = () => {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const [active, setActive] = useState(0);
  const [reduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (reduced) return;

    let raf = 0;
    let m = { max: 0, vw: 0, pitch: 1, centers: [] };
    let lastActive = -1;

    const update = () => {
      raf = 0;
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const rect = section.getBoundingClientRect();
      const travel = section.offsetHeight - window.innerHeight;
      const p = travel > 0 ? Math.min(1, Math.max(0, -rect.top / travel)) : 0;
      const x = -p * m.max;

      track.style.transform = `translate3d(${x}px, 0, 0)`;

      let nearest = 0;
      let nearestD = Infinity;

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const d = (m.centers[i] + x - m.vw / 2) / m.pitch;
        const ad = Math.min(Math.abs(d), 2);
        if (ad < nearestD) {
          nearestD = ad;
          nearest = i;
        }
        const ry = Math.max(-2, Math.min(2, d)) * -34;
        card.style.transform = `translate3d(0, 0, ${-ad * 140}px) rotateY(${ry}deg) scale(${1 - ad * 0.07})`;
        card.style.opacity = String(1 - ad * 0.32);
      });

      if (nearest !== lastActive) {
        lastActive = nearest;
        setActive(nearest);
      }
    };

    const measure = () => {
      const section = sectionRef.current;
      const sticky = stickyRef.current;
      const track = trackRef.current;
      const first = cardRefs.current[0];
      if (!section || !sticky || !track || !first) return;

      const vw = sticky.clientWidth;
      const cw = first.offsetWidth;
      track.style.paddingInline = `${(vw - cw) / 2}px`;

      const max = Math.max(0, track.offsetWidth - vw);
      section.style.height = `${window.innerHeight + max}px`;

      m = {
        max,
        vw,
        pitch: cw + parseFloat(getComputedStyle(track).columnGap || 0),
        centers: cardRefs.current.map((c) => c.offsetLeft + c.offsetWidth / 2),
      };
      update();
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <section
      ref={sectionRef}
      className="journey relative bg-white border-t border-[#EC1F36]/15 text-[#171719]"
    >
      <div
        ref={stickyRef}
        className={
          reduced
            ? "relative py-14 px-6"
            : "sticky top-0 h-[100svh] overflow-hidden flex flex-col justify-center gap-10 sm:gap-14 py-8 sm:py-10 lg:py-12"
        }
      >
        {/* HEADER */}
        <div className="relative px-6 sm:px-12 lg:px-24 xl:px-32">
          <div className="max-w-[1200px] mx-auto">
            <SectionLabel>Brand Journey · Since 1991</SectionLabel>
            <h2 className="mt-3 font-seasons text-[28px] sm:text-[40px] lg:text-[52px] leading-[1.02] tracking-[-0.02em] text-[#171719]">
              From One Store to a{" "}
              <span className="italic text-[#EC1F36]">Retail Network</span>
            </h2>
          </div>
        </div>

        {/* 3D TRACK */}
        <div
          className={reduced ? "mt-10 overflow-x-auto" : "relative"}
          style={reduced ? undefined : { perspective: "1400px", perspectiveOrigin: "50% 50%" }}
        >
          <div
            ref={trackRef}
            className="flex w-max items-stretch gap-6 sm:gap-8 will-change-transform"
            style={{ transformStyle: reduced ? undefined : "preserve-3d" }}
          >
            {journey.map((item, i) => (
              <article
                key={item.year}
                ref={(el) => (cardRefs.current[i] = el)}
                data-active={!reduced && active === i}
                className={`journey-card relative shrink-0 w-[min(78vw,400px)] rounded-2xl border p-6 sm:p-8 flex flex-col ${
                  item.featured
                    ? "bg-[#EC1F36] border-[#EC1F36] text-white"
                    : "bg-white border-[#EC1F36]/20 text-[#171719]"
                }`}
              >
                <p
                  className={`font-poppins text-[11px] font-medium tracking-[0.18em] uppercase ${
                    item.featured ? "text-white/80" : "text-[#EC1F36]"
                  }`}
                >
                  {pad(i + 1)} / {pad(journey.length)}
                </p>

                <p
                  className={`mt-3 font-seasons italic leading-none text-[56px] sm:text-[72px] ${
                    item.featured ? "text-white" : "text-[#EC1F36]"
                  }`}
                >
                  {item.year}
                </p>

                <h3 className="mt-5 font-seasons text-[22px] sm:text-[26px] leading-[1.1]">
                  {item.title}
                </h3>

                <p
                  className={`mt-3 font-poppins text-[14px] sm:text-[15px] leading-[1.65] ${
                    item.featured ? "text-white/90" : "text-[#171719]/75"
                  }`}
                >
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};


/* =========================================================
   TRUST YOU CAN COUNT
========================================================= */

const trustStats = [
  { to: 580, suffix: "+", label: "Retail Stores" },
  { to: 1000000, suffix: "+", label: "Loyal Customers", indian: true },
  { to: 2500, suffix: "+", label: "Livelihoods Supported", indian: true },
  { to: 2200000, label: "White Eggs Sold Monthly", indian: true },
  { to: 685000, suffix: " kg", label: "Record Monthly Broiler Sales", indian: true },
  { to: 75, prefix: "₹", suffix: " Cr", label: "Annual Turnover" },
];

const TrustSection = () => {
  const [ref, shown] = useInView(0.15);
  const reveal = (delay) => ({
    className: `transition-all duration-700 ease-out ${
      shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    }`,
    style: { transitionDelay: `${delay}s` },
  });

  return (
    <section
      ref={ref}
      className="bg-white border-t border-[#EC1F36]/15 text-[#171719] py-14 sm:py-20 lg:py-24 px-6 sm:px-12 lg:px-24 xl:px-32"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-10 mb-10 lg:mb-14">
          <div {...reveal(0)}>
            <div className="flex items-center gap-3">
              <span className="block w-7 h-px bg-[#EC1F36]" />
              <p className="font-poppins text-[11px] font-medium tracking-[0.18em] uppercase text-[#EC1F36]">
                By the Numbers
              </p>
            </div>

            <h2 className="mt-4 font-seasons text-[32px] sm:text-[44px] lg:text-[52px] leading-[1.02] tracking-[-0.02em] text-[#171719]">
              Trust You <span className="italic text-[#EC1F36]">Can Count</span>
            </h2>
          </div>

          <p
            {...reveal(0.12)}
            className={`max-w-[360px] font-poppins text-[14px] sm:text-[15px] leading-[1.65] text-[#171719]/70 ${reveal(0.12).className}`}
          >
            Three decades of freshness, measured in stores, customers and
            livelihoods.
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
          {trustStats.map((stat, i) => (
            <div
              key={stat.label}
              className={`bg-white border border-[#EC1F36]/20 rounded-xl shadow-[0_2px_14px_rgba(236,31,54,0.05)] px-4 py-7 sm:px-8 sm:py-10 lg:py-12 ${
                reveal(0.1 + i * 0.08).className
              }`}
              style={reveal(0.1 + i * 0.08).style}
            >
              <p className="font-seasons text-[clamp(26px,7.5vw,34px)] sm:text-[48px] lg:text-[60px] leading-none tabular-nums whitespace-nowrap text-[#171719]">
                <CountUp
                  to={stat.to}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  indian={stat.indian}
                  duration={2200}
                />
              </p>
              <p className="mt-3 sm:mt-4 font-poppins text-[10px] sm:text-[12px] font-semibold tracking-[0.1em] sm:tracking-[0.14em] uppercase text-[#EC1F36]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


/* =========================================================
   FINAL CTA (same as Home)
========================================================= */

const FinalCta = () => (
  <section className="relative bg-[#EC1F36] text-white text-center px-6 sm:px-10 lg:px-16 py-16 lg:py-20 overflow-hidden">
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.06]"
      style={{
        backgroundImage:
          "radial-gradient(circle at 20% 20%, white 0, transparent 45%), radial-gradient(circle at 80% 80%, white 0, transparent 45%)",
      }}
    />

    <div className="relative max-w-[900px] mx-auto">
      <div className="inline-flex items-center gap-3 mb-6">
        <span className="w-1.5 h-1.5 rounded-full bg-white" />
        <p className="font-poppins text-[12px] tracking-[0.2em] uppercase text-white/75">
          Work With AMIR
        </p>
        <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
      </div>

      <h2 className="font-seasons text-[36px] sm:text-[48px] lg:text-[60px] leading-[1.05] tracking-[-0.025em] text-white">
        Looking for a fresh,{" "}
        <span className="italic">reliable protein partner?</span>
      </h2>

      <p className="mx-auto mt-5 max-w-xl font-poppins text-[15px] leading-7 text-white/80">
        Fresh cuts, accurate weight and fair pricing, backed by 35+ years
        of trust and a network of 580+ stores across Maharashtra.
      </p>

      <div className="mx-auto mt-6 w-10 h-[3px] bg-white/70" />

      <div className="mt-8 flex flex-row justify-center gap-2 sm:gap-5">
        <Link
          to="/contact"
          className="inline-flex items-center justify-center gap-1.5 sm:gap-3 bg-white text-[#EC1F36] px-3 min-[400px]:px-5 sm:px-10 h-12 sm:h-14 rounded-lg font-poppins text-[10px] min-[400px]:text-[11px] sm:text-[14px] tracking-[0.06em] sm:tracking-[0.14em] uppercase font-bold whitespace-nowrap transition-all duration-300 hover:bg-[#171719] hover:text-white border border-white"
        >
          Contact Now
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3.5 w-3.5 sm:h-4 sm:w-4">
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
          </svg>
        </Link>

        <Link
          to="/catalog"
          className="inline-flex items-center justify-center border border-white/60 text-white px-3 min-[400px]:px-5 sm:px-10 h-12 sm:h-14 rounded-lg font-poppins text-[10px] min-[400px]:text-[11px] sm:text-[14px] tracking-[0.06em] sm:tracking-[0.14em] uppercase font-bold whitespace-nowrap transition-all duration-300 hover:bg-white hover:text-[#EC1F36]"
        >
          Explore Products
        </Link>
      </div>
    </div>
  </section>
);


const AboutPage = () => {
  return (
    <main className="bg-white text-[#EC1F36] overflow-x-clip">
      <style>{`
        @keyframes slideFromLeft {
          from { opacity: 0; transform: translateX(-60px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideFromRight {
          from { opacity: 0; transform: translateX(60px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideFromTop {
          from { opacity: 0; transform: translateY(-50px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideFromBottom {
          from { opacity: 0; transform: translateY(50px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes zoomIn {
          from { opacity: 0; transform: scale(0.85); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes growX {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        .slide-left   { animation: slideFromLeft   0.8s cubic-bezier(.22,1,.36,1) both; }
        .slide-right  { animation: slideFromRight  0.8s cubic-bezier(.22,1,.36,1) both; }
        .slide-top    { animation: slideFromTop    0.8s cubic-bezier(.22,1,.36,1) both; }
        .slide-bottom { animation: slideFromBottom 0.8s cubic-bezier(.22,1,.36,1) both; }
        .zoom-in      { animation: zoomIn          0.8s cubic-bezier(.22,1,.36,1) both; }
        .grow-x       { animation: growX           0.7s ease both; transform-origin: center; }
        .delay-1 { animation-delay: 0.15s; }
        .delay-2 { animation-delay: 0.3s; }
        .delay-3 { animation-delay: 0.45s; }
        .delay-4 { animation-delay: 0.6s; }
        .delay-5 { animation-delay: 0.75s; }
        /* ---- The Amir Promise ---- */
        .promise-rise { opacity: 0; transform: translateY(40px); }
        .promise.is-shown .promise-rise {
          animation: slideFromBottom 0.8s cubic-bezier(.22,1,.36,1) both;
          animation-delay: var(--d, 0s);
        }
        /* cards: 3D tilt-up entrance (hover/design untouched) */
        .promise-grid { perspective: 1400px; perspective-origin: 50% 30%; }
        .promise-card-3d {
          opacity: 0;
          transform-origin: 50% 100%;
          transform: translate3d(0, 70px, -280px) rotateX(-58deg) rotateY(var(--ry, 0deg));
          filter: blur(8px);
          will-change: transform, opacity, filter;
        }
        .promise.is-shown .promise-card-3d {
          animation: promiseCard3d 1.3s cubic-bezier(.16,1,.3,1) both;
          animation-delay: var(--d, 0s);
        }
        @keyframes promiseCard3d {
          0%   { opacity: 0; filter: blur(8px); transform: translate3d(0, 70px, -280px) rotateX(-58deg) rotateY(var(--ry, 0deg)); }
          55%  { opacity: 1; filter: blur(0); }
          100% { opacity: 1; filter: blur(0); transform: translate3d(0, 0, 0) rotateX(0) rotateY(0); }
        }
        .promise-line { transform: scaleX(0); transform-origin: left; }
        .promise.is-shown .promise-line { animation: growX 0.7s ease 0.2s both; }
        .promise-glow { animation: promiseFloat 9s ease-in-out infinite alternate; }
        @keyframes promiseFloat {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(-60px, 50px) scale(1.15); }
        }
        .promise-icon path, .promise-icon circle {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
        }
        .promise.is-shown .promise-icon path,
        .promise.is-shown .promise-icon circle {
          animation: promiseDraw 1.4s ease forwards;
          animation-delay: calc(var(--d, 0s) + 0.35s);
        }
        @keyframes promiseDraw { to { stroke-dashoffset: 0; } }
        .promise-card {
          box-shadow: 0 2px 14px rgba(236,31,54,0.04);
          transition: translate 0.5s cubic-bezier(.22,1,.36,1), box-shadow 0.5s ease, border-color 0.4s ease;
        }
        .promise-card:hover {
          translate: 0 -6px; /* separate from transform so the entrance animation doesn't override it */
          box-shadow: 0 12px 28px rgba(236,31,54,0.12);
        }
        .promise-fill {
          background: rgba(236,31,54,0.04);
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .promise-card:hover .promise-fill { opacity: 1; }
        /* ---- Brand Journey ---- */
        .journey-card {
          box-shadow: 0 2px 14px rgba(236,31,54,0.05);
          transition: box-shadow 0.5s ease, border-color 0.5s ease;
          will-change: transform, opacity;
          backface-visibility: hidden;
        }
        .journey-card[data-active="true"] {
          box-shadow: 0 24px 50px rgba(236,31,54,0.22);
          border-color: #EC1F36;
        }
        .promise-ring { animation: promiseSpin 14s linear infinite; }
        @keyframes promiseSpin { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) {
          .slide-left, .slide-right, .slide-top, .slide-bottom, .zoom-in, .grow-x { animation: none; }
          .promise-rise { opacity: 1; transform: none; animation: none !important; }
          .promise-card-3d { opacity: 1; transform: none; filter: none; animation: none !important; }
          .promise-line { transform: none; animation: none !important; }
          .promise-glow, .promise-ring { animation: none; }
          .promise-icon path, .promise-icon circle { stroke-dashoffset: 0; animation: none !important; }
        }
      `}</style>

      {/* =====================================================
          01 — ABOUT HERO
      ====================================================== */}

      <section className="bg-white pt-10 pb-14 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-28 px-5 sm:px-10 lg:px-16">

        <div className="max-w-[1100px] mx-auto text-center">

          <div className="slide-top">
            <SectionLabel centered>
              Since 1991 · Maharashtra
            </SectionLabel>
          </div>

          <h1
            className="
              slide-bottom delay-1
              mt-6
              font-seasons
              text-[clamp(38px,11.5vw,56px)]
              sm:text-[52px]
              lg:text-[68px]
              leading-[1.05]
              tracking-[-0.02em]
              sm:whitespace-nowrap
              text-[#171719]
            "
          >
            <span className="block sm:inline">
              <HighlightWords text="Fresh Protein," activeColor="#171719" />
            </span>{" "}
            <span className="block sm:inline italic">
              <HighlightWords
                text="Honestly Served."
                activeColor="#EC1F36"
                startIndex={2}
              />
            </span>
          </h1>

          <div className="grow-x delay-2 mt-8 mx-auto w-10 h-[3px] bg-[#EC1F36]" />

          <p className="slide-bottom delay-2 mt-6 sm:mt-8 mx-auto font-poppins text-[15px] sm:text-[17px] lg:text-[19px] leading-[1.7] sm:leading-[1.75] text-black max-w-[680px]">
            From a single store in Hadapsar to 580+ outlets, Amir brings fresh
            cuts, accurate weight and fair pricing to every customer, every day.
          </p>

          <div className="mt-10 sm:mt-12 grid grid-cols-3 divide-x divide-[#EC1F36]/20">
            {[
              { to: 35, suffix: "+", label: "Years of Trust", anim: "slide-left delay-3" },
              { to: 580, suffix: "+", label: "Retail Stores", anim: "slide-bottom delay-4" },
              { to: 10, suffix: " Lakh+", label: "Loyal Customers", anim: "slide-right delay-3" },
            ].map((stat) => (
              <div key={stat.label} className={`px-1.5 sm:px-4 ${stat.anim}`}>
                <p className="font-seasons text-[clamp(20px,6.2vw,30px)] sm:text-[40px] lg:text-[52px] leading-none text-[#EC1F36] whitespace-nowrap">
                  <CountUp to={stat.to} suffix={stat.suffix} />
                </p>
                <p className="mt-2 sm:mt-3 font-poppins text-[9px] min-[400px]:text-[10px] sm:text-[12px] tracking-[0.08em] sm:tracking-[0.14em] uppercase font-semibold text-[#171719]/70">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="zoom-in delay-5 mt-10 sm:mt-12 flex flex-row items-stretch justify-center gap-2 sm:gap-4">
            <Link
              to="/contact"
              className="
                inline-flex items-center justify-center gap-1.5 sm:gap-3
                bg-[#EC1F36] text-white border border-[#EC1F36]
                px-3 sm:px-8 h-12 sm:h-14 rounded-lg
                font-poppins text-[10px] min-[400px]:text-[11px] sm:text-[13px] tracking-[0.06em] sm:tracking-[0.12em] uppercase font-bold whitespace-nowrap
                transition-colors duration-300 hover:bg-[#c8172d] hover:border-[#c8172d]
              "
            >
              Find a Store Near You
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </Link>

            <Link
              to="/catalog"
              className="
                inline-flex items-center justify-center gap-1.5 sm:gap-3
                bg-transparent text-[#EC1F36] border border-[#EC1F36]
                px-3 sm:px-8 h-12 sm:h-14 rounded-lg
                font-poppins text-[10px] min-[400px]:text-[11px] sm:text-[13px] tracking-[0.06em] sm:tracking-[0.12em] uppercase font-bold whitespace-nowrap
                transition-colors duration-300 hover:bg-[#EC1F36] hover:text-white
              "
            >
              Explore Products
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </Link>
          </div>

        </div>

      </section>


      {/* =====================================================
          02 — THE AMIR PROMISE
      ====================================================== */}

      <PromiseSection />


      {/* =====================================================
          03 — OUR STORY
      ====================================================== */}

      <StorySection />
      <FounderSection />
      <JourneySection />
      <TransformationSection />
      <TrustSection />
      <FinalCta />

    </main>
  );
};

export default AboutPage;