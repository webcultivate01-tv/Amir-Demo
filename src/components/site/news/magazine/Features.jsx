import React from "react";
import { ArrowRight } from "lucide-react";
import { mainFeature, secondaryFeatures } from "../../../../data/newsMagazine";
import { Eyebrow } from "./Ornaments";
import Reveal from "./Reveal";
import "./magazine.css";

export default function Features() {
  return (
    <section id="feast-on-features" aria-labelledby="features-title" className="mag-dark-block bg-mag-charcoal px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <Eyebrow className="justify-center text-center">{mainFeature.eyebrow}</Eyebrow>
        </Reveal>
        <h2 id="features-title" className="sr-only">
          Feast on Features
        </h2>

        <Reveal
          as="article"
          delay={90}
          className="mt-8 overflow-hidden rounded-[20px] bg-mag-offwhite shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] lg:grid lg:grid-cols-2"
        >
          <div className="aspect-[16/10] w-full overflow-hidden lg:aspect-auto lg:h-full">
            <img src={mainFeature.image} alt="" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
            <h3 className="font-syne text-[26px] font-bold leading-[1.1] text-mag-ink sm:text-[32px]">
              {mainFeature.title}
            </h3>
            <p className="mt-4 font-sans text-[15px] leading-[1.7] text-mag-ink/70">{mainFeature.excerpt}</p>
            <a
              href={`#story-${mainFeature.title}`}
              className="group mt-6 inline-flex h-12 w-fit items-center gap-2.5 rounded-[12px] bg-mag-crimson px-7 font-poppins text-[13px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-mag-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mag-accent"
            >
              Read the story
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </div>
        </Reveal>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {secondaryFeatures.map((feature, i) => (
            <Reveal
              as="a"
              delay={180 + i * 90}
              key={feature.id}
              href={`#story-${feature.id}`}
              className="group overflow-hidden rounded-[20px] bg-mag-offwhite shadow-[0_8px_30px_-12px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mag-accent"
            >
              <div className="aspect-[16/11] w-full overflow-hidden">
                <img
                  src={feature.image}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <Eyebrow>{feature.label}</Eyebrow>
                <h4 className="mt-2 font-syne text-[16px] font-bold leading-snug text-mag-ink">{feature.title}</h4>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
