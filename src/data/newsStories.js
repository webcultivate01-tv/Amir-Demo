/* =========================================================
   NEWS & MEDIA — story popup content
   Edit this array to change what each "Latest Stories" card
   shows in its modal. `date` is an editorial publish date —
   update it whenever a story is refreshed.
========================================================= */

import aboutShop from "../../images/aboutShop.png";
import sealOfTrust from "../../images/amir-seal-of-trust.png";
import founderPhoto from "../../images/founder-vijay-more.png";
import rawChickenPlate from "../../images/raw-chicken-plate.png";
import rawMuttonPlate from "../../images/raw-mutton-plate.png";
import freshFishPlate from "../../images/fresh-fish-plate.png";
import aboutHero from "../../images/aboutHero.png";

export const newsStories = [
  {
    id: "store-network",
    image: aboutShop,
    inlineImage: aboutHero,
    category: "Company News",
    date: "14 September 2026",
    readingTime: "4 Minutes read",
    title: "From One Counter in Hadapsar to 580+ Stores",
    description:
      "What began as a single shop at Gadital, Hadapsar in 1991 has grown into one of Maharashtra's largest fresh-protein retail networks.",
    summary:
      "What began as a single shop at Gadital, Hadapsar in 1991 has grown into one of Maharashtra's largest fresh-protein retail networks.",
    content: [
      "In 1991, Amir opened its first store in Gadital, Hadapsar — a single counter selling fresh chicken and eggs to the local neighbourhood. Three decades on, that same commitment to freshness has carried the brand to more than 580 stores across Pune, Nashik and Ahilyanagar.",
      "The network opened to franchise partners in 2016, allowing Amir to grow while keeping the same daily sourcing, handling and quality checks at every counter — whether it's the original Hadapsar store or the newest franchise outlet.",
      "Today, the Amir network supports over 2,500 livelihoods, from farm partners and store staff to delivery teams, all working toward the same goal: fresh cuts, accurate weight and fair pricing, every single day.",
    ],
  },
  {
    id: "quality-hygiene",
    image: sealOfTrust,
    inlineImage: aboutHero,
    category: "Quality & Hygiene",
    date: "2 August 2026",
    readingTime: "3 Minutes read",
    title: "ISO & Halal Certified: Our Seal of Trust",
    description:
      "Six standards, followed at every Amir store since 1991, now backed by formal ISO and Halal certification.",
    summary:
      "Six standards, followed at every Amir store since 1991, now backed by formal ISO and Halal certification.",
    content: [
      "Freshness has never been a slogan at Amir — it's a routine, repeated at every counter, every day. Since 1991, every store has followed the same six standards covering sourcing, handling, cutting and storage, long before certification made them official.",
      "That routine is now backed by ISO and Halal certification, giving customers a clear, independently verified guarantee of the hygiene and quality practices behind every cut.",
      "It's a seal of trust in the most literal sense: a promise, visible on every pack, that what reaches an Amir customer's kitchen has been handled with the same care as it was in 1991.",
    ],
  },
  {
    id: "founder-story",
    image: founderPhoto,
    inlineImage: aboutHero,
    category: "Our Founder",
    date: "19 June 2026",
    readingTime: "5 Minutes read",
    title: "Mr. Vijay More: Building Amir Since 1991",
    description:
      "Born in Maharashtra's drought-affected Ahmednagar region, Mr. Vijay More built Amir on two simple ambitions: fresh food and fair livelihoods.",
    summary:
      "Born in Maharashtra's drought-affected Ahmednagar region, Mr. Vijay More built Amir on two simple ambitions: fresh food and fair livelihoods.",
    content: [
      "Mr. Vijay More grew up in Maharashtra's drought-affected Ahmednagar region, where he saw first-hand the challenges faced by educated rural youth struggling to find steady work.",
      "In 1991, he founded Amir with two clear ambitions: to bring genuinely fresh chicken and eggs to local customers, and to create reliable livelihoods for the people who would come to work alongside him.",
      "More than three decades later, those same two ambitions still guide Amir — now a network of 580+ stores and 2,500+ livelihoods across Maharashtra, built one counter at a time.",
    ],
  },
  {
    id: "chicken-sourcing",
    image: rawChickenPlate,
    inlineImage: aboutHero,
    category: "Farm Stories",
    date: "15 November 2026",
    readingTime: "5 Minutes read",
    title: "From Farm to Your Table",
    description:
      "A look at our chicken sourcing practices, daily handling checks and the farm partners behind every cut.",
    summary:
      "A look at our chicken sourcing practices, daily handling checks and the farm partners behind every cut.",
    content: [
      "Every bird that reaches an Amir counter is sourced from farm partners who follow the same handling standards Amir has held to since 1991 — clean housing, careful transport and same-day processing.",
      "Chicken arrives at each store fresh, never frozen, and is cut to order in full view of the customer. Nothing sits in cold storage longer than the day's trading hours allow.",
      "It's a short, closely watched chain — farm, counter, kitchen — built so that what a customer picks up has travelled as little distance, and as little time, as possible.",
    ],
  },
  {
    id: "mutton-quality",
    image: rawMuttonPlate,
    inlineImage: aboutHero,
    category: "Quality & Hygiene",
    date: "28 October 2026",
    readingTime: "4 Minutes read",
    title: "Mutton You Can Trust, Cut by Cut",
    description:
      "Why Amir's mutton selection process focuses on consistency — in age, cut and quality — at every single store.",
    summary:
      "Why Amir's mutton selection process focuses on consistency — in age, cut and quality — at every single store.",
    content: [
      "Mutton quality varies widely across the trade, which is why Amir sets a strict selection standard — age, weight and health checks — applied the same way at every store in the network.",
      "Trained cutters portion each animal into bone-in and boneless cuts to order, so customers get the exact cut they ask for, prepared fresh rather than pulled from a tray.",
      "The result is a cut of mutton that tastes the same whether it's bought at the original Hadapsar counter or the newest franchise store across Maharashtra.",
    ],
  },
  {
    id: "fish-eggs-freshness",
    image: freshFishPlate,
    inlineImage: aboutHero,
    category: "Farm Stories",
    date: "6 October 2026",
    readingTime: "3 Minutes read",
    title: "Beyond Chicken: Fresh Fish and Eggs, Daily",
    description:
      "Fish and eggs follow the same freshness discipline as every other product on an Amir counter.",
    summary:
      "Fish and eggs follow the same freshness discipline as every other product on an Amir counter.",
    content: [
      "Fresh fish is sourced and delivered to stores on a tight daily schedule, handled on ice from catch to counter so quality never drifts between morning and evening stock.",
      "Eggs follow a similarly short supply chain — sourced from trusted farms and moved to stores frequently enough that a tray bought on a Tuesday was laid only days before.",
      "It's the same philosophy that built Amir's chicken business in 1991, now applied across every fresh-protein category the brand carries: short chains, careful handling, no shortcuts.",
    ],
  },
];
