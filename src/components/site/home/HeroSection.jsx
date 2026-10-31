
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Link } from "react-router-dom";
import amirHero from "../../../../images/Hero1 (2).png";

export default function HeroSection() {
  const heroRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, 45]
  );

  const entrance = reduceMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 24 };

  const lineVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      ref={heroRef}
      aria-labelledby="amir-hero-title"
      className="relative isolate flex h-[80svh] max-h-[900px] sm:min-h-[620px] sm:h-[calc(100svh-82px)] items-center justify-center overflow-hidden bg-[#271719] text-white"
    >
      {/* Full-screen food photograph */}
      <motion.div
        className="absolute inset-0 -z-20"
        initial={reduceMotion ? false : { opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <motion.img
          src={amirHero}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          className="h-full w-full object-cover object-center"
          style={{ y: imageY }}
        />
      </motion.div>

      {/* Image contrast overlays */}
      <div className="absolute inset-0 -z-10 bg-black/20" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/35 via-black/10 to-black/55" />

      <div className="mx-auto w-full max-w-[1440px] px-5 pb-8 pt-4 text-center sm:py-20 sm:px-10 lg:px-16">
        {/* Brand eyebrow */}
        <motion.div
          initial={reduceMotion ? false : entrance}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mb-5 flex items-center sm:mb-7 justify-center gap-3"
        >
          <span className="h-px w-8 bg-[#EC1F36]" />

          <p className="text-[12px] font-semibold uppercase tracking-[0.24em] sm:text-sm">
            Amir's Fresh Cut
            {/* <span className="mx-1 text-white/70">/</span>
            Since 1991 */}
          </p>

          <span className="h-px w-8 bg-[#EC1F36]" />
        </motion.div>

        {/* Centered headline */}
        <motion.h1
          id="amir-hero-title"
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.18,
                delayChildren: 0.2,
              },
            },
          }}
          className="mx-auto max-w-5xl font-seasons text-4xl font-medium leading-[1.08] tracking-tight max-sm:text-[2.5rem] sm:text-6xl md:text-7xl lg:text-[88px]"
        >
          <span className="block overflow-hidden pb-2">
            <motion.span
              variants={lineVariants}
              className="block"
            >
              Freshness for
            </motion.span>
          </span>

          <span className="block overflow-hidden pb-3">
            <motion.span
              variants={lineVariants}
              className="block italic"
            >
              every Indian{" "}
              <span className="text-[#EC1F36]">Kitchen</span>
            </motion.span>
          </span>
        </motion.h1>

        {/* Concise supporting copy */}
        <motion.p
          initial={reduceMotion ? false : entrance}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75 }}
          className="mx-auto mt-5 max-w-lg text-base leading-6 text-white/95 sm:text-base sm:leading-7"
        >
          Chicken, eggs, mutton, fish, seafood and frozen foods — fresh cuts,
          100% Halal practices, accurate weight and fair pricing, all under
          one trusted brand.
        </motion.p>

        {/* Calls to action */}
        <motion.div
          initial={reduceMotion ? false : entrance}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mt-6 flex flex-wrap sm:mt-8 items-center justify-center gap-3"
        >
          <Link
            to="/catalog"
            className="group inline-flex min-h-12 items-center gap-5 bg-[#EC1F36] px-6 py-3 text-base font-semibold text-white transition-colors duration-300 hover:bg-[#B9101F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Explore our range
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>

          <Link
            to="/contact"
            className="inline-flex min-h-12 items-center gap-3 border border-white/70 bg-black/10 px-6 py-3 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-[#271719] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Contact us
            <span aria-hidden="true">↗</span>
          </Link>
        </motion.div>

        {/* Editorial footer */}
        <motion.p
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="mt-6 text-xs font-medium uppercase tracking-[0.2em] text-white sm:mt-12"
        >
          Freshness · Fairness · Trust
          <span className="mx-2 text-[#FFB800]">|</span>
          580+ Stores
          <span className="mx-2 text-[#FFB800]">|</span>
          ISO &amp; Halal Registered
        </motion.p>
      </div>
    </section>
  );
}
