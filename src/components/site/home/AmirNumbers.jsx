import { useRef } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const stats = [
  {
    value: 35,
    suffix: "+",
    label: "Years of Experience",
    description: "A legacy of commitment built since 1991.",
  },
  {
    value: 580,
    suffix: "+",
    label: "Retail Stores",
    description: "An expanding network serving customers.",
  },
  {
    value: 2500,
    suffix: "+",
    label: "Livelihoods Supported",
    description: "Families and teams supported across the Amir network.",
  },
];

/* Number that counts up in step with scroll progress */
function ScrollNumber({ value, suffix, progress, reduceMotion }) {
  const ref = useRef(null);
  const format = (n) => Math.round(n).toLocaleString("en-US") + suffix;

  useMotionValueEvent(progress, "change", (p) => {
    if (!reduceMotion && ref.current) {
      ref.current.textContent = format(p * value);
    }
  });

  return (
    <span ref={ref}>{format(reduceMotion ? value : 0)}</span>
  );
}

function StatItem({ item, index, progress, reduceMotion }) {
  // Each stat reveals in sequence as the section scrolls into view
  const start = 0.05 + index * 0.12;
  const end = start + 0.35;

  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [60, 0]);
  const count = useTransform(progress, [start, end + 0.15], [0, 1]);
  const bar = useTransform(progress, [end - 0.1, end + 0.1], [0, 1]);

  return (
    <motion.div
      style={reduceMotion ? undefined : { opacity, y }}
      className={`flex flex-col items-center px-6 py-6 text-center lg:py-4 ${
        index > 0
          ? "border-t border-[#281719]/10 lg:border-l lg:border-t-0"
          : ""
      }`}
    >
      <p className="font-seasons text-5xl font-medium tracking-[-0.05em] text-[#281719] sm:text-6xl lg:text-7xl">
        <ScrollNumber
          value={item.value}
          suffix={item.suffix}
          progress={count}
          reduceMotion={reduceMotion}
        />
      </p>

      <motion.span
        style={reduceMotion ? undefined : { scaleX: bar }}
        className="mt-5 h-[3px] w-12 origin-center rounded-full bg-[#EC1F36]"
      />

      <h3 className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-[#8F1525]">
        {item.label}
      </h3>

      <p className="mt-3 max-w-[16rem] text-base leading-6 text-neutral-500">
        {item.description}
      </p>
    </motion.div>
  );
}

export default function AmirNumbers() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.4,
  });

  // Whole-section parallax (continues past center while leaving)
  const { scrollYProgress: pageProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const ringY = useTransform(pageProgress, [0, 1], [-80, 80]);
  const ringY2 = useTransform(pageProgress, [0, 1], [100, -100]);
  const ringRotate = useTransform(pageProgress, [0, 1], [0, 90]);

  const headingOpacity = useTransform(progress, [0, 0.3], [0, 1]);
  const headingY = useTransform(progress, [0, 0.3], [40, 0]);
  const lineScale = useTransform(progress, [0.1, 0.5], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center overflow-hidden bg-[#F5F3F0] px-6 pb-14 pt-8 sm:px-10 sm:py-14 lg:px-16 lg:py-16"
    >
      {/* Decorative parallax rings */}
      {!reduceMotion && (
        <>
          <motion.div
            style={{ y: ringY, rotate: ringRotate }}
            className="pointer-events-none absolute -left-32 top-10 h-[26rem] w-[26rem] rounded-full border border-[#EC1F36]/15"
          />
          <motion.div
            style={{ y: ringY2 }}
            className="pointer-events-none absolute -right-40 bottom-0 h-[32rem] w-[32rem] rounded-full border border-[#EC1F36]/10"
          />
          <motion.div
            style={{ y: ringY2 }}
            className="pointer-events-none absolute -right-24 bottom-16 h-[22rem] w-[22rem] rounded-full border border-[#EC1F36]/10"
          />
        </>
      )}

      <div className="relative mx-auto w-full max-w-[1480px]">
        {/* Heading */}
        <motion.div
          style={
            reduceMotion ? undefined : { opacity: headingOpacity, y: headingY }
          }
          className="mx-auto max-w-3xl text-center"
        >
          <p className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#EC1F36]">
            <span className="h-px w-8 bg-[#EC1F36]/50" />
            Amir in Numbers
            <span className="h-px w-8 bg-[#EC1F36]/50" />
          </p>

          <h2 className="mt-5 font-seasons text-4xl font-medium leading-[1.05] tracking-[-0.04em] text-[#281719] sm:text-5xl lg:text-6xl">
            A legacy built on{" "}
            <span className="italic text-[#EC1F36]">trust.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-neutral-500 sm:text-base">
            A growing retail network and thousands of livelihoods, built over 35 years.
          </p>
        </motion.div>

        {/* Scroll-drawn divider */}
        <motion.div
          style={reduceMotion ? undefined : { scaleX: lineScale }}
          className="mx-auto mt-8 h-px w-full max-w-5xl origin-left bg-gradient-to-r from-transparent via-[#EC1F36]/40 to-transparent lg:mt-8"
        />

        {/* Stats */}
        <div className="mx-auto mt-4 grid max-w-6xl grid-cols-1 lg:mt-6 lg:grid-cols-3">
          {stats.map((item, index) => (
            <StatItem
              key={item.label}
              item={item}
              index={index}
              progress={progress}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
