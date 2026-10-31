/* Faint pencil-sketch rooster, cropped by the viewport edge */
export default function RoosterMark({ className = "" }) {
  return (
    <svg
      viewBox="0 0 480 560"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M148 62 Q159 18 176 58 Q188 14 203 54 Q216 12 230 50" />
      <circle cx="193" cy="112" r="40" />
      <path d="M154 116 L108 124 L154 134 Z" />
      <path d="M172 148 Q160 174 175 186 Q188 174 178 150" />
      <circle cx="202" cy="104" r="3.5" fill="currentColor" stroke="none" />
      <path d="M208 138 C 240 164 256 206 250 256 C 245 318 224 366 229 424" />
      <path d="M228 108 C 274 96 316 112 336 162 C 350 202 334 232 302 252" />
      <path d="M302 232 C 330 196 356 168 380 138" />
      <path d="M302 238 C 332 212 364 190 386 164" />
      <path d="M296 248 C 318 228 344 216 364 202" />
      <path d="M290 254 C 306 242 322 236 334 238" />
      <path d="M224 424 L 215 482" />
      <path d="M200 480 L 215 482 L 228 476" />
      <path d="M238 418 L 248 478" />
      <path d="M236 478 L 248 478 L 259 472" />
    </svg>
  );
}
