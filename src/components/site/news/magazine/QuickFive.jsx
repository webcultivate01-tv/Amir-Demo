import React from "react";
import { ArrowRight } from "lucide-react";
import { quickFive } from "../../../../data/newsMagazine";
import { Eyebrow } from "./Ornaments";
import Reveal from "./Reveal";
import "./magazine.css";

export default function QuickFive() {
  return (
    <section aria-labelledby="quick-five-title" className="mag-dark-block bg-mag-charcoal px-4 py-16 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[820px]">
        <Reveal>
          <Eyebrow className="justify-center text-center">Quick Five</Eyebrow>
        </Reveal>
        <h2 id="quick-five-title" className="sr-only">
          Five stories worth a quick read
        </h2>

        <ul className="mt-6 divide-y divide-mag-ink/10 rounded-[20px] bg-mag-offwhite shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)]">
          {quickFive.map((item, i) => (
            <Reveal as="li" delay={i * 70} key={item.href + i}>
              <a
                href={item.href}
                className="group flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-mag-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mag-accent sm:px-7 sm:py-5"
              >
                <span className="font-sans text-[14px] font-medium leading-snug text-mag-ink sm:text-[15px]">
                  {item.label}
                </span>
                <ArrowRight
                  className="h-4 w-4 shrink-0 text-mag-accent transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
