
import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EggIcon } from "./EggIcon";
import "./PlateShowcase.css";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    name: "Fresh Chicken",
    category: "chicken",
    caption: "FRESHNESS, EVERY DAY",
    description:
      "Fresh chicken, carefully handled with quality and hygiene in mind.",
    image: "/images/raw-chicken-plate.png",
  },
  {
    name: "Tender Mutton",
    category: "mutton",
    caption: "QUALITY YOU CAN TRUST",
    description:
      "Quality mutton selected with care for freshness and consistency.",
    image: "/images/raw-mutton-plate.png",
  },
  {
    name: "Fresh Fish",
    category: "fish",
    caption: "FRESH FROM THE WATER",
    description:
      "Fresh fish and seafood, handled with care from selection to your table.",
    image: "/images/fresh-fish-plate.png",
  },
  {
    name: "Farm Fresh Eggs",
    category: "eggs",
    caption: "A DAILY ESSENTIAL",
    description:
      "Fresh eggs for everyday meals and family favourites.",
    image: "/images/fresh-eggs-plate.png",
  },
];

export default function PlateShowcase() {
  const sectionRef = useRef(null);
  const plateRef = useRef(null);
  const imageRefs = useRef([]);
  const textRefs = useRef([]);
  const progressRef = useRef(null);
  const eggOverlayRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const plate = plateRef.current;

    if (!section || !plate) return;

    const ctx = gsap.context(() => {
      const images = imageRefs.current;
      const texts = textRefs.current;

      if (
        images.some((image) => !image) ||
        texts.some((text) => !text) ||
        !eggOverlayRef.current
      ) {
        return;
      }

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      gsap.set(images, { autoAlpha: 0 });
      gsap.set(images[0], { autoAlpha: 1 });

      gsap.set(texts, { autoAlpha: 0, y: 14 });
      gsap.set(texts[0], { autoAlpha: 1, y: 0 });

      gsap.set(eggOverlayRef.current, { autoAlpha: 0 });

      gsap.set(plate, {
        scale: 1.1,
        rotation: 0,
        transformOrigin: "50% 50%",
      });

      if (progressRef.current) {
        gsap.set(progressRef.current, { scaleX: 0 });
      }

      if (reduceMotion) {
        gsap.set(plate, { clearProps: "transform" });
        gsap.set(images, { autoAlpha: 0 });
        gsap.set(images[0], { autoAlpha: 1 });
        gsap.set(texts, { autoAlpha: 1, y: 0 });
        gsap.set(progressRef.current, { scaleX: 1 });
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        // One-time entrance: the plate glides in from the left and the
        // text from the right the first time the section scrolls into view.
        // These wrappers are separate from the scrubbed plate rotation.
        const visual = section.querySelector(".plate-showcase__visual");
        const details = section.querySelector(".plate-showcase__details");

        gsap.set(visual, { xPercent: -40, autoAlpha: 0 });
        gsap.set(details, { xPercent: 40, autoAlpha: 0 });

        const entrance = gsap.timeline({
          defaults: { duration: 1.3, ease: "power3.out" },
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            once: true,
          },
        });

        entrance
          .to(visual, { xPercent: 0, autoAlpha: 1 }, 0)
          .to(details, { xPercent: 0, autoAlpha: 1 }, 0.15);

        const timeline = gsap.timeline({
          defaults: {
            ease: "power2.inOut",
          },
          scrollTrigger: {
            id: "plate-showcase-scroll",
            trigger: section,
            start: "top top+=74",
            end: "+=4400",
            pin: true,
            scrub: 0.7,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Cross-fade the product images and text during scrolling.
        products.slice(1).forEach((product, index) => {
          const previous = index;
          const next = index + 1;
          // Every product holds for 1 unit before the next one
          // takes over, including the first and the last.
          const at = 1 + index * 1.5;

          timeline.to(
            images[previous],
            {
              autoAlpha: 0,
              duration: 0.35,
            },
            at
          );

          timeline.to(
            images[next],
            {
              autoAlpha: 1,
              duration: 0.4,
            },
            at + 0.15
          );

          timeline.to(
            texts[previous],
            {
              autoAlpha: 0,
              y: -12,
              duration: 0.25,
            },
            at
          );

          timeline.fromTo(
            texts[next],
            {
              autoAlpha: 0,
              y: 14,
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.4,
            },
            at + 0.15
          );

          // The eggs plate is last in the sequence — reveal the egg
          // overlay alongside it so it is on screen for the hand-off
          // to the flying-egg animation once this section unpins.
          if (next === products.length - 1) {
            timeline.to(
              eggOverlayRef.current,
              {
                autoAlpha: 1,
                duration: 0.4,
              },
              at + 0.15
            );
          }
        });

        // Measure the product sequence before adding the plate's
        // continuous rotation and scale animation.
        // Pad the end so the last product holds like the others.
        timeline.to({}, { duration: 0.01 }, 1 + (products.length - 1) * 1.5);
        const sequenceDuration = timeline.duration();

        // One complete clockwise rotation during the pinned scroll.
        // The plate also grows as the visitor scrolls.
        timeline.to(
          plate,
          {
            rotation: 180,
            scale: 1.30,
            duration: sequenceDuration,
            ease: "none",
          },
          0
        );

        // Progress bar follows the same scroll sequence.
        if (progressRef.current) {
          timeline.to(
            progressRef.current,
            {
              scaleX: 1,
              duration: sequenceDuration,
              ease: "none",
            },
            0
          );
        }

        return () => {
          entrance.kill();
          timeline.kill();
        };
      });

      // On mobile, products stack in a normal scrolling layout. Each card
      // fades up once, and its plate rotates and scales with scroll.
      mm.add("(max-width: 1023px)", () => {
        const cards = gsap.utils.toArray(
          section.querySelectorAll(".plate-showcase__mobile-list article")
        );

        cards.forEach((card) => {
          const img = card.querySelector("img");
          const items = card.querySelectorAll(
            ".plate-showcase__caption, h3, p, .plate-showcase__link"
          );

          gsap.fromTo(
            img,
            { autoAlpha: 0, scale: 0.85 },
            {
              autoAlpha: 1,
              scale: 1,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                once: true,
              },
            }
          );

          gsap.from(items, {
            autoAlpha: 0,
            y: 24,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 70%",
              once: true,
            },
          });

          gsap.fromTo(
            img,
            { rotation: -40 },
            {
              rotation: 40,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            }
          );
        });
      });

      return () => mm.revert();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="plate-showcase"
      aria-label="Fresh protein products"
    >
      <div className="plate-showcase__inner">
        <div className="plate-showcase__layout">
          <div className="plate-showcase__visual">
            <div
              className="plate-showcase__plate"
              ref={plateRef}
            >
              {products.map((product, index) => (
                <img
                  key={product.name}
                  ref={(element) => {
                    imageRefs.current[index] = element;
                  }}
                  className="plate-showcase__plate-image"
                  src={product.image}
                  alt={product.name}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              ))}

              <div
                id="egg-flight-source"
                ref={eggOverlayRef}
                className="plate-showcase__egg-overlay"
                aria-hidden="true"
              >
                <EggIcon className="plate-showcase__egg-overlay-icon" />
              </div>
            </div>
          </div>

          <div
            className="plate-showcase__details"
            aria-live="polite"
            aria-atomic="true"
          >
            {products.map((product, index) => (
              <article
                key={product.name}
                ref={(element) => {
                  textRefs.current[index] = element;
                }}
                className="plate-showcase__product"
              >
                <span className="plate-showcase__caption">
                  {product.caption}
                </span>

                <h3>{product.name}</h3>

                <p>{product.description}</p>

                <Link
                  to={`/catalog?category=${product.category}`}
                  className="plate-showcase__link"
                >
                  Explore products{" "}
                  <span aria-hidden="true">↗</span>
                </Link>
              </article>
            ))}
          </div>
        </div>

        <footer className="plate-showcase__footer">
          <div className="plate-showcase__progress-track">
            <span
              ref={progressRef}
              className="plate-showcase__progress"
            />
          </div>
        </footer>

        <div className="plate-showcase__mobile-list">
          {products.map((product) => (
            <article key={product.name}>
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
              />

              <span className="plate-showcase__caption">
                {product.caption}
              </span>

              <h3>{product.name}</h3>
              <p>{product.description}</p>

              <Link
                to={`/catalog?category=${product.category}`}
                className="plate-showcase__link"
              >
                Explore products ↗
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
