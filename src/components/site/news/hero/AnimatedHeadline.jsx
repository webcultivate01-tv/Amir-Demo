
import { motion } from "framer-motion";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];
const LETTER_STAGGER = 0.022;

/* Preserve the original upward letter-reveal animation */
function Letter({ char, delay, reduce }) {
  if (char === " ") {
    return <span className="inline-block">&nbsp;</span>;
  }

  return (
    <span className="inline-block align-baseline">
      <span className="inline-block overflow-hidden align-bottom">
        <motion.span
          className="inline-block"
          initial={reduce ? false : { y: "110%" }}
          animate={{ y: "0%" }}
          transition={{
            duration: 0.55,
            ease: EASE_OUT_EXPO,
            delay: reduce ? 0 : delay,
          }}
        >
          {char}
        </motion.span>
      </span>
    </span>
  );
}

export default function AnimatedHeadline({
  lineOne,
  lineTwo,
  reduce,
  className = "",
}) {
  const oneChars = lineOne.split("");
  const twoChars = lineTwo.split("");

  return (
    <h1
      className={`font-seasons font-medium leading-[1.3] tracking-[-0.01em] text-[clamp(1.9rem,3.4vw,3.15rem)] ${className}`}
    >
      <span className="mx-auto block w-fit max-w-full px-[0.12em] text-center sm:whitespace-nowrap">
        <span className="text-[#222]">
          {oneChars.map((char, i) => (
            <Letter
              key={`one-${i}`}
              char={char}
              delay={i * LETTER_STAGGER}
              reduce={reduce}
            />
          ))}
        </span>{" "}

        <span className="inline-block overflow-visible pb-[0.08em] font-medium not-italic text-amir">
          {twoChars.map((char, i) => (
            <Letter
              key={`two-${i}`}
              char={char}
              delay={(oneChars.length + i) * LETTER_STAGGER}
              reduce={reduce}
            />
          ))}
        </span>
      </span>
    </h1>
  );
}
