/* =========================================================
   NEWS & MEDIA — "Beyond the Bite" magazine page
   All copy/data for the page lives here, split by section.
   Swap any `image` import or copy string to update the page —
   no component needs to change.

   Facts drawn from AMIR's real brand history (1991 founding,
   580+ stores, 2,500+ livelihoods, 2015 certifications, 2019
   sales record, IRA membership) reuse the same source images
   already used on the About/Home pages. Recipe names, the
   community-submission examples and poll/video placeholders
   are editorial scaffolding — replace with real customer
   submissions and real video links when available.
========================================================= */

import aboutHero from "../../images/aboutHero.png";
import oneAmir from "../../images/oneAmir (2).png";
import amirProteinHero from "../../images/amir-protein-hero.png";
import rawChickenPlate from "../../images/raw-chicken-plate.png";
import freshEggsPlate from "../../images/fresh-eggs-plate.png";
import freshFishPlate from "../../images/fresh-fish-plate.png";
import founderPhoto from "../../images/founder-vijay-more.png";
import iraLogo from "../../images/ira-logo.png";
import eggHero from "../../images/egg.png";

import tandoorChicken from "../../images/products/chicken/Tandoor Chicken.png";
import chickenWings from "../../images/products/chicken/Chicken Wings With Skin.png";

/* =========================================================
   1. HERO — five numbered story cards (01–05)
========================================================= */
export const heroStories = [
  {
    id: "freshness-routine",
    number: "01",
    category: "Freshness Tips",
    title: "Farm to fork in under 24 hours: inside our daily freshness routine",
    excerpt:
      "Sourcing, cleaning, cutting and delivery — the daily routine that keeps every AMIR counter fresh, the same way it has since 1991.",
    image: aboutHero,
    featured: true,
  },
  {
    id: "weeknight-curry-cut",
    number: "02",
    category: "Recipes",
    title: "Five weeknight dinners you can build from one chicken curry cut",
    excerpt:
      "One cut, five meals. A simple plan for turning a single pack of curry cut into a week of easy dinners.",
    image: rawChickenPlate,
  },
  {
    id: "eggs-and-lean-protein",
    number: "03",
    category: "Health",
    title: "Why fresh eggs and lean chicken belong in every Indian kitchen",
    excerpt:
      "A quick look at why farm-fresh eggs and lean cuts remain two of the most reliable proteins for everyday meals.",
    image: freshEggsPlate,
  },
  {
    id: "network-story",
    number: "04",
    category: "Kitchen Stories",
    title: "From one counter in Hadapsar to 580+ stores: the AMIR story",
    excerpt:
      "How a single outlet opened at Gadital, Hadapsar in 1991 grew into a fresh-protein network across Pune, Nashik and Ahilyanagar.",
    image: oneAmir,
  },
  {
    id: "pick-fresh-fish",
    number: "05",
    category: "Seafood",
    title: "A buyer's guide to picking truly fresh fish, AMIR-style",
    excerpt:
      "Clear eyes, firm flesh and a clean smell — the simple checks our counters use before any fish makes the cut.",
    image: freshFishPlate,
  },
];

/* =========================================================
   2. QUICK FIVE — short link list under the hero
========================================================= */
export const quickFive = [
  { label: "2,500+ livelihoods: the people behind every AMIR cut", href: "#feast-on-features" },
  { label: "ISO & Halal certified: what our Seal of Trust really means", href: "#feast-on-features" },
  { label: "6,85,000 kg in a month: our 2019 broiler sales record", href: "#feast-on-features" },
  { label: "Egg storage 101: simple tips for a longer shelf life", href: "#foodverse" },
  { label: "Curry cut or boneless? A quick guide to choosing right", href: "#foodverse" },
];

/* =========================================================
   3. OUR FOODVERSE — category tabs
========================================================= */
export const foodverseTabs = [
  { id: "chicken", label: "Chicken" },
  { id: "mutton", label: "Mutton" },
  { id: "fish", label: "Fish" },
  { id: "eggs", label: "Eggs" },
];

