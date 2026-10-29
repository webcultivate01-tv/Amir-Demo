import React from "react";

/* Fills its parent. Parent supplies size, shape (arch) and overflow-hidden. */
export default function StoryArt({ art, alt = "", className = "" }) {
  const contain = art.fit === "contain";

  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{ background: art.bg }}
    >
      <img
        src={art.src}
        alt={alt}
        loading="lazy"
        decoding="async"
        draggable="false"
        className={
          contain
            ? "h-full w-full object-contain p-[12%] transition-transform duration-700 group-hover:scale-105"
            : "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        }
        style={contain ? undefined : { objectPosition: art.position }}
      />
    </div>
  );
}
