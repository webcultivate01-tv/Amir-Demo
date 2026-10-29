import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Hen3D from "../../components/site/Hen3D";

const ArrowIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="h-4 w-4"
  >
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

const LocationIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-5 w-5"
  >
    <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

const PhoneIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-5 w-5"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z" />
  </svg>
);

const MailIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-5 w-5"
  >
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-[18px] w-[18px]"
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
  </svg>
);

const FacebookIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-[18px] w-[18px]"
  >
    <path d="M14 8h3V4h-3c-3.31 0-5 1.69-5 5v3H6v4h3v4h4v-4h3l1-4h-4V9c0-.67.33-1 1-1Z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-[18px] w-[18px]"
  >
    <path d="M4.98 3.5a2.5 2.5 0 1 1-.01 5 2.5 2.5 0 0 1 .01-5ZM3 9.75h4v11.5H3V9.75Zm6.5 0h3.83v1.57h.05c.53-1 1.84-2.07 3.78-2.07 4.04 0 4.79 2.66 4.79 6.11v5.89h-4v-5.22c0-1.25-.02-2.85-1.74-2.85-1.74 0-2.01 1.36-2.01 2.76v5.31h-4V9.75Z" />
  </svg>
);

const contactInfo = [
  {
    label: "Visit us",
    value: "K-507-510, Mega Center, Behind Noble Hospital, Magarpatta Hadapsar, Pune (Head Office)",
    icon: <LocationIcon />,
  },
  {
    label: "Call us",
    value: "+91 95279 82525",
    icon: <PhoneIcon />,
  },
  {
    label: "Email us",
    value: "info@amirchicken.in",
    icon: <MailIcon />,
  },
];

