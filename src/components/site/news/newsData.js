import aboutHero from "../../../../images/aboutHero.png";
import oneAmir from "../../../../images/oneAmir (2).png";
import newsHero from "../../../../images/newsHero1.png";
import oneToAmir from "../../../../images/oneToAmir.png";
import newsHero2 from "../../../../images/newsHero2.png";
import heroDark from "../../../../images/Hero1 (2).png";
import proteinHero from "../../../../images/amir-protein-hero.png";
import chickenPlate from "../../../../images/raw-chicken-plate.png";
import mascot from "../../../../images/chicken.png";
import seal from "../../../../images/amir-seal-of-trust.png";
import wordmarkWhite from "../../../../images/amir-wordmark-white.png";

/* =========================================================
   NEWS & MEDIA CONTENT
   Stories are built only from facts already published on the
   AMIR site (About / Home). Replace or extend with real press
   items as they become available.

   art.fit "cover"   -> photo fills the frame
   art.fit "contain" -> product / mascot sits on a tinted panel
========================================================= */

export const categories = [
  {
    id: "all",
    label: "All Stories",
    blurb: "Every chapter of the AMIR story, in one place.",
  },
  {
    id: "Network",
    label: "Network",
    blurb: "How one Hadapsar outlet grew into a 580+ store network.",
  },
  {
    id: "Quality & Trust",
    label: "Quality & Trust",
    blurb: "The standards, registrations and care behind every counter.",
  },
  {
    id: "Milestones",
    label: "Milestones",
    blurb: "The records and moments that mark AMIR's journey.",
  },
  {
    id: "Community",
    label: "Community",
    blurb: "The people and livelihoods that keep AMIR going.",
  },
  {
    id: "Brand Story",
    label: "Brand Story",
    blurb: "Where AMIR comes from and what it offers every kitchen.",
  },
];

export const stories = [
  {
    id: "network",
    category: "Network",
    title: "From one Hadapsar outlet to 580+ stores",
    excerpt:
      "How a single AMIR counter opened in 1991 grew into a fresh-protein network across Pune, Nashik and Ahilyanagar.",
    place: "Pune",
    read: "3 min read",
    body: [
      "AMIR opened its first store at Gadital, Hadapsar in 1991 with a simple belief: fresh protein should be organised, trustworthy and accessible to every family.",
      "Today that single outlet has grown into a network of 580+ stores, with a presence in Pune, Nashik and Ahilyanagar. The scale has changed. The founding standard has not.",
    ],
    art: { src: oneAmir, fit: "cover", position: "78% 50%", bg: "#1a0d0f" },
  },
  {
    id: "certifications",
    category: "Quality & Trust",
    title: "Trademark, ISO and Halal: the registrations behind the Seal of Trust",
    excerpt:
      "In 2015 AMIR secured its trademark, ISO and Halal registrations, putting everyday standards on a formal footing.",
    place: "Maharashtra",
    read: "2 min read",
    body: [
      "In 2015, AMIR secured its trademark, ISO and Halal registrations, a milestone that placed the brand's everyday standards of cleanliness, handling and quality on a formal footing.",
      "The AMIR Seal of Trust that customers see in every store stands for that commitment: honest service and dependable quality, kept up day after day.",
    ],
    art: { src: seal, fit: "contain", bg: "#FBEFD2" },
  },
  {
    id: "record",
    category: "Milestones",
    title: "6,85,000 kg in a month: the 2019 broiler sales record",
    excerpt:
      "A record monthly broiler sales figure in 2019 showed how far the AMIR network, and its customers' trust, had come.",
    place: "AMIR Network",
    read: "2 min read",
    body: [
      "In 2019, AMIR recorded its highest monthly broiler sales: 6,85,000 kg.",
      "The figure reflects the daily choice of customers across the network, and the work of the teams who source, cut and serve fresh chicken every day.",
    ],
    art: { src: chickenPlate, fit: "contain", bg: "#B9101F" },
  },
  {
    id: "franchise",
    category: "Network",
    title: "2016: franchising and a brand transformation begin",
    excerpt:
      "A new chapter opened in 2016, as AMIR began franchising and transforming the brand for its next stage of growth.",
    place: "Pune",
    read: "3 min read",
    body: [
      "After becoming a private limited company in 2005 and securing its registrations in 2015, AMIR entered a new phase in 2016, when franchising and brand transformation began together.",
      "Franchising opened the way for the AMIR standard to reach more neighbourhoods, while the refreshed brand carried the same family values forward.",
    ],
    art: { src: oneToAmir, fit: "cover", position: "82% 50%", bg: "#FFFFFF" },
  },
  {
    id: "freshness",
    category: "Quality & Trust",
    title: "Freshness first: care from sourcing to the counter",
    excerpt:
      "Cleanliness, careful handling and consistent quality at every stage. This is the promise AMIR keeps daily.",
    place: "AMIR Operations",
    read: "2 min read",
    body: [
      "Freshness is the first promise at AMIR. Fresh protein is handled with care from sourcing through to the customer, with a consistent focus on cleanliness, handling and quality at every stage.",
      "It is a simple, everyday promise, built around honest service and dependable quality since 1991.",
    ],
    art: { src: aboutHero, fit: "cover", position: "68% 50%", bg: "#1a0d0f" },
  },
  {
    id: "family",
    category: "Community",
    title: "2,500+ livelihoods: the AMIR family beyond the counter",
    excerpt:
      "Sourcing, training, cutting and serving. These are the people who keep the AMIR standard alive every day.",
    place: "AMIR Network",
    read: "3 min read",
    body: [
      "Behind every AMIR counter is a team: people who source, train, cut and serve with the same care the brand has stood for since 1991.",
      "Today the AMIR network supports 2,500+ livelihoods, a growing family built on trust.",
    ],
    art: { src: mascot, fit: "contain", bg: "#F2A71B" },
  },
  {
    id: "company",
    category: "Brand Story",
    title: "2005: from proprietorship to private limited company",
    excerpt:
      "A defining step in AMIR's evolution that moved the business onto a more organised footing.",
    place: "Pune",
    read: "2 min read",
    body: [
      "In 2005, the business evolved from a proprietorship into a private limited company, moving AMIR toward a more organised footing as a retail brand.",
      "It set the stage for the milestones that followed: registrations in 2015 and franchising in 2016.",
    ],
    art: { src: heroDark, fit: "cover", position: "50% 50%", bg: "#1a0d0f" },
  },
  {
    id: "range",
    category: "Brand Story",
    title: "Chicken, mutton, fish and eggs: everyday protein for the Indian kitchen",
    excerpt:
      "AMIR's fresh range is built around the meals and family favourites of everyday Indian cooking.",
    place: "AMIR Stores",
    read: "2 min read",
    body: [
      "AMIR offers quality chicken, mutton, fish and eggs for everyday meals and family favourites.",
      "Explore the full range on our products page, or get in touch for a quote.",
    ],
    cta: { label: "Explore our range", to: "/catalog" },
    art: { src: proteinHero, fit: "cover", position: "50% 50%", bg: "#d9d9d9" },
  },
];

