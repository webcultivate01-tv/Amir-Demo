import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { newsletterCopy } from "../../../../data/newsMagazine";
import { Eyebrow } from "./Ornaments";
import Reveal from "./Reveal";

/* TODO: replace this stub with a real POST to /api/subscribe once the
   backend route exists. Keeping it local avoids a false failure state
   while that endpoint doesn't exist yet. */
const subscribeStub = (payload) =>
  new Promise((resolve) => {
    setTimeout(() => resolve({ ok: true }), 900);
    void payload;
  });

const STATUS = { idle: "idle", loading: "loading", success: "success" };

export default function Newsletter() {
  const [status, setStatus] = useState(STATUS.idle);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [consent, setConsent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("That email address doesn't look right.");
      return;
    }
    if (!consent) {
      setError("Please confirm you're happy to receive emails from us.");
      return;
    }

    setStatus(STATUS.loading);
    await subscribeStub({ email, firstName, consent });
    setStatus(STATUS.success);
  };

  if (status === STATUS.success) {
    return (
      <section aria-labelledby="newsletter-title" className="mag-dark-block bg-mag-accent px-4 py-16 text-center sm:px-6 lg:px-10 lg:py-20">
        <div className="mx-auto flex max-w-[560px] flex-col items-center">
          <CheckCircle2 className="h-12 w-12 text-white" aria-hidden="true" />
          <h2 id="newsletter-title" className="mt-4 font-syne text-[24px] font-bold uppercase text-white">
            You&rsquo;re subscribed
          </h2>
          <p className="mt-2 font-sans text-[15px] text-white/85">
            Thanks{firstName ? `, ${firstName}` : ""} — fresh updates are on their way to {email}.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="newsletter-title" className="mag-dark-block bg-mag-accent px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
      <Reveal className="mx-auto max-w-[640px] text-center">
        <Eyebrow className="justify-center text-white">Newsletter</Eyebrow>
        <h2 id="newsletter-title" className="mt-3 font-syne text-[28px] font-bold uppercase leading-[1.1] text-white sm:text-[36px]">
          {newsletterCopy.heading}
        </h2>
        <p className="mt-4 font-sans text-[15px] leading-7 text-white/85">{newsletterCopy.body}</p>

        <form onSubmit={handleSubmit} noValidate className="mx-auto mt-8 max-w-[460px] text-left">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <label htmlFor="newsletter-first-name" className="sr-only">
                First name (optional)
              </label>
              <input
                id="newsletter-first-name"
                type="text"
                placeholder="First name (optional)"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="h-12 w-full rounded-[12px] border border-white/30 bg-white/10 px-4 font-sans text-[14px] text-white placeholder:text-white/60 outline-none focus:border-white"
              />
            </div>
            <div className="sm:col-span-1">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "newsletter-error" : undefined}
                className="h-12 w-full rounded-[12px] border border-white/30 bg-white/10 px-4 font-sans text-[14px] text-white placeholder:text-white/60 outline-none focus:border-white"
              />
            </div>
          </div>

          <label className="mt-4 flex items-start gap-2.5 font-sans text-[13px] text-white/85">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 accent-white"
            />
            I&rsquo;d like to receive recipes, offers and news by email.
          </label>

          {error && (
            <p id="newsletter-error" role="alert" className="mt-3 font-sans text-[13px] font-semibold text-white">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={status === STATUS.loading}
            className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-[12px] bg-white font-poppins text-[13px] font-bold uppercase tracking-[0.1em] text-mag-accent transition-colors hover:bg-mag-offwhite disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            {status === STATUS.loading ? "Please wait…" : "Subscribe"}
          </button>
        </form>
      </Reveal>
    </section>
  );
}
