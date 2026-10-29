import { useCallback, useEffect, useRef, useState } from "react";
import "./CreatorVideoCarousel.css";

/* Editable card data — swap `src` to replace a video. */
const CARDS = [
  {
    id: "creator-01",
    src: "/videos/creators/creator-01.mp4",
    label: "Creator video 1",
  },
  {
    id: "creator-02",
    src: "/videos/creators/creator-02.mp4",
    label: "Creator video 2",
  },
  {
    id: "creator-03",
    src: "/videos/creators/creator-03.mp4",
    label: "Creator video 3",
  },
];

const CENTER_INDEX = 1;

export default function CreatorVideoCarousel() {
  const [slots, setSlots] = useState({
    left: 0,
    center: CENTER_INDEX,
    right: 2,
  });
  const [needsTap, setNeedsTap] = useState(false);
  const [muted, setMuted] = useState(true);
  const [errored, setErrored] = useState({});
  const videoRefs = useRef([]);

  const slotOf = useCallback(
    (index) => {
      if (slots.center === index) return "center";
      if (slots.left === index) return "left";
      return "right";
    },
    [slots]
  );

  const select = useCallback(
    (index) => {
      setSlots((current) => {
        if (current.center === index) return current;
        if (current.left === index) {
          return { left: current.center, center: current.left, right: current.right };
        }
        if (current.right === index) {
          return { left: current.left, center: current.right, right: current.center };
        }
        return current;
      });
    },
    []
  );

  useEffect(() => {
    setNeedsTap(false);

    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (index === slots.center) {
        video.muted = muted;
        const playback = video.play();
        if (playback && typeof playback.catch === "function") {
          playback.catch(() => {
            video.muted = true;
            setMuted(true);
            video.play().catch(() => setNeedsTap(true));
          });
        }
      } else {
        video.muted = true;
        video.pause();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slots.center]);

  useEffect(() => {
    const video = videoRefs.current[slots.center];
    if (video) video.muted = muted;
  }, [muted, slots.center]);

  const handleTapToPlay = (event) => {
    event.stopPropagation();
    const video = videoRefs.current[slots.center];
    if (!video) return;
    video.muted = muted;
    video.play().then(() => setNeedsTap(false)).catch(() => setNeedsTap(true));
  };

  const toggleMute = (event) => {
    event.stopPropagation();
    setMuted((current) => !current);
  };

  const goPrev = (event) => {
    event.stopPropagation();
    select(slots.left);
  };
  const goNext = (event) => {
    event.stopPropagation();
    select(slots.right);
  };

  return (
    <section className="cvc-section" aria-labelledby="creator-carousel-heading">
      <div className="cvc-head">
        <p id="creator-carousel-heading" className="cvc-heading">
          Real people. Real love for Amir.
        </p>
      </div>

      <div className="cvc-stage">
        {CARDS.map((card, index) => {
          const slot = slotOf(index);
          const isCenter = slot === "center";

          return (
            <div
              key={card.id}
              data-slot={slot}
              className="cvc-card"
              aria-label={card.label}
            >
              <div className="cvc-card__media">
                {errored[card.id] ? (
                  <div className="cvc-card__fallback">
                    <span>Video coming soon</span>
                  </div>
                ) : (
                  <video
                    ref={(el) => {
                      videoRefs.current[index] = el;
                    }}
                    src={card.src}
                    muted={!isCenter || muted}
                    loop
                    playsInline
                    preload="metadata"
                    onError={() =>
                      setErrored((current) => ({ ...current, [card.id]: true }))
                    }
                  />
                )}
              </div>

              {isCenter && needsTap && !errored[card.id] && (
                <button
                  type="button"
                  className="cvc-card__play"
                  onClick={handleTapToPlay}
                  aria-label="Play video"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              )}

              {isCenter && (
                <>
                  <button
                    type="button"
                    className="cvc-card__nav cvc-card__nav--prev"
                    onClick={goPrev}
                    aria-label="Show previous video"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 6l-6 6 6 6" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="cvc-card__nav cvc-card__nav--next"
                    onClick={goNext}
                    aria-label="Show next video"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 6l6 6-6 6" />
                    </svg>
                  </button>

                  {!errored[card.id] && (
                    <button
                      type="button"
                      className="cvc-card__sound"
                      onClick={toggleMute}
                      aria-label={muted ? "Unmute video" : "Mute video"}
                      aria-pressed={!muted}
                    >
                      {muted ? (
                        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M16.5 12a4.5 4.5 0 0 0-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.42.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.63l1.51 1.51A8.94 8.94 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 0 0 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4 9.91 6.09 12 8.18V4z" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05A4.5 4.5 0 0 0 16.5 12zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                        </svg>
                      )}
                    </button>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
