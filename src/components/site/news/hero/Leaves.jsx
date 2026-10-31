import { motion, useTransform } from "framer-motion";

/* Single rosemary-style leaf, drawn so it can be scaled/rotated freely */
function LeafShape({ className = "", style }) {
  return (
    <svg viewBox="0 0 64 120" fill="none" className={className} style={style} aria-hidden="true">
      <path
        d="M32 2C14 22 4 54 8 84c2 14 10 26 24 34 14-8 22-20 24-34 4-30-6-62-24-82Z"
        fill="currentColor"
      />
      <path d="M32 10V112" stroke="rgba(0,0,0,0.18)" strokeWidth="1.5" />
    </svg>
  );
}

const LEAVES = [
  { top: "8%", left: "20%", size: 26, rotate: -18, color: "#6B8F3C", duration: 7, delay: 0, depth: 1.6 },
  { top: "18%", left: "78%", size: 18, rotate: 24, color: "#8FAE5C", duration: 8.5, delay: 0.6, depth: 1.1 },
  { top: "62%", left: "12%", size: 22, rotate: 12, color: "#6B8F3C", duration: 6.5, delay: 1.1, depth: 1.4 },
  { top: "72%", left: "85%", size: 16, rotate: -30, color: "#8FAE5C", duration: 9, delay: 0.3, depth: 0.9 },
  { top: "40%", left: "4%", size: 14, rotate: 40, color: "#6B8F3C", duration: 7.5, delay: 1.6, depth: 1.8 },
];

/**
 * Leaves drifting around the hero visual: a slow falling/rotating loop,
 * plus mouse parallax driven by the shared spring motion values.
 */
export default function Leaves({ springX, springY, reduce }) {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {LEAVES.map((leaf, i) => (
        <LeafInstance key={i} leaf={leaf} springX={springX} springY={springY} reduce={reduce} />
      ))}
    </div>
  );
}

function LeafInstance({ leaf, springX, springY, reduce }) {
  const parX = useTransform(springX, (v) => v * leaf.depth);
  const parY = useTransform(springY, (v) => v * leaf.depth);

  return (
    <motion.div
      className="absolute"
      style={{ top: leaf.top, left: leaf.left, x: parX, y: parY, color: leaf.color }}
      initial={false}
      animate={
        reduce
          ? undefined
          : {
              y: [0, 14, 0],
              rotate: [leaf.rotate - 6, leaf.rotate + 6, leaf.rotate - 6],
            }
      }
      transition={{
        duration: leaf.duration,
        delay: leaf.delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <LeafShape style={{ width: leaf.size, opacity: 0.55 }} className="drop-shadow-sm" />
    </motion.div>
  );
}
