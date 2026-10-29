import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./FranchiseNetwork.css";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    number: "01",
    kicker: "Brand Recognition",
    name: "Brand",
    text: "A name families have trusted since 1991.",
    tilt: -5,
    offset: -18,
    image:"/images/franchiseNetwork/brand-recognition.png",
    alt: "Modern retail store interior with branded display lighting",
  },
  {
    number: "02",
    kicker: "Reliable Procurement",
    name: "Supply",
    text: "Consistent supply through centralised sourcing.",
    tilt: 4,
    offset: 22,
    image:"images/franchiseNetwork/reliable-procurement.png",
    alt: "Freight truck on the road carrying fresh stock",
  },
  {
    number: "03",
    kicker: "Tested Retail Formats",
    name: "Retail",
    text: "Hygienic store designs proven across the network.",
    tilt: -3,
    offset: -10,
    image:
      "images/franchiseNetwork/tested-retail-formats.png",
    alt: "Hygienic retail store with organised display shelves",
  },
  {
    number: "04",
    kicker: "Operational Guidance",
    name: "Training",
    text: "Standard practices and hands-on franchise training.",
    tilt: 6,
    offset: 14,
    image:
      "images/franchiseNetwork/operational-guidance.png",
    alt: "Franchise team in a hands-on operational training session",
  },
  {
    number: "05",
    kicker: "Product Diversity",
    name: "Variety",
    text: "Chicken, eggs, mutton, fish, seafood and frozen foods.",
    tilt: -6,
    offset: -24,
    image: "/images/franchiseNetwork/variety.png",
    alt: "Chicken, mutton, fish and eggs laid out together",
  },
  {
    number: "06",
    kicker: "Marketing Support",
    name: "Marketing",
    text: "Visibility and recall built with every partner.",
    tilt: 3,
    offset: 18,
    image:
      "/images/franchiseNetwork/marketing.png",
    alt: "Brand billboard built for visibility and recall",
  },
  {
    number: "07",
    kicker: "Established Customer Trust",
    name: "Trust",
    text: "10 Lakh+ loyal customers who already know the Amir name.",
    tilt: -4,
    offset: -8,
    image:
      "/images/franchiseNetwork/customerTrust.png",
    alt: "Two partners shaking hands over a trusted deal",
  },
];

