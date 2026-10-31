import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

export default function FinalCta() {
  const reduce = useReducedMotion();

  return (
    <section className="relative bg-[#EC1F36] text-white text-center px-6 sm:px-10 lg:px-16 py-16 lg:py-20 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, white 0, transparent 45%), radial-gradient(circle at 80% 80%, white 0, transparent 45%)",
        }}
      />

      <div className="relative max-w-[900px] mx-auto">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="inline-flex items-center gap-3 mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white" />
          <p className="font-poppins text-[12px] tracking-[0.2em] uppercase text-white/75">
            Work With Amir
          </p>
          <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
        </motion.div>

        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, delay: 0.1, ease: EASE }}
          className="font-seasons text-[36px] sm:text-[48px] lg:text-[60px] leading-[1.05] tracking-[-0.025em] text-white"
        >
          Looking for a fresh,{" "}
          <span className="italic">reliable protein partner?</span>
        </motion.h2>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, delay: 0.2, ease: EASE }}
          className="mx-auto mt-5 max-w-xl font-poppins text-[15px] leading-7 text-white/80"
        >
          Fresh cuts, accurate weight and fair pricing, backed by 35+ years
          of trust and a network of 580+ stores across Maharashtra.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
          className="mx-auto mt-6 w-10 h-[3px] bg-white/70 origin-center"
        />

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, delay: 0.38, ease: EASE }}
          className="mt-8 flex flex-row justify-center gap-2 sm:gap-5"
        >
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
        </motion.div>
      </div>
    </section>
  );
}
