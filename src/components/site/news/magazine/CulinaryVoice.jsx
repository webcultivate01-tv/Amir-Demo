import React, { useState } from "react";
import { ArrowRight, CheckCircle2, Upload } from "lucide-react";
import { culinaryVoice } from "../../../../data/newsMagazine";
import { Eyebrow, SectionHeading } from "./Ornaments";
import Reveal from "./Reveal";
import Modal from "./Modal";

const inputClass =
  "mt-1.5 w-full rounded-[12px] border border-mag-ink/15 bg-white px-4 py-2.5 font-sans text-[14px] text-mag-ink outline-none transition-colors focus:border-mag-crimson focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mag-accent";

/* Shared form for both "Submit your recipe" and "Share your story".
   TODO: POST this payload to a real submissions endpoint. */
const SubmissionForm = ({ kind, onSubmitted }) => {
  const [photoName, setPhotoName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitted();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor={`${kind}-name`} className="font-poppins text-[12px] font-semibold uppercase tracking-wide text-mag-ink/70">
          Name
        </label>
        <input id={`${kind}-name`} name="name" type="text" required className={inputClass} />
      </div>

      <div>
        <label htmlFor={`${kind}-email`} className="font-poppins text-[12px] font-semibold uppercase tracking-wide text-mag-ink/70">
          Email
        </label>
        <input id={`${kind}-email`} name="email" type="email" required className={inputClass} />
      </div>

      <div>
        <label htmlFor={`${kind}-title`} className="font-poppins text-[12px] font-semibold uppercase tracking-wide text-mag-ink/70">
          {kind === "recipe" ? "Recipe title" : "Story title"}
        </label>
        <input id={`${kind}-title`} name="title" type="text" required className={inputClass} />
      </div>

      <div>
        <label htmlFor={`${kind}-message`} className="font-poppins text-[12px] font-semibold uppercase tracking-wide text-mag-ink/70">
          {kind === "recipe" ? "Tell us how you make it" : "Your story"}
        </label>
        <textarea id={`${kind}-message`} name="message" rows={4} required className={`${inputClass} resize-none`} />
      </div>

      <div>
        <label
          htmlFor={`${kind}-photo`}
          className="flex cursor-pointer items-center gap-2 rounded-[12px] border border-dashed border-mag-ink/25 px-4 py-3 font-sans text-[13px] text-mag-ink/70 transition-colors hover:border-mag-crimson/50"
        >
          <Upload className="h-4 w-4 shrink-0 text-mag-crimson" aria-hidden="true" />
          {photoName || "Add a photo (optional)"}
        </label>
        <input
          id={`${kind}-photo`}
          name="photo"
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(e) => setPhotoName(e.target.files?.[0]?.name ?? "")}
        />
      </div>

      <button
        type="submit"
        className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-[12px] bg-mag-crimson font-poppins text-[13px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-mag-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mag-accent"
      >
        {kind === "recipe" ? "Submit your recipe" : "Share your story"}
      </button>
    </form>
  );
};

const SuccessState = () => (
  <div className="flex flex-col items-center py-6 text-center">
    <CheckCircle2 className="h-12 w-12 text-mag-crimson" aria-hidden="true" />
    <p className="mt-4 font-syne text-[18px] font-bold text-mag-ink">Thank you!</p>
    <p className="mt-1 font-sans text-[14px] text-mag-ink/70">We&rsquo;ll feature the best ones.</p>
  </div>
);

export default function CulinaryVoice() {
  const [modalKind, setModalKind] = useState(null); // null | "recipe" | "story"
  const [submitted, setSubmitted] = useState(false);

  const closeModal = () => {
    setModalKind(null);
    setSubmitted(false);
  };

  return (
    <section aria-labelledby="culinary-voice-title" className="bg-mag-offwhite px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-[1200px]">
        <Reveal className="mx-auto max-w-[640px] text-center">
          <Eyebrow className="justify-center">Community</Eyebrow>
          <SectionHeading id="culinary-voice-title" className="mt-3">
            Share Your Culinary Voice
          </SectionHeading>
          <p className="mt-4 font-sans text-[15px] leading-7 text-mag-ink/70">
            Tell us how you cook your favourite chicken dish.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Reveal as="article" className="group relative overflow-hidden rounded-[20px] bg-white shadow-[0_8px_30px_-12px_rgba(17,17,17,0.15)]">
            <div className="aspect-[16/10] w-full overflow-hidden">
              <img
                src={culinaryVoice.featured.image}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <h3 className="font-syne text-[20px] font-bold text-mag-ink">{culinaryVoice.featured.title}</h3>
              <div className="mt-4 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-mag-crimson font-poppins text-[12px] font-bold text-white">
                  {culinaryVoice.featured.initials}
                </span>
                <span className="font-sans text-[13px] text-mag-ink/70">{culinaryVoice.featured.author}</span>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-6">
            {culinaryVoice.smaller.map((item, i) => (
              <Reveal
                as="a"
                delay={(i + 1) * 90}
                key={item.id}
                href={`#story-${item.id}`}
                className="group flex items-center gap-4 rounded-[20px] bg-white p-4 shadow-[0_8px_30px_-12px_rgba(17,17,17,0.12)] transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mag-accent"
              >
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-[14px]">
                  <img src={item.image} alt="" loading="lazy" className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-syne text-[15px] font-bold text-mag-ink">{item.title}</h4>
                  <span className="mt-1 block font-sans text-[12px] text-mag-ink/60">{item.author}</span>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-mag-accent transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button
            type="button"
            onClick={() => setModalKind("recipe")}
            className="inline-flex h-12 items-center justify-center rounded-[12px] bg-mag-crimson px-7 font-poppins text-[13px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-mag-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mag-accent"
          >
            Submit your recipe
          </button>
          <button
            type="button"
            onClick={() => setModalKind("story")}
            className="inline-flex h-12 items-center justify-center rounded-[12px] border border-mag-accent px-7 font-poppins text-[13px] font-bold uppercase tracking-[0.1em] text-mag-accent transition-colors hover:bg-mag-accent hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mag-accent"
          >
            Share your story
          </button>
        </div>
      </div>

      {modalKind && (
        <Modal
          titleId="culinary-voice-modal-title"
          title={submitted ? "Submission received" : modalKind === "recipe" ? "Submit your recipe" : "Share your story"}
          onClose={closeModal}
        >
          {submitted ? <SuccessState /> : <SubmissionForm kind={modalKind} onSubmitted={() => setSubmitted(true)} />}
        </Modal>
      )}
    </section>
  );
}