/* Dish photography (Pexels, free to use) — swap for AMIR's own shoot when ready. */
export const foodverseItems = {
  chicken: [
    {
      id: "c1",
      category: "Chicken",
      title: "Dhaba-Style Chicken Curry, AMIR Kadai",
      blurb: "A fiery, tomato-forward curry straight from the kadai.",
      image: "https://images.pexels.com/photos/29684985/pexels-photo-29684985.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      id: "c2",
      category: "Chicken",
      title: "Restaurant-Style Butter Chicken at Home",
      blurb: "A restaurant favourite, simplified for your own kitchen.",
      image: "https://images.pexels.com/photos/35629938/pexels-photo-35629938.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      id: "c3",
      category: "Chicken",
      title: "Sunday Chicken Masala, Simplified",
      blurb: "A lighter weeknight take on the Sunday classic.",
      image: "https://images.pexels.com/photos/32986463/pexels-photo-32986463.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
  ],
  mutton: [
    {
      id: "m1",
      category: "Mutton",
      title: "Shank-On Mutton Curry, Slow-Cooked",
      blurb: "Bone-in cuts simmered low and slow for deep flavour.",
      image: "https://images.pexels.com/photos/29684989/pexels-photo-29684989.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      id: "m2",
      category: "Mutton",
      title: "Mutton Chops, Chilli-Red Masala",
      blurb: "Tender chops in a sharp, onion-forward masala.",
      image: "https://images.pexels.com/photos/28674568/pexels-photo-28674568.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      id: "m3",
      category: "Mutton",
      title: "Sunday Mutton Curry, AMIR-Style",
      blurb: "The slow Sunday curry worth clearing your afternoon for.",
      image: "https://images.pexels.com/photos/34616638/pexels-photo-34616638.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
  ],
  fish: [
    {
      id: "f1",
      category: "Fish",
      title: "Coastal Fish Curry, Tangy & Bold",
      blurb: "A tangy, coconut-forward curry worth the extra step.",
      image: "https://images.pexels.com/photos/13243817/pexels-photo-13243817.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      id: "f2",
      category: "Fish",
      title: "Red Masala Fish, Plated Fresh",
      blurb: "A bold red masala that clings to every bite.",
      image: "https://images.pexels.com/photos/35267289/pexels-photo-35267289.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      id: "f3",
      category: "Fish",
      title: "Fish Thali, the AMIR Weekend Way",
      blurb: "Fried fish, rice and curry — a full weekend spread.",
      image: "https://images.pexels.com/photos/36796431/pexels-photo-36796431.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
  ],
  eggs: [
    {
      id: "e1",
      category: "Eggs",
      title: "Classic Egg Curry, Weeknight-Ready",
      blurb: "Soft-boiled eggs in a quick, spiced tomato gravy.",
      image: "https://images.pexels.com/photos/40247278/pexels-photo-40247278.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      id: "e2",
      category: "Eggs",
      title: "Everyday Egg Curry, No Fuss",
      blurb: "Timing, water and ice — the three things that matter.",
      image: "https://images.pexels.com/photos/35071817/pexels-photo-35071817.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      id: "e3",
      category: "Eggs",
      title: "Scotch Egg Masala, Dhaba-Style",
      blurb: "Crisp-coated eggs finished in a rich, spiced masala.",
      image: "https://images.pexels.com/photos/40247287/pexels-photo-40247287.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
  ],
};

/* =========================================================
   4. SHARE YOUR CULINARY VOICE — community block
   NOTE: names/dishes below are placeholder examples for the
   submission format. Replace with real customer submissions
   as they come in.
========================================================= */
export const culinaryVoice = {
  featured: {
    id: "sunday-curry",
    title: "Aarti's Sunday chicken curry",
    author: "Aarti Deshmukh",
    initials: "AD",
    image: rawChickenPlate,
  },
  smaller: [
    { id: "egg-roll", title: "Ravi's egg roll hack", author: "Ravi Shinde", initials: "RS", image: eggHero },
    { id: "fish-fry-secret", title: "Meena's fish fry secret", author: "Meena Kulkarni", initials: "MK", image: freshFishPlate },
  ],
};

/* =========================================================
   5. POLL
   TODO: replace placeholder results with a real API call —
   e.g. GET /api/poll/favourite-chicken results, POST to vote.
========================================================= */
export const pollQuestion = "What's your favourite way to enjoy fresh chicken?";

export const pollOptions = [
  { id: "butter", label: "Butter chicken" },
  { id: "tandoori", label: "Tandoori / grilled" },
  { id: "fry", label: "Crispy fry" },
  { id: "curry", label: "Home-style curry" },
];

/* Placeholder result percentages — TODO: connect a real API */
export const pollPlaceholderResults = {
  butter: 34,
  tandoori: 24,
  fry: 18,
  curry: 24,
};

/* =========================================================
   6. FEAST ON FEATURES
========================================================= */
export const mainFeature = {
  eyebrow: "Feast on Features",
  title: "From Farm to Fork: How Amir Freshcut keeps every cut fresh",
  excerpt:
    "Thirty-five years of sourcing, handling and quality checks, distilled into one daily routine followed at every AMIR counter.",
  image: amirProteinHero,
};

export const secondaryFeatures = [
  {
    id: "founder-interview",
    label: "Interview",
    title: "Meet the man behind the counter: a conversation with our founder",
    image: founderPhoto,
  },
  {
    id: "sunday-lunch",
    label: "Food Culture",
    title: "Why Sunday lunch in Maharashtra still begins with chicken",
    image: oneAmir,
  },
  {
    id: "weekend-feast",
    label: "Dining Inspiration",
    title: "Table for four: easy ideas for a weekend chicken feast",
    image: rawChickenPlate,
  },
];

/* =========================================================
   7. NEWS & TRENDS
   TEMP — replace these YouTube video IDs with AMIR's own
   uploads once they're ready. Until then the thumbnail shows
   and the real embed only loads after a click (privacy-friendly
   lazy embed), so a placeholder ID here never auto-loads.
========================================================= */
export const trendVideos = [
  {
    id: "v1",
    title: "Kitchen Tip: Getting a crisp sear on chicken, every time",
    youtubeId: "REPLACE_WITH_REAL_YOUTUBE_ID_1", // TEMP
    thumbnail: rawChickenPlate,
  },
  {
    id: "v2",
    title: "Trend Watch: why air-fried chicken is having a moment",
    youtubeId: "REPLACE_WITH_REAL_YOUTUBE_ID_2", // TEMP
    thumbnail: tandoorChicken,
  },
];

export const trendArticle = {
  id: "air-fry-trend",
  label: "Trend",
  title: "Why air-fried chicken is having a moment in Indian kitchens",
  excerpt: "Less oil, same crunch — a look at why home cooks are reaching for the air fryer more often.",
  image: chickenWings,
};

export const pressItem = {
  id: "ira-membership",
  label: "Press",
  title: "AMIR Freshcut joins the Indian Retail Alliance",
  excerpt: "A step that formalised AMIR's standing among India's organised fresh-retail brands.",
  image: iraLogo,
  imageBg: "#FFFFFF",
};

/* =========================================================
   8. NEWSLETTER
   Posts to /api/subscribe — stub for now (no backend route
   exists yet). TODO: wire to the real subscribe endpoint.
========================================================= */
export const newsletterCopy = {
  heading: "Don't Miss a Single Fresh Update",
  body: "Recipes, offers and fresh news, straight to your inbox.",
};
