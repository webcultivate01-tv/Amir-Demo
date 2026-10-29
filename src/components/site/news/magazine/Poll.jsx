import React, { useEffect, useState } from "react";
import mascot from "../../../../../images/chicken.png";
import { pollQuestion, pollOptions, pollPlaceholderResults } from "../../../../data/newsMagazine";
import Reveal from "./Reveal";
import "./magazine.css";

const STORAGE_KEY = "amir_news_chicken_poll_vote";

export default function Poll() {
  const [votedId, setVotedId] = useState(null);
  const [justVoted, setJustVoted] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) setVotedId(saved);
  }, []);

  const castVote = (optionId) => {
    if (votedId) return;
    window.localStorage.setItem(STORAGE_KEY, optionId);
    setVotedId(optionId);
    setJustVoted(true);
    window.setTimeout(() => setJustVoted(false), 900);
  };

  const hasVoted = Boolean(votedId);

  return (
    <section aria-labelledby="poll-title" className="bg-mag-offwhite px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[560px]">
        <Reveal>
          <h2 className="text-center font-seasons text-[34px] font-bold italic text-mag-accent sm:text-[42px]">
            Poll
          </h2>
        </Reveal>

        <div className="relative mt-12">
          <div
            aria-hidden="true"
            className="mag-chicken-float absolute -top-16 left-4 z-10 sm:-top-20 sm:left-8"
          >
            <img
              src={mascot}
              alt=""
              className={`h-28 w-28 object-contain drop-shadow-[0_18px_22px_rgba(28,28,28,0.3)] sm:h-36 sm:w-36 ${
                justVoted ? "mag-chicken-cheer" : ""
              }`}
            />
          </div>

          <div className="relative rounded-[28px] bg-white px-6 pb-8 pt-16 shadow-[0_30px_70px_-24px_rgba(28,28,28,0.22)] sm:px-10 sm:pt-20">
            <fieldset>
              <legend id="poll-title" className="font-sans text-[18px] font-bold leading-snug text-mag-ink sm:text-[20px]">
                <span className="text-mag-accent">Q.</span> {pollQuestion}
              </legend>

              <div className="mt-5 border-t border-mag-ink/10" />

              {!hasVoted ? (
                <div role="radiogroup" aria-labelledby="poll-title" className="mt-5 divide-y divide-mag-ink/10">
                  {pollOptions.map((option, i) => {
                    const letter = String.fromCharCode(65 + i);
                    return (
                      <button
                        key={option.id}
                        type="button"
                        role="radio"
                        aria-checked="false"
                        onClick={() => castVote(option.id)}
                        className="group flex w-full items-center gap-2.5 py-3 text-left font-sans text-[15px] text-mag-ink transition-colors hover:text-mag-crimson focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mag-accent"
                      >
                        <span className="text-mag-ink/40 group-hover:text-mag-crimson">{letter})</span>
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="mt-5 space-y-4" aria-live="polite">
                  <p className="font-sans text-[13px] font-medium text-mag-crimson">
                    Thanks for voting! Here&rsquo;s what everyone picked so far.
                  </p>
                  {pollOptions.map((option) => {
                    const pct = pollPlaceholderResults[option.id] ?? 0;
                    const isMine = votedId === option.id;
                    return (
                      <div key={option.id}>
                        <div className="flex items-center justify-between font-sans text-[14px] text-mag-ink">
                          <span className={isMine ? "font-semibold text-mag-crimson" : ""}>
                            {option.label}
                            {isMine ? " (your vote)" : ""}
                          </span>
                          <span className="tabular-nums text-mag-ink/60">{pct}%</span>
                        </div>
                        <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-mag-cream">
                          <div
                            className="h-full rounded-full bg-mag-accent transition-all duration-700 ease-out"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                  <p className="pt-1 font-sans text-[12px] text-mag-ink/45">
                    {/* TODO: replace placeholder percentages with a real GET /api/poll/results call */}
                    Results shown are illustrative while we connect live polling.
                  </p>
                </div>
              )}
            </fieldset>
          </div>
        </div>
      </div>
    </section>
  );
}
