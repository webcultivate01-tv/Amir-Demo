import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import amirProteinHero from "../../../../images/amir-protein-hero.png";

const EASE = [0.22, 1, 0.36, 1];

export default function FeaturedStory() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#171719] px-6 py-14 sm:px-10 lg:px-16 lg:py-16">
      <img
        src={amirProteinHero}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#801821]/90 via-[#171719]/80 to-[#171719]/30" />

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: EASE }}
        className="relative mx-auto max-w-[1480px]"
      >
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#EC1F36]">
            Featured Story
          </p>

          <h2 className="mt-4 font-seasons text-4xl font-medium leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
            From One Store to Your Kitchen
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
            Since 1991, Amir has grown from a single store into 580+ stores
            across Maharashtra, offering fresh, hygienic and 100% Halal protein.
          </p>

          <Link
            to="/about"
            className="group mt-8 inline-flex items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:text-[#EC1F36]"
          >
            Read Story
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1">
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
