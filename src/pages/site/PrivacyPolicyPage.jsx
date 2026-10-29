import React from "react";

const sections = [
  {
    title: "1. Information We Collect",
    content: (
      <>
        <p>
          Amir's Fresh Cut is operated by Aamir Farms and Foods Limited, a
          Maharashtra-based fresh-protein retail company established in 1991 by
          Mr. Vijay More, with retail stores across Pune, Nashik and
          Ahilyanagar.
        </p>

        <p>
          When you interact with the Amir's Fresh Cut website, we may receive
          information that you voluntarily provide to us, such as your name,
          phone number, email address, and details submitted through enquiry or
          quote forms.
        </p>

        <p>
          We may also receive basic technical information about your visit,
          such as browser type, device information, and website usage data.
        </p>
      </>
    ),
  },
  {
    title: "2. How We Use Your Information",
    content: (
      <>
        <p>
          Information submitted through this website may be used to respond to
          enquiries, process requests, provide information about our products
          and services, and communicate with you regarding your enquiry.
        </p>

        <p>
          We may also use information to improve our website, services, and
          overall customer experience.
        </p>
      </>
    ),
  },
  {
    title: "3. Sharing of Information",
    content: (
      <p>
        Amir's Fresh Cut does not use your submitted information for purposes
        unrelated to your interaction with us. Information may be shared with
        service providers or other parties where reasonably necessary to
        operate the website, respond to enquiries, or provide requested
        services.
      </p>
    ),
  },
  {
    title: "4. Cookies and Website Technologies",
    content: (
      <p>
        Our website may use cookies or similar technologies to support website
        functionality, understand website usage, and improve your experience.
        You can manage cookie preferences through your browser settings.
      </p>
    ),
  },
  {
    title: "5. Data Security",
    content: (
      <p>
        We take reasonable measures to protect information submitted through
        our website. However, no method of transmission or electronic storage
        can be guaranteed to be completely secure.
      </p>
    ),
  },
  {
    title: "6. Your Choices",
    content: (
      <p>
        If you have questions about information you have submitted to Amir's Fresh Cut, or would like to request clarification regarding its use,
        please contact us using the details provided below.
      </p>
    ),
  },
  {
    title: "7. Changes to This Policy",
    content: (
      <p>
        We may update this Privacy Policy from time to time to reflect changes
        to our website, services, or practices. Any updated version will be
        published on this page.
      </p>
    ),
  },
  {
    title: "8. Contact Us",
    content: (
      <>
        <p>
          If you have questions about this Privacy Policy, you can contact
          Aamir Farms and Foods Limited using the details below.
        </p>

        <ul className="space-y-2">
          <li>
            <span className="font-semibold text-[#171719]">Head Office: </span>
            K-507-510, Mega Center, Behind Noble Hospital, Magarpatta
            Hadapsar, Pune
          </li>
          <li>
            <span className="font-semibold text-[#171719]">Phone: </span>
            <a
              href="tel:+919527982525"
              className="font-medium text-[#EC1F36] hover:underline"
            >
              +91 95279 82525
            </a>
          </li>
          <li>
            <span className="font-semibold text-[#171719]">Email: </span>
            <a
              href="mailto:info@amirchicken.in"
              className="font-medium text-[#EC1F36] hover:underline"
            >
              info@amirchicken.in
            </a>
          </li>
        </ul>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white text-[#171719]">

      <section className="bg-[#271719] px-5 py-14 text-[#F5EFE6] sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-[1280px] px-2 sm:px-6 lg:px-10">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-base leading-7 text-[#F5EFE6]/70">
            Your privacy matters to us. This page explains how information provided through the Amir's Fresh Cut website may be collected and used.
          </p>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        <article className="mx-auto max-w-[1280px] space-y-10 px-2 sm:px-6 lg:px-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-semibold tracking-tight">
                {section.title}
              </h2>
              <div className="mt-3 space-y-4 text-[15px] leading-7 text-neutral-600">
                {section.content}
              </div>
            </section>
          ))}
        </article>
      </section>

    </main>
  );
}