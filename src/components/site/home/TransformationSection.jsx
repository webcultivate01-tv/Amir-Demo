import React, { useEffect, useRef } from "react";

const chapters = [
  {
    title: "Modern Brand Identity",
    text: "A stronger and more recognisable Amir retail identity.",
  },
  {
    title: "Hygienic Store Formats",
    text: "More consistent and customer-focused retail environments.",
  },
  {
    title: "Standard Operating Practices",
    text: "Structured processes designed to create consistency across the network.",
  },
  {
    title: "Centralised Procurement",
    text: "A more organised approach to sourcing and supply.",
  },
  {
    title: "Franchise Training",
    text: "Supporting partners with practical operational knowledge.",
  },
  {
    title: "Marketing Support",
    text: "Helping franchise partners build visibility and customer recall.",
  },
  {
    title: "Consistent Customer Experience",
    text: "Bringing a familiar Amir experience across the network.",
  },
];

const pad = (n) => String(n).padStart(2, "0");

function ChapterRow({ item, index }) {
  return (
    <li className="grid grid-cols-[48px_1fr] items-start gap-4 border-b border-[#171719]/10 py-8 sm:grid-cols-[96px_1fr] lg:py-10">
      <span className="pt-3 font-poppins text-[16px] font-semibold tracking-[0.2em] text-[#EC1F36]">
        {pad(index + 1)}
      </span>

      <div>
        <h3 className="font-seasons text-[30px] leading-[1.1] tracking-[-0.02em] text-[#171719] sm:text-[38px] lg:text-[46px]">
          {item.title}
        </h3>
        <p className="mt-3 max-w-lg font-poppins text-[17px] leading-[1.75] text-[#171719]/60">
          {item.text}
        </p>
      </div>
    </li>
  );
}

const SPEED = 30; // px per second

export default function TransformationSection() {
  const sectionRef = useRef(null);
  const listRef = useRef(null);

  // Auto-scrolls the list slowly while the section is on screen. The user can
  // scroll it by hand at any time; once the 7th point is reached the list
  // stops and further scrolling carries on to the next section.
  useEffect(() => {
    const el = listRef.current;
    const section = sectionRef.current;
    if (!el || !section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let visible = false;
    let last = performance.now();
    let pos = el.scrollTop;
    let expected = el.scrollTop;

    const tick = (now) => {
      const dt = Math.min(now - last, 64) / 1000;
      last = now;

      const max = el.scrollHeight - el.clientHeight;
      // the user moved the list themselves
      if (Math.abs(el.scrollTop - expected) > 2) pos = el.scrollTop;

      if (pos < max) {
        pos = Math.min(pos + SPEED * dt, max);
        el.scrollTop = pos;
        expected = el.scrollTop;
      }
      raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !visible) {
          visible = true;
          last = performance.now();
          pos = el.scrollTop;
          expected = el.scrollTop;
          raf = requestAnimationFrame(tick);
        } else if (!entry.isIntersecting && visible) {
          visible = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(section);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={sectionRef} className="border-t border-[#EC1F36]/15 bg-white px-6 py-16 sm:px-10 lg:flex lg:min-h-[100svh] lg:items-center lg:px-16 lg:py-12">
      <style>{`
        .amir-chapters-window { scrollbar-width: none; -ms-overflow-style: none; }
        .amir-chapters-window::-webkit-scrollbar { display: none; }
      `}</style>

      <div className="mx-auto w-full max-w-[1480px]">
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          {/* LEFT — intro */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-10 bg-[#EC1F36]" />
              <p className="font-poppins text-[15px] font-semibold uppercase tracking-[0.22em] text-[#171719]/60">
                Franchising &amp; Rebranding · 2016
              </p>
            </div>

            <h2 className="mt-7 font-seasons text-[48px] leading-[1] tracking-[-0.03em] text-[#171719] sm:text-[64px] lg:text-[80px]">
              A new chapter
              <br />
              for <span className="italic text-[#EC1F36]">Amir.</span>
            </h2>

            <p className="mt-7 max-w-md font-poppins text-[17px] leading-[1.9] text-[#171719]/60">
              The 2016 transformation introduced a more structured,
              recognisable and scalable approach to the Amir network.
            </p>

            <div className="mt-10 flex items-center gap-4">
              <span className="font-seasons text-5xl leading-none tracking-tight text-[#171719]">
                {pad(chapters.length)}
              </span>
              <span className="h-px w-10 bg-[#EC1F36]" />
              <span className="font-poppins text-[15px] font-semibold uppercase tracking-[0.2em] text-[#171719]/50">
                Pillars of change
              </span>
            </div>
          </div>

          {/* RIGHT — auto-scrolling list */}
          <div
            ref={listRef}
            className="amir-chapters-window relative h-[520px] overflow-y-auto border-t border-[#171719]/10 sm:h-[560px] lg:h-[min(640px,78svh)]"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, #000 12%, #000 88%, transparent 100%)",
              maskImage:
                "linear-gradient(to bottom, transparent 0%, #000 12%, #000 88%, transparent 100%)",
            }}
          >
            <div>
              <ol>
                {chapters.map((item, i) => (
                  <ChapterRow key={item.title} item={item} index={i} />
                ))}
              </ol>
              {/* room so the last point can scroll clear of the fade */}
              <div className="h-24" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