export default function FranchiseNetwork() {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const bgWordRef = useRef(null);
  const ctaRef = useRef(null);
  const cursorRef = useRef(null);
  const [flippedCard, setFlippedCard] = useState(null);

  const handleCardTap = (number) => {
    if (!window.matchMedia("(hover: none), (pointer: coarse)").matches) {
      return;
    }
    setFlippedCard((current) => (current === number ? null : number));
  };

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!section || !viewport || !track) return undefined;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          fullMotion: "(prefers-reduced-motion: no-preference)",
          isMobile: "(max-width: 767px)",
        },
        (context) => {
          const { reduceMotion, isMobile } = context.conditions;
          if (reduceMotion) return undefined;

          const getDistance = () =>
            Math.max(0, track.scrollWidth - viewport.clientWidth);

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: isMobile ? "center center" : "top top",
              end: () => "+=" + getDistance(),
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          tl.to(
            track,
            { x: () => -getDistance(), ease: "none", duration: 10 },
            0
          );

          if (bgWordRef.current) {
            tl.to(
              bgWordRef.current,
              {
                x: () => -getDistance() * 0.3,
                ease: "none",
                duration: 10,
              },
              0
            );
          }

          if (ctaRef.current) {
            tl.fromTo(
              ctaRef.current,
              { scale: 0.82, autoAlpha: 0.65 },
              {
                scale: 1,
                autoAlpha: 1,
                ease: "power2.out",
                duration: 2,
              },
              8
            );
          }

          return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
          };
        }
      );

      return () => mm.revert();
    }, section);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    const resizeObserver = new ResizeObserver(refresh);
    resizeObserver.observe(track);

    return () => {
      ctx.revert();
      window.removeEventListener("load", refresh);
      resizeObserver.disconnect();
    };
  }, []);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const cursor = cursorRef.current;

    if (!viewport || !cursor) return undefined;
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) {
      return undefined;
    }

    const moveX = gsap.quickTo(cursor, "x", { duration: 0.3, ease: "power3" });
    const moveY = gsap.quickTo(cursor, "y", { duration: 0.3, ease: "power3" });

    const handleMove = (event) => {
      moveX(event.clientX);
      moveY(event.clientY);
    };

    const showCursor = () => cursor.classList.add("is-visible");
    const hideCursor = () => cursor.classList.remove("is-visible");

    viewport.addEventListener("pointermove", handleMove);

    const cards = viewport.querySelectorAll(".franchise-card");
    cards.forEach((card) => {
      card.addEventListener("pointerenter", showCursor);
      card.addEventListener("pointerleave", hideCursor);
    });

    return () => {
      viewport.removeEventListener("pointermove", handleMove);
      cards.forEach((card) => {
        card.removeEventListener("pointerenter", showCursor);
        card.removeEventListener("pointerleave", hideCursor);
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="franchise-network"
      aria-labelledby="franchise-heading"
      className="franchise-scroll"
    >
      <div className="franchise-scroll__inner">
        <div
          ref={bgWordRef}
          aria-hidden="true"
          className="franchise-scroll__bgword"
        >
          AMIR&rsquo;S FRESH CUT
        </div>

        <header className="franchise-scroll__header">
          <p className="franchise-scroll__eyebrow">
            AMIR&rsquo;S FRANCHISE NETWORK
          </p>
          <h2 id="franchise-heading" className="franchise-scroll__heading">
            BUILT TO GROW.
          </h2>
        </header>

        <div ref={viewportRef} className="franchise-scroll__viewport">
          <div ref={trackRef} className="franchise-scroll__track">
            {pillars.map((pillar) => (
              <article
                key={pillar.number}
                className={
                  "franchise-card" +
                  (flippedCard === pillar.number ? " is-flipped" : "")
                }
                style={{ "--tilt": `${pillar.tilt}deg`, "--offset": `${pillar.offset}px` }}
                tabIndex={0}
                onClick={() => handleCardTap(pillar.number)}
              >
                <div className="franchise-card__inner">
                  <div className="franchise-card__face franchise-card__face--front">
                    <div className="franchise-card__frame">
                      <img
                        src={pillar.image}
                        alt={pillar.alt}
                        loading="lazy"
                        className="franchise-card__image"
                      />
                      <div className="franchise-card__gradient" aria-hidden="true" />
                    </div>

                    <span className="franchise-card__badge" aria-hidden="true">
                      {pillar.number}
                    </span>

                    <div className="franchise-card__copy">
                      <span className="franchise-card__kicker">
                        {pillar.kicker}
                      </span>
                      <h3 className="franchise-card__name">{pillar.name}</h3>
                    </div>
                  </div>

                  <div className="franchise-card__face franchise-card__face--back">
                    <img
                      src={pillar.image}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="franchise-card__back-image"
                    />
                    <div className="franchise-card__back-overlay" aria-hidden="true" />

                    <div className="franchise-card__back-content">
                      <span className="franchise-card__back-number" aria-hidden="true">
                        {pillar.number}
                      </span>
                      <h3 className="franchise-card__back-title">
                        {pillar.kicker}
                      </h3>
                      <p className="franchise-card__back-text">{pillar.text}</p>
                      <Link
                        to="/contact"
                        className="franchise-card__back-btn"
                        onClick={(event) => event.stopPropagation()}
                      >
                        Contact Us
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}

            <Link
              ref={ctaRef}
              to="/contact"
              className="franchise-scroll__cta"
            >
              Become A Partner
              <span className="franchise-scroll__cta-arrow" aria-hidden="true">
                &rarr;
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div ref={cursorRef} className="franchise-scroll__cursor" aria-hidden="true" />
    </section>
  );
}
