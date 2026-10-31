import { motion, useTransform } from "framer-motion";
import { ArrowRight, Sprout } from "lucide-react";

const EASE_SPRING = { type: "spring", stiffness: 90, damping: 14 };

/**
 * A tilted, full-bleed editorial story card. Three nested layers keep the
 * animations from fighting each other:
 *  1. outer  -> mouse parallax (x/y driven by shared spring motion values)
 *  2. middle -> one-time entrance (fly in + 3D tilt + scale)
 *  3. inner  -> continuous float/wobble loop + hover response
 */
export default function FloatingCard({
  data,
  rotate = 0,
  depth = 0,
  floatDuration = 6,
  floatDelay = 0,
  driftX = 0,
  entranceDelay = 0,
  entranceFrom = { x: 0, y: 0 },
  springX,
  springY,
  reduce,
  mobile = false,
  onOpen,
}) {
  const parX = useTransform(springX, (v) => v * depth);
  const parY = useTransform(springY, (v) => v * depth);

  return (
    <motion.div style={mobile ? undefined : { x: parX, y: parY }}>
      <motion.div
        initial={
          reduce
            ? false
            : {
                opacity: 0,
                scale: 0.9,
                x: entranceFrom.x,
                y: entranceFrom.y,
                rotateX: 18,
                rotateY: entranceFrom.x < 0 ? -22 : 22,
              }
        }
        animate={{ opacity: 1, scale: 1, x: 0, y: 0, rotateX: 0, rotateY: 0 }}
        transition={{ ...EASE_SPRING, delay: reduce ? 0 : entranceDelay }}
        style={{ perspective: 800 }}
      >
        <motion.button
          type="button"
          onClick={() => onOpen?.(data)}
          aria-haspopup="dialog"
          aria-label={`${data.title} — read full story`}
          className={`group relative block aspect-[3/4] overflow-hidden rounded-[22px] bg-[#271719] text-left shadow-[0_20px_40px_-16px_rgba(34,34,34,0.4)] transition-shadow duration-300 hover:shadow-[0_24px_48px_-12px_rgba(128,24,33,0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amir ${
            mobile ? "w-[165px] shrink-0 snap-center" : "w-[150px] md:w-[175px] lg:w-[205px]"
          }`}
          animate={
            reduce || mobile
              ? undefined
              : {
                  y: [0, -10, 0],
                  x: [0, driftX, 0],
                  rotate: [rotate - 1.2, rotate + 1.2, rotate - 1.2],
                }
          }
          transition={
            reduce || mobile
              ? undefined
              : { duration: floatDuration, delay: floatDelay, repeat: Infinity, ease: "easeInOut" }
          }
          whileHover={
            reduce
              ? undefined
              : { rotate: 0, scale: 1.05, y: -6, transition: { duration: 0.35, ease: "easeOut" } }
          }
          style={!mobile && !reduce ? undefined : { rotate: mobile ? 0 : rotate }}
        >
          {/* Full-cover image (or brand-tone placeholder) */}
          {data.image ? (
            <img
              src={data.image}
              alt={data.alt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#801821] via-[#5c1019] to-[#271719] transition-transform duration-700 group-hover:scale-110">
              <Sprout className="h-12 w-12 text-white/20" strokeWidth={1.25} />
            </div>
          )}

          {/* Legibility gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/5" />

          {/* Category pill */}
          <span className="absolute left-2.5 top-2.5 inline-flex items-center rounded-full bg-white/95 px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.14em] text-[#801821] shadow-sm">
            {data.tag}
          </span>

          {/* Title + CTA */}
          <div className="absolute inset-x-0 bottom-0 p-3 lg:p-3.5">
            <h3 className="font-seasons text-[13.5px] font-semibold leading-tight text-white line-clamp-2 lg:text-[15px]">
              {data.title}
            </h3>
            <p className="mt-1 line-clamp-1 text-[10.5px] leading-relaxed text-white/75">
              {data.description}
            </p>

            <div className="mt-2 flex items-center gap-1.5">
              <span className="text-[8px] font-bold uppercase tracking-[0.12em] text-white">
                Read Full Story
              </span>
              <span className="h-px flex-1 bg-white/30" />
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amir text-white transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </div>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
