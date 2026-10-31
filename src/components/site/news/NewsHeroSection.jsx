import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight } from "lucide-react";

import AnimatedHeadline from "./hero/AnimatedHeadline";
import FloatingCard from "./hero/FloatingCard";
import HeroVisual from "./hero/HeroVisual";
import Leaves from "./hero/Leaves";
import StoryModal from "./StoryModal";
import { heroCards } from "../../../data/heroCards";

const EASE = [0.22, 1, 0.36, 1];
const PARALLAX_BASE = 20; // px of travel for a depth-1 layer

/* Entrance direction + per-card timing, keyed by corner. Each card drifts on
   its own duration/delay/direction so the four float independently rather
   than in lockstep. */
const CARD_MOTION = {
  "top-left": { entranceFrom: { x: -140, y: -90 }, floatDuration: 7, floatDelay: 0, driftX: -5 },
  "top-right": { entranceFrom: { x: 140, y: -90 }, floatDuration: 8.5, floatDelay: 0.4, driftX: 5 },
  "bottom-left": { entranceFrom: { x: -140, y: 90 }, floatDuration: 7.5, floatDelay: 0.8, driftX: -4 },
  "bottom-right": { entranceFrom: { x: 140, y: 90 }, floatDuration: 9, floatDelay: 1.2, driftX: 4 },
};

const CORNER_CLASS = {
  "top-left": "left-[-1%] top-[6%] md:left-[0%] lg:left-[-2%]",
  "top-right": "right-[-1%] top-[6%] md:right-[0%] lg:right-[-2%]",
  "bottom-left": "left-[1%] bottom-[4%] md:left-[-1%] lg:left-[-3%]",
  "bottom-right": "right-[1%] bottom-[4%] md:right-[-1%] lg:right-[-3%]",
};

export default function NewsHeroSection() {
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);
  const [activeCard, setActiveCard] = useState(null);

  /* Mouse parallax is desktop-only; coarse (touch) pointers skip it */
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    setIsTouch(mq.matches);
    const onChange = (e) => setIsTouch(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  /* Mouse parallax: shared spring values, scaled per layer via `depth` */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 150, damping: 20, mass: 0.5 });
  const springY = useSpring(rawY, { stiffness: 150, damping: 20, mass: 0.5 });

  const handlePointerMove = (e) => {
    if (reduce || isTouch) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    rawX.set(nx * 2 * PARALLAX_BASE);
    rawY.set(ny * 2 * PARALLAX_BASE);
  };
  const handlePointerLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  /* Scroll cue: the text block fades + scales as the next section slides over
     it. The food image/cards stage is intentionally excluded so it stays
     fully visible while scrolling. */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.25]);

  const handleExplore = (e) => {
    const target = document.getElementById("latest-stories");
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }
  };

  return (
    <section
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative isolate overflow-hidden bg-white px-6 pb-12 pt-10 sm:px-10 sm:pt-14 lg:px-16 lg:pb-14 lg:pt-12"
    >
      <motion.div style={{ scale: scrollScale, opacity: scrollOpacity }} className="relative z-10">
        {/* Center content: fades with scroll, same as before */}
        <div className="relative z-20 mx-auto flex max-w-4xl flex-col items-center text-center">
          <div className="flex items-center justify-center gap-4">
            <motion.span
              initial={reduce ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, ease: EASE }}
              style={{ transformOrigin: "100% 50%" }}
              className="h-px w-[52px] bg-amir/40 sm:w-[70px]"
            />
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-amir sm:text-[18px]">
              News &amp; Media
            </p>
            <motion.span
              initial={reduce ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, ease: EASE }}
              style={{ transformOrigin: "0% 50%" }}
              className="h-px w-[52px] bg-amir/40 sm:w-[70px]"
            />
          </div>

          <div className="mt-2">
            <AnimatedHeadline lineOne="Fresh Stories" lineTwo="from Our World" reduce={reduce} />
          </div>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 14, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: reduce ? 0 : 0.5, ease: EASE }}
            className="mt-3 max-w-[480px] text-base leading-7 text-[#666] sm:text-lg"
          >
            Stories, insights and updates from Amir's world of food.
          </motion.p>

          <motion.a
            href="#latest-stories"
            onClick={handleExplore}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: reduce ? 0 : 0.65, ease: EASE }}
            className="group mt-5 inline-flex items-center gap-2 rounded-full bg-amir px-8 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_-12px_rgba(236,31,54,0.55)] transition-transform duration-300 hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amir"
          >
            Explore Stories
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.a>
        </div>
      </motion.div>

      {/* Stage: hero visual + floating cards, each floating independently.
          Kept out of the scroll-fade wrapper above so the food image and
          cards stay fully visible (only a subtle scale-down applies) while
          scrolling. */}
      <motion.div
        style={{ scale: scrollScale }}
        className="relative z-10 mx-auto mt-4 w-full max-w-[1320px] sm:mt-6"
      >
        <div className="relative mx-auto min-h-[400px] sm:min-h-[560px] lg:min-h-[680px] xl:min-h-[760px]">
          <div className="absolute inset-0 flex items-center justify-center">
            <HeroVisual springX={springX} springY={springY} reduce={reduce} />
            <div className="absolute inset-0">
              <Leaves springX={springX} springY={springY} reduce={reduce} />
            </div>
          </div>

          {heroCards.map((card, i) => (
            <div key={card.id} className={`absolute z-30 hidden md:block ${CORNER_CLASS[card.corner]}`}>
              <FloatingCard
                data={card}
                rotate={card.rotate}
                depth={1}
                springX={springX}
                springY={springY}
                reduce={reduce}
                entranceDelay={reduce ? 0 : 0.3 + i * 0.12}
                entranceFrom={CARD_MOTION[card.corner].entranceFrom}
                floatDuration={CARD_MOTION[card.corner].floatDuration}
                floatDelay={CARD_MOTION[card.corner].floatDelay}
                driftX={CARD_MOTION[card.corner].driftX}
                onOpen={setActiveCard}
              />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Mobile: horizontal scroll-snap row, no tilt, light float only */}
      <div className="relative z-20 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-2 md:hidden">
        {heroCards.map((card, i) => (
          <FloatingCard
            key={card.id}
            data={card}
            rotate={0}
            depth={0}
            springX={springX}
            springY={springY}
            reduce={reduce}
            mobile
            entranceDelay={reduce ? 0 : 0.1 * i}
            onOpen={setActiveCard}
          />
        ))}
      </div>

      <AnimatePresence>
        {activeCard && (
          <StoryModal
            layout="stacked"
            story={{
              image: activeCard.image,
              category: activeCard.tag,
              date: activeCard.date,
              title: activeCard.title,
              summary: activeCard.description,
              content: activeCard.content,
            }}
            onClose={() => setActiveCard(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