export const storyById = Object.fromEntries(stories.map((s) => [s.id, s]));

/* =========================================================
   HERO SLIDES (5)
   `story` links each slide to a story that opens on click.
   mascot: true renders the rooster over a maroon gradient
   instead of a full-bleed photograph.
========================================================= */

export const slides = [
  {
    id: "s2",
    tag: "Quality & Trust",
    title: "Freshness,",
    accent: "handled with care.",
    text: "Cleanliness, handling and quality at every stage, from sourcing to the counter.",
    story: "freshness",
    image: newsHero2,
    position: "50% 50%",
    light: true,
    pad: "lg:pb-28",
    label: "News & Media",
    heading: "AMIR in the",
    headingAccent: "spotlight.",
    blurb: "Press releases, media coverage and brand updates from AMIR, India's trusted protein brand, all in one place.",
  },
  {
    id: "s1",
    tag: "Network",
    title: "580+ stores,",
    accent: "one promise.",
    text: "From Gadital, Hadapsar in 1991 to Pune, Nashik and Ahilyanagar today.",
    story: "network",
    image: newsHero,
    position: "85% 50%",
    light: true,
    pad: "lg:pb-24 lg:pl-[6%] lg:pr-[38%]",
    label: "News & Media",
    heading: "The AMIR",
    headingAccent: "Newsroom.",
    blurb: "Stories, milestones and updates from India's trusted protein brand. Explore our everyday range of fresh chicken, mutton, fish and eggs.",
  },
];

/* =========================================================
   MEDIA KIT + FACTS
========================================================= */

export const mediaKit = [
  {
    id: "seal",
    name: "AMIR Seal of Trust",
    note: "Primary logo · PNG",
    src: seal,
    file: "amir-seal-of-trust.png",
    bg: "#FFFFFF",
  },
  {
    id: "wordmark",
    name: "AMIR Wordmark (White)",
    note: "For dark backgrounds · PNG",
    src: wordmarkWhite,
    file: "amir-wordmark-white.png",
    bg: "#271719",
  },
];

export const facts = [
  { value: "1991", label: "Founded at Hadapsar" },
  { value: "580+", label: "Stores" },
  { value: "2,500+", label: "Livelihoods" },
  { value: "6,85,000 kg", label: "Record monthly broiler sales, 2019" },
];
