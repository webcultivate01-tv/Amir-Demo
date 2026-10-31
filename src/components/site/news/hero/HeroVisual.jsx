import { motion, useTransform } from "framer-motion";
import heroFood from "../../../../../images/newsmedia/NewHeroNews.png";
import productChicken from "../../../../../images/products/chicken/Whole Chicken With Skin.png";
import fishPlate from "../../../../../images/fresh-fish-plate.png";
import muttonPlate from "../../../../../images/raw-mutton-plate.png";

const RING_PANELS = [
  { img: productChicken, angle: -70, dist: 1 },
  { img: fishPlate, angle: 15, dist: 1.05 },
  { img: muttonPlate, angle: 125, dist: 1 },
  { img: productChicken, angle: 200, dist: 1.05 },
];

/**
 * The center "stage": a glass podium with blurred rotating image panels
 * curved around it, and the hero food cut-out resting on top.
 */
export default function HeroVisual({ springX, springY, reduce }) {
  const parX = useTransform(springX, (v) => v * 0.5);
  const parY = useTransform(springY, (v) => v * 0.5);

  return (
    <motion.div
      style={{ x: parX, y: parY }}
      className="relative mx-auto aspect-[3/2] w-[340px] sm:w-[500px] lg:w-[680px] xl:w-[780px]"
    >
      {/* Ground shadow */}
      <div
        aria-hidden="true"
        className="absolute bottom-[2%] left-1/2 h-8 w-[60%] -translate-x-1/2 rounded-full bg-black/20 blur-2xl sm:h-12"
      />

      {/* Glass podium disc */}
      <div
        aria-hidden="true"
        className="absolute bottom-[4%] left-1/2 h-[14%] w-[78%] -translate-x-1/2 rounded-full border border-white/50 bg-white/30 backdrop-blur-sm"
      />

      {/* Rotating ring of softly blurred panels, kept well behind the food */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={reduce ? undefined : { duration: 70, repeat: Infinity, ease: "linear" }}
      >
        {RING_PANELS.map((panel, i) => {
          const rad = (panel.angle * Math.PI) / 180;
          const radius = 44 * panel.dist;
          const x = 50 + radius * Math.cos(rad);
          const y = 50 + radius * Math.sin(rad) * 0.5;
          return (
            <div
              key={i}
              className="absolute h-14 w-20 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-white/40 opacity-25 blur-[3px] sm:h-16 sm:w-24"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <img src={panel.img} alt="" className="h-full w-full object-cover" />
            </div>
          );
        })}
      </motion.div>

      {/* Hero food cut-out: full opacity, crisp, gently bobbing */}
      <motion.img
        src={heroFood}
        alt="Fresh chicken, lamb, fish and eggs with rosemary and peppercorns, Amir's seasonal selection"
        className="absolute inset-0 z-10 h-full w-full object-contain drop-shadow-[0_26px_32px_rgba(34,34,34,0.28)]"
        animate={reduce ? undefined : { y: [0, -6, 0] }}
        transition={reduce ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
