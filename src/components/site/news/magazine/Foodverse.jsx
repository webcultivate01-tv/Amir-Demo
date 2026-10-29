import React, { useMemo, useState } from "react";
import { foodverseTabs, foodverseItems } from "../../../../data/newsMagazine";
import Reveal from "./Reveal";
import "./magazine.css";

const allTabs = [{ id: "all", label: "All" }, ...foodverseTabs];

export default function Foodverse() {
  const [active, setActive] = useState("all");

  const visible = useMemo(() => {
    if (active === "all") {
      return foodverseTabs
        .map((tab) => foodverseItems[tab.id]?.[0])
        .filter(Boolean)
        .slice(0, 3);
    }
    return (foodverseItems[active] ?? []).slice(0, 3);
  }, [active]);

  const onKeyDown = (e, index) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const dir = e.key === "ArrowRight" ? 1 : -1;
    const next = (index + dir + allTabs.length) % allTabs.length;
    setActive(allTabs[next].id);
    document.getElementById(`foodverse-tab-${allTabs[next].id}`)?.focus();
  };

  return (
    <section
      id="foodverse"
      aria-labelledby="foodverse-title"
      className="mag-dark-block bg-mag-maroon px-4 py-16 sm:px-6 lg:px-10 lg:py-20"
      style={{ backgroundColor: "#78191D" }}
    >
      <div className="mx-auto max-w-[1200px]">
        <Reveal className="mx-auto max-w-[640px] text-center">
          <h2
            id="foodverse-title"
            className="font-seasons text-[36px] font-bold leading-[1.1] text-mag-offwhite sm:text-[46px] lg:text-[54px]"
          >
            Our Foodverse
          </h2>
          <p className="mt-3 font-poppins text-[15px] font-semibold text-mag-offwhite sm:text-[17px]">
            AMIR&rsquo;s Fresh Pulse
          </p>
        </Reveal>

        {/* Tabs: horizontally scrollable pill row on mobile */}
        <div
          role="tablist"
          aria-label="Filter recipes by category"
          className="-mx-4 mt-8 flex gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:justify-center sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {allTabs.map((tab, i) => {
            const selected = active === tab.id;
            return (
              <button
                key={tab.id}
                id={`foodverse-tab-${tab.id}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls="foodverse-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(tab.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={`shrink-0 rounded-full border px-6 py-2.5 font-poppins text-[13px] font-semibold text-mag-offwhite transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mag-offwhite ${
                  selected
                    ? "border-mag-accent bg-mag-accent"
                    : "border-mag-offwhite/30 bg-mag-offwhite/10 hover:border-mag-offwhite/50 hover:bg-mag-offwhite/20"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div
          id="foodverse-panel"
          key={active}
          role="tabpanel"
          aria-labelledby={`foodverse-tab-${active}`}
          className="mag-tab-panel mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {visible.map((item, i) => (
            <Reveal
              as="article"
              delay={i * 60}
              key={item.id}
              className="group flex flex-col overflow-hidden rounded-[24px] shadow-[0_20px_45px_-20px_rgba(0,0,0,0.7)] transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden">
                <img
                  src={item.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute right-3 top-3 -rotate-6 rounded-full bg-white px-3 py-1 font-poppins text-[10px] font-bold uppercase tracking-[0.08em] text-mag-ink shadow-md">
                  {item.category}
                </span>
              </div>
              <div className="flex flex-1 items-center justify-center bg-mag-offwhite px-5 py-5">
                <h3 className="line-clamp-2 text-center font-poppins text-[15px] font-bold leading-snug text-mag-ink">
                  {item.title}
                </h3>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