const ctaItem = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// Same grey -> solid word-by-word highlight as the home page BrandStatement,
// triggered on load (the hero is already in view) instead of on scroll.
function HighlightWords({ text, activeColor, startIndex = 0 }) {
  const words = text.split(/\s+/);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timers = words.map((_, i) =>
      setTimeout(() => setActive(i + 1), 400 + (startIndex + i) * 260)
    );
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return words.map((word, i) => (
    <span
      key={i}
      style={{
        color: i < active ? activeColor : "#C7C7C7",
        transition: "color 1.4s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {word}
      {i < words.length - 1 ? " " : ""}
    </span>
  ));
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white text-[#171719]">

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden px-5 pt-16 pb-6 sm:px-8 lg:px-12 lg:pt-24 lg:pb-8">
        {/* Hero background: soft red swooshes + thin arc lines */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 1813 760"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, #000 0%, #000 55%, transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, #000 0%, #000 55%, transparent 100%)",
          }}
        >
          <defs>
            <linearGradient id="heroLeftFill" x1="0" y1="1" x2="0.7" y2="0.2">
              <stop offset="0%" stopColor="#EC1F36" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#EC1F36" stopOpacity="0.03" />
            </linearGradient>
            <linearGradient id="heroRightFill" x1="0" y1="1" x2="1" y2="0.4">
              <stop offset="0%" stopColor="#EC1F36" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#EC1F36" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="heroBand" x1="0" y1="1" x2="1" y2="0.2">
              <stop offset="0%" stopColor="#EC1F36" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#EC1F36" stopOpacity="0.14" />
            </linearGradient>
          </defs>

          {/* left: pink area outside a big sweeping arc */}
          <path
            d="M0 0 L140 0 C150 300 360 570 740 760 L0 760 Z"
            fill="url(#heroLeftFill)"
          />

          {/* right: large soft lobe */}
          <path
            d="M1390 0 L1813 0 L1813 760 L1170 760 C1330 650 1690 560 1683 420 C1680 250 1550 90 1390 0 Z"
            fill="url(#heroRightFill)"
          />

          {/* right: darker ribbon sweeping up from bottom */}
          <path
            d="M1170 760 C1340 600 1660 530 1813 330 L1813 480 C1700 610 1500 690 1340 760 Z"
            fill="url(#heroBand)"
          />
        </svg>

        <motion.div
          className="relative mx-auto flex max-w-[1280px] flex-col items-center px-2 text-center sm:px-6 lg:px-10"
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.15 }}
        >
          <motion.p
            variants={ctaItem}
            className="rounded-full bg-[#EC1F36]/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.18em] text-[#EC1F36]"
          >
            Contact AMIR
          </motion.p>

          <motion.h1
            variants={ctaItem}
            className="mt-6 text-5xl font-semibold leading-[1] tracking-[-0.045em] sm:text-6xl lg:whitespace-nowrap lg:text-7xl xl:text-[6rem]"
          >
            <HighlightWords text="Get in touch" activeColor="#171719" />{" "}
            <HighlightWords
              text="with us."
              activeColor="#EC1F36"
              startIndex={3}
            />
          </motion.h1>

          <motion.p
            variants={ctaItem}
            className="mt-8 max-w-2xl text-lg leading-8 text-neutral-600"
          >
            Product enquiry, bulk or institutional requirement, or a franchise
            conversation — talk to the AMIR team directly and we’ll take it
            from there.
          </motion.p>

          <motion.div variants={ctaItem} className="mt-9 flex flex-wrap justify-center gap-5 sm:gap-6">
            <a
              href="tel:+919527982525"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#171719] py-3 pl-6 pr-3 text-sm font-semibold text-white"
            >
              <span
                aria-hidden="true"
                className="absolute left-0 top-1/2 h-[320%] w-[230%] origin-left -translate-y-1/2 scale-x-0 rounded-full bg-[#EC1F36] transition-transform duration-700 ease-in-out group-hover:scale-x-100"
              />
              <span className="relative">Call +91 95279 82525</span>
              <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#171719] transition-transform duration-300 group-hover:translate-x-1">
                <ArrowIcon />
              </span>
            </a>

            <a
              href="mailto:info@amirchicken.in"
              className="inline-flex items-center rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold text-[#171719] transition hover:border-[#171719] hover:bg-[#171719] hover:text-white"
            >
              Email us
            </a>
          </motion.div>
        </motion.div>
      </section>


      {/* ================= CONTACT SECTION ================= */}
      <section className="px-5 py-6 sm:px-8 lg:px-12 lg:py-8">
        <div className="mx-auto max-w-[1280px] px-2 sm:px-6 lg:px-10">

          <div className="grid gap-12 py-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:py-12">

            {/* ================= LEFT CONTENT ================= */}
            <motion.div
              className="order-2 flex flex-col justify-start lg:order-1 lg:pt-9"
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >

              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#EC1F36]">
                Contact Information
              </p>

              <h2 className="mt-4 max-w-lg text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-4xl">
                Reach us <span className="text-[#EC1F36]">directly.</span>
              </h2>

              <p className="mt-5 max-w-md text-base leading-7 text-neutral-600">
                Have a question, product enquiry, bulk requirement or simply
                want to know more about AMIR? Send us a message and our team
                will get back to you.
              </p>

              {/* CONTACT INFORMATION */}
              <div className="mt-10 space-y-6">

                {contactInfo.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start gap-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EC1F36]/10 text-[#EC1F36]">
                      {item.icon}
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-400">
                        {item.label}
                      </p>

                      <p className="mt-1 max-w-sm text-sm font-medium leading-6">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}

              </div>

              {/* SOCIAL LINKS */}
              <div className="mt-10">

                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-neutral-400">
                  Follow us
                </p>

                <div className="flex gap-2">

                  <a
                    href="https://www.instagram.com/amirchicken.in/?hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-[#171719] transition hover:bg-[#EC1F36] hover:text-white"
                  >
                    <InstagramIcon />
                  </a>

                  <a
                    href="https://www.facebook.com/amirchicken.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-[#171719] transition hover:bg-[#EC1F36] hover:text-white"
                  >
                    <FacebookIcon />
                  </a>

                  <a
                    href="https://www.linkedin.com/company/amirchicken/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-[#171719] transition hover:bg-[#EC1F36] hover:text-white"
                  >
                    <LinkedInIcon />
                  </a>

                </div>

              </div>

            </motion.div>


            {/* ================= FORM ================= */}
            <motion.div
              className="order-1 rounded-[32px] border border-neutral-300 bg-white p-6 shadow-[0_24px_70px_rgba(0,0,0,0.08)] sm:p-8 lg:order-2 lg:p-9"
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >

              <div className="mb-8">

                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#EC1F36]">
                  Get in touch
                </p>

                <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                  Send us a message
                </h2>

                <p className="mt-2 text-sm leading-6 text-neutral-500">
                  Tell us about your requirement and we’ll take it from there.
                </p>

              </div>


              <form id="contact-form" className="space-y-5">

                {/* FULL NAME + MOBILE */}
                <div className="grid gap-5 sm:grid-cols-2">

                  <div>
                    <label
                      htmlFor="fullName"
                      className="mb-2 block text-xs font-medium"
                    >
                      Full Name
                    </label>

                    <input
                      id="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      className="h-12 w-full rounded-full border border-neutral-300 bg-[#EC1F36]/[0.04] px-5 text-sm outline-none transition placeholder:text-neutral-400 focus:border-[#EC1F36] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-xs font-medium"
                    >
                      Mobile Number
                    </label>

                    <input
                      id="phone"
                      type="tel"
                      placeholder="Enter your mobile number"
                      className="h-12 w-full rounded-full border border-neutral-300 bg-[#EC1F36]/[0.04] px-5 text-sm outline-none transition placeholder:text-neutral-400 focus:border-[#EC1F36] focus:bg-white"
                    />
                  </div>

                </div>


                {/* EMAIL + CITY */}
                <div className="grid gap-5 sm:grid-cols-2">

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-xs font-medium"
                    >
                      Email
                    </label>

                    <input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      className="h-12 w-full rounded-full border border-neutral-300 bg-[#EC1F36]/[0.04] px-5 text-sm outline-none transition placeholder:text-neutral-400 focus:border-[#EC1F36] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="city"
                      className="mb-2 block text-xs font-medium"
                    >
                      City
                    </label>

                    <input
                      id="city"
                      type="text"
                      placeholder="Enter your city"
                      className="h-12 w-full rounded-full border border-neutral-300 bg-[#EC1F36]/[0.04] px-5 text-sm outline-none transition placeholder:text-neutral-400 focus:border-[#EC1F36] focus:bg-white"
                    />
                  </div>

                </div>


                {/* ENQUIRY */}
                <div>
                  <label
                    htmlFor="enquiry"
                    className="mb-2 block text-xs font-medium"
                  >
                    What can we help you with?
                  </label>

                  <select
                    id="enquiry"
                    defaultValue="General Enquiry"
                    className="h-12 w-full rounded-full border border-neutral-300 bg-[#EC1F36]/[0.04] px-5 text-sm text-neutral-600 outline-none transition focus:border-[#EC1F36] focus:bg-white"
                  >
                    <option>General Enquiry</option>
                    <option>Bulk / Institutional Order</option>
                    <option>Franchise Enquiry</option>
                    <option>Product Enquiry</option>
                    <option>Other</option>
                  </select>
                </div>


                {/* MESSAGE */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-xs font-medium"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    rows="4"
                    placeholder="Tell us a little about your requirement..."
                    className="w-full resize-none rounded-[22px] border border-neutral-300 bg-[#EC1F36]/[0.04] px-5 py-4 text-sm outline-none transition placeholder:text-neutral-400 focus:border-[#EC1F36] focus:bg-white"
                  />
                </div>


                {/* SUBMIT */}
                <button
                  type="submit"
                  className="group flex w-full items-center justify-between rounded-full bg-[#171719] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#EC1F36]"
                >
                  <span>Send Message</span>

                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#171719] transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowIcon />
                  </span>
                </button>

              </form>

            </motion.div>

          </div>
        </div>
      </section>


      {/* ================= BOTTOM STATEMENT ================= */}
      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">

        <motion.div
          className="mx-auto max-w-[1280px] px-2 sm:px-6 lg:px-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.15 }}
        >

          <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_0.6fr]">
          <div>
          <motion.p
            variants={ctaItem}
            className="text-xs font-semibold uppercase tracking-[0.18em] text-[#EC1F36]"
          >
            AMIR’s Fresh Cut
          </motion.p>

          <motion.h2 variants={ctaItem} className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl lg:text-6xl">
            Have something to ask?
            <span className="text-[#EC1F36]">
              {" "}We’re here to help.
            </span>
          </motion.h2>

          <motion.p variants={ctaItem} className="mt-6 max-w-xl text-base leading-relaxed text-neutral-600 sm:text-lg">
            Bulk orders, custom cuts or institutional supply, tell us what you need and our team will get back to you with the right fresh-cut solution.
          </motion.p>

          <motion.div variants={ctaItem} className="mt-9 flex flex-wrap gap-3">

            <a
              href="#contact-form"
              onClick={(e) => {
                e.preventDefault();
                const f = document.getElementById("contact-form");
                f?.scrollIntoView({ behavior: "smooth", block: "center" });
                f?.querySelector("input")?.focus({ preventScroll: true });
              }}
              className="group inline-flex items-center gap-3 rounded-full bg-[#171719] py-3 pl-6 pr-3 text-sm font-semibold text-white transition hover:bg-[#EC1F36]"
            >
              <span>Become a Franchise Partner</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#171719] transition-transform duration-300 group-hover:translate-x-1">
                <ArrowIcon />
              </span>
            </a>

            <Link
              to="/catalog"
              className="inline-flex items-center rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold text-[#171719] transition hover:border-[#171719] hover:bg-[#171719] hover:text-white"
            >
              Explore Products
            </Link>

          </motion.div>
          </div>

          <motion.div variants={ctaItem}>
            <Hen3D className="mx-auto h-[300px] w-full max-w-[360px] lg:h-[380px]" />
          </motion.div>
          </div>

        </motion.div>

      </section>

    </main>
  );
}
