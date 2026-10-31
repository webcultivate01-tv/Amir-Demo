
import { useState } from "react";
import axios from "axios";
import { motion, useReducedMotion } from "framer-motion";
import {
  Mail,
  Lock,
  ArrowRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import { serverUrl } from "../../../App";
import envelopeImg from "../../../../images/newsmedia/NewsletterEnvelope.png";

const EASE = [0.22, 1, 0.36, 1];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const textSlideIn = {
  hidden: { opacity: 0, y: 36, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const imageIn = {
  hidden: { opacity: 0, y: 44, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export default function Newsletter() {
  const reduce = useReducedMotion();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);

    if (status !== "idle") {
      setStatus("idle");
      setFeedback("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = email.trim();

    if (!EMAIL_RE.test(trimmed)) {
      setStatus("error");
      setFeedback("Enter a valid email address.");
      return;
    }

    setStatus("loading");

    try {
      const res = await axios.post(`${serverUrl}/api/newsletter`, {
        email: trimmed,
      });

      setStatus("success");
      setFeedback(res.data?.message || "You're subscribed!");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setFeedback(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
  };

  return (
    <section className="relative overflow-hidden bg-white px-6 py-12 sm:px-10 lg:px-16 lg:py-16">
      {/* Soft background accent */}
      <div className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[#801821]/[0.06] blur-3xl" />

      <div className="relative mx-auto grid max-w-[1480px] items-center gap-8 lg:grid-cols-2 lg:gap-16">
        {/* Newsletter content */}
        <motion.div
          initial={reduce ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          transition={{ staggerChildren: 0.22, delayChildren: 0.1 }}
          className="pl-1 sm:pl-2 lg:pl-8 xl:pl-14"
        >
          <motion.div
            variants={textSlideIn}
            transition={{ duration: 1, ease: EASE }}
            className="flex items-center gap-4"
          >
            <span className="h-px w-[52px] bg-[#EC1F36]/40" />
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#EC1F36]">
              Stay Updated
            </p>
          </motion.div>

          <motion.h2
            variants={textSlideIn}
            transition={{ duration: 1.2, ease: EASE }}
            className="mt-6 max-w-xl font-seasons font-medium leading-[1.08] tracking-[-0.01em] text-[clamp(2.1rem,3.4vw,3.6rem)] text-[#222]"
          >
            Discover the People, Passion, and Stories Behind{" "}
            <span className="italic text-amir">
              Amir&apos;s Fresh Cut
            </span>
          </motion.h2>

          <motion.p
            variants={textSlideIn}
            transition={{ duration: 1.2, ease: EASE }}
            className="mt-5 max-w-md font-sans text-base leading-7 text-neutral-500"
          >
            Get the latest updates, fresh stories and behind-the-scenes from
            Amir&apos;s Fresh Cut.
          </motion.p>

          {/* Compact, highlighted subscription bar */}
          <motion.form
            variants={textSlideIn}
            transition={{ duration: 1.2, ease: EASE }}
            onSubmit={handleSubmit}
            noValidate
            className="mt-8 w-full max-w-[540px]"
          >
            <div
              className={`
                group relative flex min-h-[66px] w-full items-center
                gap-2 rounded-full border-2
                bg-gradient-to-r from-[#FFF0F1] via-white to-[#FFF5F5]
                p-[5px] pl-4 sm:pl-5
                shadow-[0_0_0_3px_rgba(236,31,54,0.05),0_9px_24px_-10px_rgba(236,31,54,0.20)]
                transition-all duration-300
                hover:border-[#EC1F36]/60
                hover:shadow-[0_0_0_4px_rgba(236,31,54,0.08),0_12px_28px_-10px_rgba(236,31,54,0.25)]
                focus-within:border-[#EC1F36]
                focus-within:shadow-[0_0_0_4px_rgba(236,31,54,0.11),0_12px_28px_-10px_rgba(236,31,54,0.22)]
                ${
                  status === "error"
                    ? "border-[#EC1F36] bg-[#FFF0F1]"
                    : "border-[#EC1F36]/30"
                }
              `}
            >
              <Mail className="h-[18px] w-[18px] shrink-0 text-[#EC1F36]/75 sm:h-5 sm:w-5" />

              <input
                type="email"
                value={email}
                onChange={handleChange}
                placeholder="Enter your email address"
                aria-label="Email address"
                aria-invalid={status === "error"}
                className="h-10 min-w-0 flex-1 bg-transparent text-sm font-medium text-[#222] outline-none placeholder:font-normal placeholder:text-neutral-500 sm:text-[15px]"
              />

              {/* Raised Subscribe button */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="
                  group/button relative inline-flex h-[48px] shrink-0
                  items-center justify-center gap-2
                  rounded-full border border-white/30
                  bg-[#EC1F36] px-4
                  text-sm font-bold text-white
                  shadow-[0_3px_0_#A91224,0_6px_13px_rgba(236,31,54,0.26)]
                  transition-all duration-300 ease-out
                  hover:-translate-y-0.5
                  hover:bg-[#D91830]
                  hover:shadow-[0_4px_0_#A91224,0_9px_18px_rgba(236,31,54,0.35)]
                  active:translate-y-[2px]
                  active:shadow-[0_1px_0_#A91224,0_3px_7px_rgba(236,31,54,0.18)]
                  focus-visible:outline-none
                  focus-visible:ring-4
                  focus-visible:ring-[#EC1F36]/25
                  disabled:cursor-not-allowed
                  disabled:opacity-70
                  sm:h-[50px] sm:gap-2.5 sm:px-6
                "
              >
                {status === "loading" ? (
                  <>
                    <span>Subscribing</span>
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" />
                  </>
                )}
              </button>
            </div>

            {/* Form feedback */}
            <div className="mt-3 min-h-[20px]" aria-live="polite">
              {status === "success" && (
                <p className="flex items-center gap-1.5 text-[13px] font-medium text-emerald-700">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                  {feedback}
                </p>
              )}

              {status === "error" && (
                <p className="flex items-center gap-1.5 text-[13px] font-medium text-[#EC1F36]">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  {feedback}
                </p>
              )}

              {status === "idle" && (
                <p className="flex items-center gap-1.5 text-[13px] text-neutral-500">
                  <Lock className="h-3 w-3 shrink-0" />
                  We respect your privacy. Your information is safe with us.
                </p>
              )}
            </div>
          </motion.form>
        </motion.div>

        {/* Newsletter envelope image */}
        <motion.div
          initial={reduce ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={imageIn}
          transition={{
            duration: 1.3,
            delay: reduce ? 0 : 0.3,
            ease: EASE,
          }}
          className="relative mx-auto flex h-[260px] w-full items-center justify-center sm:h-[330px] lg:h-[400px] xl:h-[440px]"
        >
          <img
            src={envelopeImg}
            alt="Amir's Fresh Cut newsletter envelope"
            loading="lazy"
            className="h-full w-full object-contain"
          />
        </motion.div>
      </div>
    </section>
  );
}
