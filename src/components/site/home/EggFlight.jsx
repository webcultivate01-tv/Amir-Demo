
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EggIcon } from "./EggIcon";
import "./EggFlight.css";

gsap.registerPlugin(ScrollTrigger);

export default function EggFlight() {
  const eggRef = useRef(null);

  useLayoutEffect(() => {
    const egg = eggRef.current;
    const source = document.getElementById("egg-flight-source");
    const target = document.getElementById("egg-flight-target");
    const featuredSection = document.getElementById(
      "featured-products-section"
    );

    if (!egg || !source || !target || !featuredSection) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      gsap.set(egg, { autoAlpha: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        gsap.set(egg, {
          position: "fixed",
          top: 0,
          left: 0,
          x: 0,
          y: 0,
          width: 40,
          height: 50,
          objectFit: "contain",
          transformOrigin: "center center",
          autoAlpha: 0,
          zIndex: 70,
          pointerEvents: "none",
          force3D: true,
          willChange: "transform, opacity",
        });

        const trigger = ScrollTrigger.create({
          trigger: featuredSection,

          // Match the end of PlateShowcase's pinned timeline.
          start: () => {
            const plateTrigger = ScrollTrigger.getById(
              "plate-showcase-scroll"
            );

            return plateTrigger
              ? plateTrigger.end
              : "top bottom";
          },

          endTrigger: target,
          end: "top 42%",
          scrub: 0.7,
          invalidateOnRefresh: true,

          onUpdate(self) {
            const progress = self.progress;

            // Let the plate timeline control source visibility
            // before the flight starts.
            if (progress <= 0) {
              source.classList.remove("is-flight-hidden");
              gsap.set(egg, { autoAlpha: 0 });
              return;
            }

            // The flying egg has reached its destination.
            if (progress >= 1) {
              source.classList.add("is-flight-hidden");
              gsap.set(egg, { autoAlpha: 0 });
              return;
            }

            // Only play the flight while scrolling top-to-bottom.
            // Scrolling back up hides it instead of reversing it, and
            // keeps the plate overlay from reappearing mid-flight.
            if (self.direction === -1) {
              source.classList.add("is-flight-hidden");
              gsap.set(egg, { autoAlpha: 0 });
              return;
            }

            // Hide the plate overlay while the travelling egg
            // takes over. The CSS class is reversible.
            source.classList.add("is-flight-hidden");

            const sourceRect = source.getBoundingClientRect();
            const targetRect = target.getBoundingClientRect();

            const width = gsap.utils.interpolate(
              sourceRect.width * 0.7,
              targetRect.width,
              progress
            );

            const height = gsap.utils.interpolate(
              sourceRect.height * 0.7,
              targetRect.height,
              progress
            );

            // Interpolate from the source's centre so the egg
            // doesn't jump when it starts at a smaller size.
            const startLeft =
              sourceRect.left + (sourceRect.width - sourceRect.width * 0.7) / 2;
            const startTop =
              sourceRect.top + (sourceRect.height - sourceRect.height * 0.7) / 2;

            const lift = -130 * Math.sin(Math.PI * progress);

            // x/y (transform) instead of left/top so the browser only
            // composites this frame rather than re-laying it out.
            gsap.set(egg, {
              x: gsap.utils.interpolate(
                startLeft,
                targetRect.left + (targetRect.width - width) / 2,
                progress
              ),
              y:
                gsap.utils.interpolate(
                  startTop,
                  targetRect.top + (targetRect.height - height) / 2,
                  progress
                ) + lift,
              width,
              height,
              rotation: 360 * progress,
              autoAlpha:
                progress < 0.08
                  ? progress / 0.08
                  : progress > 0.88
                    ? (1 - progress) / 0.12
                    : 1,
            });
          },

          onLeaveBack() {
            source.classList.remove("is-flight-hidden");
            gsap.set(egg, { autoAlpha: 0 });
          },
        });

        // Recalculate once both scroll animations are registered.
        requestAnimationFrame(() => ScrollTrigger.refresh());

        return () => {
          trigger.kill();
          source.classList.remove("is-flight-hidden");
          gsap.set(egg, { clearProps: "all" });
        };
      });

      return () => mm.revert();
    });

    return () => ctx.revert();
  }, []);

  return (
    <EggIcon
      ref={eggRef}
      className="egg-flight-icon"
      style={{ opacity: 0, visibility: "hidden" }}
      aria-hidden="true"
    />
  );
}
