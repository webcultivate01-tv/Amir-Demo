import React from "react";

export default function LegalModal({
  type,
  onClose,
  onReadMore,
}) {
  const isPrivacy = type === "privacy";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-5 py-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-[28px] bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >

        {/* HEADER */}
        <div className="bg-[#281719] px-7 py-7 text-white sm:px-9">

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[#EC1F36]"
          >
            <span className="text-xl leading-none">×</span>
          </button>

          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FFB800]">
            Amir's Fresh Cut
          </p>

          <h2 className="mt-3 pr-10 text-3xl font-semibold tracking-tight">
            {isPrivacy ? "Privacy Policy" : "Terms & Conditions"}
          </h2>

        </div>


        {/* CONTENT */}
        <div className="max-h-[55vh] overflow-y-auto px-7 py-7 sm:px-9">

          {isPrivacy ? (
            <div className="space-y-6 text-sm leading-7 text-neutral-600">

              <p>
                We respect your privacy and take reasonable steps to protect
                information shared with us through the Amir's Fresh Cut website.
              </p>

              <div>
                <h3 className="font-semibold text-[#171719]">
                  Information we collect
                </h3>

                <p className="mt-2">
                  We may collect information that you voluntarily provide,
                  including your name, phone number, email address, and enquiry
                  details.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-[#171719]">
                  How we use it
                </h3>

                <p className="mt-2">
                  Information may be used to respond to enquiries, provide
                  requested information, and improve our website and services.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-[#171719]">
                  Contact
                </h3>

                <p className="mt-2">
                  For privacy-related questions, contact Aamir Farms and Foods Limited at{" "}
                  <a
                    href="mailto:info@amirchicken.in"
                    className="text-[#EC1F36] hover:underline"
                  >
                    info@amirchicken.in
                  </a>{" "}
                  or call{" "}
                  <a
                    href="tel:+919527982525"
                    className="text-[#EC1F36] hover:underline"
                  >
                    +91 95279 82525
                  </a>
                  . Head Office: K-507-510, Mega Center, Behind Noble
                  Hospital, Magarpatta Hadapsar, Pune.
                </p>
              </div>

            </div>
          ) : (
            <div className="space-y-6 text-sm leading-7 text-neutral-600">

              <p>
                By using the Amir's Fresh Cut website, you agree to use the website
                responsibly and in accordance with these Terms & Conditions.
              </p>

              <div>
                <h3 className="font-semibold text-[#171719]">
                  Website information
                </h3>

                <p className="mt-2">
                  Product information, images, availability, and other website
                  content may change without prior notice.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-[#171719]">
                  Enquiries
                </h3>

                <p className="mt-2">
                  Submitting an enquiry or quote request does not by itself
                  constitute a confirmed order or guarantee product
                  availability.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-[#171719]">
                  Intellectual property
                </h3>

                <p className="mt-2">
                  Website content, branding, logos, images, and other materials
                  may not be reproduced or commercially used without
                  authorization.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-[#171719]">
                  Contact
                </h3>

                <p className="mt-2">
                  Aamir Farms and Foods Limited —{" "}
                  <a
                    href="mailto:info@amirchicken.in"
                    className="text-[#EC1F36] hover:underline"
                  >
                    info@amirchicken.in
                  </a>
                  ,{" "}
                  <a
                    href="tel:+919527982525"
                    className="text-[#EC1F36] hover:underline"
                  >
                    +91 95279 82525
                  </a>
                  . Head Office: K-507-510, Mega Center, Behind Noble
                  Hospital, Magarpatta Hadapsar, Pune.
                </p>
              </div>

            </div>
          )}

        </div>


        {/* FOOTER */}
        <div className="flex flex-col gap-3 border-t border-neutral-200 px-7 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-9">

          <button
            type="button"
            onClick={onReadMore}
            className="text-sm font-semibold text-[#EC1F36] hover:underline"
          >
            Read full {isPrivacy ? "Privacy Policy" : "Terms & Conditions"} →
          </button>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-[#171719] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#EC1F36]"
          >
            Close
          </button>

        </div>

      </div>
    </div>
  );
}