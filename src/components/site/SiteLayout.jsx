import React, { useState, useEffect } from "react";
import { NavLink, Link, Outlet, useLocation } from "react-router-dom";

import amirNavbarLogo from "../../../images/amir-seal-of-trust.png";
import amirFooterLogo from "../../../images/amir-wordmark-white.png";
import iraLogo from "../../../images/ira-logo.png";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About Us" },
  { to: "/catalog", label: "Products" },
  { to: "/news", label: "News & Media" },
  { to: "/contact", label: "Contact Us" },
];

const SiteLayout = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#271719]">

      {/* ==============================
          HEADER / NAVBAR
      =============================== */}

      <header className="sticky top-0 z-50 bg-white border-b border-[#271719]/10 shadow-sm">

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

          <div className="h-[82px] grid grid-cols-3 md:grid-cols-[auto_1fr_auto] md:gap-6 items-center">

            {/* =========================
                LEFT - LOGO
            ========================== */}

            <div className="flex items-center justify-start">

              <Link
                to="/"
                className="flex items-center"
                aria-label="Amir 2.0 Home"
              >
                <img
                  src={amirNavbarLogo}
                  alt="Amir 2.0"
                  className="h-[62px] sm:h-[68px] w-auto object-contain ml-2 sm:ml-0"
                />
              </Link>

            </div>


            {/* =========================
                CENTER - NAVIGATION
            ========================== */}

            <nav className="hidden md:flex items-center justify-center gap-5 lg:gap-9 whitespace-nowrap">

              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `text-[15px] font-semibold tracking-wide transition-colors duration-200 ${
                      isActive
                        ? "text-[#EC1F36]"
                        : "text-[#271719] hover:text-[#EC1F36]"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

            </nav>


            {/* =========================
                RIGHT - CTA
            ========================== */}

            <div className="hidden md:flex items-center justify-end">

              <Link
                to="/contact"
                className="
                  inline-flex
                  items-center
                  justify-center
                  px-6
                  py-3
                  rounded-md
                  bg-[#EC1F36]
                  text-white
                  text-sm
                  font-semibold
                  tracking-wide
                  whitespace-nowrap
                  transition-all
                  duration-200
                  hover:bg-[#271719]
                  hover:text-white
                  hover:shadow-md
                "
              >
                Contact Now
              </Link>

            </div>


            {/* =========================
                MOBILE MENU BUTTON
            ========================== */}

            <div className="md:hidden flex items-center justify-end col-span-2 mr-2">

              <button
                className="
                  flex
                  items-center
                  justify-center
                  w-10
                  h-10
                  rounded-md
                  border
                  border-[#271719]/20
                  text-[#271719]
                  hover:border-[#EC1F36]
                  hover:text-[#EC1F36]
                  transition
                "
                onClick={() => setOpen((o) => !o)}
                aria-label="Toggle navigation menu"
                aria-expanded={open}
              >

                {open ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 6l12 12M18 6L6 18"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}

              </button>

            </div>

          </div>

        </div>


        {/* ==============================
            MOBILE NAVIGATION
        =============================== */}

        {/* Backdrop */}
        <div
          onClick={() => setOpen(false)}
          aria-hidden="true"
          className={`md:hidden fixed inset-0 z-40 bg-[#271719]/50 transition-opacity duration-300 ease-in-out ${
            open ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        />

        {/* Sidebar */}
        <aside
          aria-hidden={!open}
          className={`md:hidden fixed top-0 right-0 z-50 h-full w-[80%] max-w-[320px] bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >

          <div className="h-[82px] px-5 flex items-center justify-end border-b border-[#271719]/10">
            <button
              className="flex items-center justify-center w-10 h-10 rounded-md border border-[#271719]/20 text-[#271719] hover:border-[#EC1F36] hover:text-[#EC1F36] transition"
              onClick={() => setOpen(false)}
              aria-label="Close navigation menu"
              tabIndex={open ? 0 : -1}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <nav className="px-5 py-5 flex flex-col gap-1 overflow-y-auto">

            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                tabIndex={open ? 0 : -1}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-md text-sm font-semibold transition ${
                    isActive
                      ? "text-[#EC1F36]"
                      : "text-[#271719] hover:text-[#EC1F36]"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <Link
              to="/contact"
              tabIndex={open ? 0 : -1}
              className="mt-3 w-full text-center px-5 py-3 rounded-md bg-[#EC1F36] text-white text-sm font-semibold hover:bg-[#271719] transition"
            >
              Contact Now
            </Link>

          </nav>

        </aside>

      </header>


      {/* ==============================
          MAIN CONTENT
      =============================== */}

      <main className="flex-1">
        <Outlet />
      </main>


      {/* ==============================
          FOOTER
      =============================== */}

      <footer className="bg-[#271719] text-[#F5EFE6]">

        {/* ==============================
            MAIN FOOTER
        =============================== */}

        <div className="max-w-[1480px] mx-auto px-6 sm:px-10 md:px-14 lg:px-16 py-10 lg:py-11">

          <div className="grid grid-cols-1 md:grid-cols-[1.9fr_0.6fr_0.6fr_1.9fr] gap-10 lg:gap-12">


            {/* =========================
                BRAND
            ========================== */}

            <div>

              <Link
                to="/"
                className="inline-flex items-center"
                aria-label="Amir's Fresh Cut Home"
              >
                <img
                  src={amirFooterLogo}
                  alt="Amir's Fresh Cut"
                  className="h-[84px] w-auto object-contain"
                />
              </Link>

              <p className="mt-3 max-w-[350px] text-[13px] leading-5.5 text-[#F5EFE6]/65">
                Amir | Fresh Protein Market.
                Trusted fresh-protein retailer since 1991, with 580+ stores serving Chicken, Eggs, Mutton, Fish, Seafood and Frozen Foods.
              </p>


              {/* SOCIAL ICONS */}

              <div className="mt-5 flex items-center gap-3">

                {/* Facebook */}

                <a
                  href="https://www.facebook.com/amirchicken.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Amir's Fresh Cut Facebook"
                  className="
                    w-10 h-10
                    rounded-full
                    bg-[#7F1722]/35
                    border border-[#F5EFE6]/10
                    flex items-center justify-center
                    text-[#F5EFE6]
                    hover:bg-[#7F1722]
                    transition-all duration-200
                  "
                >
                  <svg
                    className="w-[15px] h-[15px]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1z" />
                  </svg>
                </a>


                {/* Instagram */}

                <a
                  href="https://www.instagram.com/amirchicken.in/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Amir's Fresh Cut Instagram"
                  className="
                    w-10 h-10
                    rounded-full
                    bg-[#7F1722]/35
                    border border-[#F5EFE6]/10
                    flex items-center justify-center
                    text-[#F5EFE6]
                    hover:bg-[#7F1722]
                    transition-all duration-200
                  "
                >
                  <svg
                    className="w-[15px] h-[15px]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="5"
                    />

                    <circle
                      cx="12"
                      cy="12"
                      r="4"
                    />

                    <circle
                      cx="17.5"
                      cy="6.5"
                      r="1"
                      fill="currentColor"
                      stroke="none"
                    />
                  </svg>
                </a>


                {/* LinkedIn */}

                <a
                  href="https://www.linkedin.com/company/amirchicken/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Amir's Fresh Cut LinkedIn"
                  className="
                    w-10 h-10
                    rounded-full
                    bg-[#7F1722]/35
                    border border-[#F5EFE6]/10
                    flex items-center justify-center
                    text-[#F5EFE6]
                    hover:bg-[#7F1722]
                    transition-all duration-200
                  "
                >
                  <svg
                    className="w-[15px] h-[15px]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4.98 3.5a2.5 2.5 0 11-.01 5 2.5 2.5 0 01.01-5zM3 9.75h4v11.5H3V9.75zm6.5 0h3.83v1.57h.05c.53-1 1.84-2.07 3.78-2.07 4.04 0 4.79 2.66 4.79 6.11v5.89h-4v-5.22c0-1.25-.02-2.85-1.74-2.85-1.74 0-2.01 1.36-2.01 2.76v5.31h-4V9.75z" />
                  </svg>
                </a>


                {/* Email */}

                <a
                  href="mailto:info@amirchicken.in"
                  aria-label="Email Amir's Fresh Cut"
                  className="
                    w-10 h-10
                    rounded-full
                    bg-[#7F1722]/35
                    border border-[#F5EFE6]/10
                    flex items-center justify-center
                    text-[#F5EFE6]
                    hover:bg-[#7F1722]
                    transition-all duration-200
                  "
                >
                  <svg
                    className="w-[15px] h-[15px]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                  >
                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="14"
                      rx="2"
                    />

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 7l9 6 9-6"
                    />
                  </svg>
                </a>

              </div>


              {/* IRA MEMBERSHIP */}

              <div className="mt-5">

                <p className="text-[11px] uppercase tracking-wider text-[#F5EFE6]/50 mb-2">
                  Proud member of
                </p>

                <div className="inline-block rounded-md bg-white px-3 py-1.5">
                  <img
                    src={iraLogo}
                    alt="Indian Retail Alliance"
                    className="h-[34px] w-auto object-contain"
                  />
                </div>

              </div>

            </div>


            {/* =========================
                QUICK LINKS
            ========================== */}

            <div className="grid grid-cols-2 gap-6 md:contents">

            <div>

              <h3 className="text-[16px] font-semibold text-white">
                Quick Links
              </h3>

              <div className="mt-2.5 w-9 h-[2px] bg-[#F5EFE6]/70"></div>

              <ul className="mt-6 space-y-3">

                {links.map((link) => (
                  <li key={link.to}>

                    <Link
                      to={link.to}
                      className="
                        flex items-center gap-2
                        text-[13px]
                        text-[#F5EFE6]/65
                        hover:text-[#F5EFE6]
                        transition-colors duration-200
                      "
                    >
                      <span className="text-[#F5EFE6]/40">
                        &gt;
                      </span>

                      {link.label}

                    </Link>

                  </li>
                ))}

              </ul>

            </div>


            {/* =========================
                OUR RANGE
            ========================== */}

            <div>

              <h3 className="text-[16px] font-semibold text-white">
                Our Range
              </h3>

              <div className="mt-2.5 w-9 h-[2px] bg-[#F5EFE6]/80"></div>

              <ul className="mt-6 space-y-3">

                <li>
                  <Link
                    to="/catalog"
                    className="flex items-center gap-2 text-[13px] text-[#F5EFE6]/65 hover:text-[#F5EFE6] transition-colors duration-200"
                  >
                    <span className="text-[#F5EFE6]/40">
                      &gt;
                    </span>
                    Chicken
                  </Link>
                </li>

                <li>
                  <Link
                    to="/catalog"
                    className="flex items-center gap-2 text-[13px] text-[#F5EFE6]/65 hover:text-[#F5EFE6] transition-colors duration-200"
                  >
                    <span className="text-[#F5EFE6]/40">
                      &gt;
                    </span>
                    Eggs
                  </Link>
                </li>

                <li>
                  <Link
                    to="/catalog"
                    className="flex items-center gap-2 text-[13px] text-[#F5EFE6]/65 hover:text-[#F5EFE6] transition-colors duration-200"
                  >
                    <span className="text-[#F5EFE6]/40">
                      &gt;
                    </span>
                    Mutton
                  </Link>
                </li>

                <li>
                  <Link
                    to="/catalog"
                    className="flex items-center gap-2 text-[13px] text-[#F5EFE6]/65 hover:text-[#F5EFE6] transition-colors duration-200"
                  >
                    <span className="text-[#F5EFE6]/40">
                      &gt;
                    </span>
                    Fish
                  </Link>
                </li>

                <li>
                  <Link
                    to="/catalog"
                    className="flex items-center gap-2 text-[13px] text-[#F5EFE6]/65 hover:text-[#F5EFE6] transition-colors duration-200"
                  >
                    <span className="text-[#F5EFE6]/40">
                      &gt;
                    </span>
                    Seafood
                  </Link>
                </li>

                <li>
                  <Link
                    to="/catalog"
                    className="flex items-center gap-2 text-[13px] text-[#F5EFE6]/65 hover:text-[#F5EFE6] transition-colors duration-200"
                  >
                    <span className="text-[#F5EFE6]/40">
                      &gt;
                    </span>
                    Frozen Foods
                  </Link>
                </li>

              </ul>

            </div>

            </div>


            {/* =========================
                CONTACT
            ========================== */}

            <div>

              <h3 className="text-[16px] font-semibold text-white">
                Contact Us
              </h3>

              <div className="mt-2.5 w-9 h-[2px] bg-[#F5EFE6]/80"></div>


              <div className="mt-5 space-y-3.5">

                {/* ADDRESS */}

                <div className="flex items-start gap-3">

                  <div
                    className="
                      w-8 h-8 shrink-0
                      rounded-full
                      bg-[#7F1722]/35
                      border border-[#F5EFE6]/10
                      flex items-center justify-center
                      text-[#F5EFE6]
                    "
                  >
                    <svg
                      className="w-[14px] h-[14px]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5 7 11 7 11z"
                      />

                      <circle
                        cx="12"
                        cy="10"
                        r="2.2"
                      />
                    </svg>
                  </div>

                  <div>

                    <p className="text-[13px] font-semibold text-white">
                      Address
                    </p>

                    <p className="mt-0.5 text-[12px] leading-5 text-[#F5EFE6]/60">
                      K-507-510, Mega Center, Behind Noble Hospital,
                      Magarpatta Hadapsar, Pune (Head Office)
                    </p>

                  </div>

                </div>


                {/* PHONE */}

                <div className="flex items-start gap-3">

                  <div
                    className="
                      w-8 h-8 shrink-0
                      rounded-full
                      bg-[#7F1722]/35
                      border border-[#F5EFE6]/10
                      flex items-center justify-center
                      text-[#F5EFE6]
                    "
                  >
                    <svg
                      className="w-[14px] h-[14px]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M22 16.92v3a2 2 0 01-2.18 2
                        19.79 19.79 0 01-8.63-3.07
                        19.5 19.5 0 01-6-6
                        19.79 19.79 0 01-3.07-8.67
                        A2 2 0 014.11 2h3
                        a2 2 0 012 1.72
                        12.84 12.84 0 00.7 2.81
                        2 2 0 01-.45 2.11L8.09 9.91
                        a16 16 0 006 6l1.27-1.27
                        a2 2 0 012.11-.45
                        12.84 12.84 0 002.81.7
                        A2 2 0 0122 16.92z"
                      />
                    </svg>
                  </div>

                  <div>

                    <p className="text-[13px] font-semibold text-white">
                      Phone
                    </p>

                    <a
                      href="tel:+919527982525"
                      className="
                        mt-0.5 block
                        text-[12px]
                        text-[#F5EFE6]/60
                        hover:text-[#F5EFE6]
                        transition
                      "
                    >
                      +91 95279 82525
                    </a>

                  </div>

                </div>


                {/* EMAIL */}

                <div className="flex items-start gap-3">

                  <div
                    className="
                      w-8 h-8 shrink-0
                      rounded-full
                      bg-[#7F1722]/35
                      border border-[#F5EFE6]/10
                      flex items-center justify-center
                      text-[#F5EFE6]
                    "
                  >
                    <svg
                      className="w-[14px] h-[14px]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      viewBox="0 0 24 24"
                    >
                      <rect
                        x="3"
                        y="5"
                        width="18"
                        height="14"
                        rx="2"
                      />

                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 7l9 6 9-6"
                      />
                    </svg>
                  </div>

                  <div>

                    <p className="text-[13px] font-semibold text-white">
                      Email
                    </p>

                    <a
                      href="mailto:info@amirchicken.in"
                      className="
                        mt-0.5 block
                        text-[12px]
                        text-[#F5EFE6]/60
                        hover:text-[#F5EFE6]
                        transition
                      "
                    >
                      info@amirchicken.in
                    </a>

                  </div>

                </div>

              </div>


              {/* NEWSLETTER */}

              <div className="mt-6">

                <p className="text-[13px] font-semibold text-white">
                  Subscribe to our newsletter
                </p>

                <form className="mt-3 flex w-full max-w-[600px]">

                  <input
                    type="email"
                    placeholder="Your email"
                    className="
                      flex-1
                      min-w-0
                      h-9
                      rounded-md
                      bg-[#F5EFE6]/10
                      border border-[#F5EFE6]/10
                      px-3
                      text-[12px]
                      text-white
                      placeholder:text-[#F5EFE6]/40
                      outline-none
                      focus:border-[#7F1722]
                    "
                  />

                  <button
                    type="submit"
                    className="
                      ml-2
                      h-9
                      rounded-md
                      bg-[#F5EFE6]
                      px-4
                      text-[12px]
                      font-semibold
                      text-[#271719]
                      hover:bg-[#E8DED2]
                      transition
                    "
                  >
                    Subscribe
                  </button>

                </form>

              </div>

            </div>

          </div>

        </div>


        {/* ==============================
            BOTTOM BAR
        =============================== */}

        <div>

          <div
            className="
              max-w-[1300px]
              mx-auto
              px-6 sm:px-8 lg:px-10
              text-center md:text-left
              border-t border-[#F5EFE6]/10
              py-3.5
              flex
              flex-col
              md:flex-row
              items-center
              justify-between
              gap-3
            "
          >

            {/* LEFT */}

            <div className="flex items-center gap-3">

              <p className="text-[12px] text-[#F5EFE6]/60">
                © {new Date().getFullYear()} Aamir Farms and Foods Limited. All rights reserved.
              </p>

            </div>


            {/* RIGHT */}

            <div
              className="
                flex
                flex-wrap
                items-center
                justify-center
                gap-3
                text-[12px]
                text-[#F5EFE6]/60
              "
            >

              <Link
                to="/privacy-policy"
                className="hover:text-[#F5EFE6] transition"
              >
                Privacy Policy
              </Link>

              <span>|</span>

              <Link
                to="/terms"
                className="hover:text-[#F5EFE6] transition"
              >
                Terms & Conditions
              </Link>

            </div>

          </div>

        </div>

      </footer>

    </div>
  );
};

export default SiteLayout;