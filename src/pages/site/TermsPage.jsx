import React from "react";

const sections = [
  {
    title: "1. Acceptance of These Terms",
    content: (
      <>
        <p>
          By accessing or using the Amir's Fresh Cut website, you agree to use the
          website in accordance with these Terms and Conditions. If you do not
          agree with these terms, please discontinue use of the website.
        </p>

        <p>
          This website is operated by Aamir Farms and Foods Limited, a
          Maharashtra-based fresh-protein retail company established in 1991
          by Mr. Vijay More.
        </p>
      </>
    ),
  },
  {
    title: "2. Website Information",
    content: (
      <p>
        We make reasonable efforts to keep information on this website useful
        and current. However, product descriptions, availability, images,
        specifications, and other information may change without prior notice.
      </p>
    ),
  },
  {
    title: "3. Product Enquiries",
    content: (
      <p>
        Information submitted through quote or enquiry forms is treated as a
        request for information or contact. Submission of an enquiry does not
        by itself constitute a confirmed order, purchase agreement, or
        guarantee of product availability.
      </p>
    ),
  },
  {
    title: "4. Orders and Requirements",
    content: (
      <p>
        Any order, supply arrangement, quotation, or commercial engagement may
        be subject to separate terms agreed between Amir's Fresh Cut and the
        customer.
      </p>
    ),
  },
  {
    title: "5. Website Use",
    content: (
      <p>
        You agree not to misuse the website, attempt to gain unauthorized
        access to its systems, interfere with its operation, or use the
        website for unlawful purposes.
      </p>
    ),
  },
  {
    title: "6. Intellectual Property",
    content: (
      <p>
        Unless otherwise stated, the content, branding, graphics, text,
        imagery, logos, and other materials appearing on this website belong
        to Amir's Fresh Cut or are used with appropriate permission. They may not
        be reproduced or commercially used without authorization.
      </p>
    ),
  },
  {
    title: "7. Third-Party Links",
    content: (
      <p>
        The website may contain links to third-party websites or services.
        Amir's Fresh Cut is not responsible for the content, availability, or
        practices of external websites.
      </p>
    ),
  },
  {
    title: "8. Limitation of Liability",
    content: (
      <p>
        To the extent permitted by applicable law, Amir's Fresh Cut shall not be
        responsible for losses arising from interruptions, technical issues,
        inaccuracies, or reliance on information available through the
        website.
      </p>
    ),
  },
  {
    title: "9. Changes to These Terms",
    content: (
      <p>
        These Terms and Conditions may be updated from time to time. Updated
        terms will be published on this page and will apply from the date they
        are posted.
      </p>
    ),
  },
  {
    title: "10. Contact",
    content: (
      <>
        <p>
          For questions regarding these Terms and Conditions, please contact
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

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white text-[#171719]">

      <section className="bg-[#271719] px-5 py-14 text-[#F5EFE6] sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-[1280px] px-2 sm:px-6 lg:px-10">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Terms &amp; Conditions
          </h1>
          <p className="mt-3 text-base leading-7 text-[#F5EFE6]/70">
            Please read these terms carefully before using the Amir's Fresh Cut website.
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