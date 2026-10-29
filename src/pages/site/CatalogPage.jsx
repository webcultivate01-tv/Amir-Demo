import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";

// Optimised WebP product photos (images/products/<category>/<name>.webp), bundled by Vite
const productImages = import.meta.glob("../../../images/products/*/*.webp", {
  eager: true,
  import: "default",
});
const mediaImage = (folder, file) =>
  productImages[`../../../images/products/${folder}/${file}.webp`];
const chickenImage = (file) => mediaImage("chicken", file);

const EASE = [0.22, 1, 0.36, 1];

// 3 columns x 2 rows on laptop screens
const PAGE_SIZE = 6;

const categories = [
  { name: "All Cuts", image: "/images/amir-protein-hero.png" },
  { name: "Chicken", image: "/images/raw-chicken-plate.png" },
  { name: "Mutton", image: "/images/raw-mutton-plate.png" },
  { name: "Fish & Seafood", image: "/images/fresh-fish-plate.png" },
  { name: "Farm Eggs", image: "/images/fresh-eggs-plate.png" },
];

const products = {
  Chicken: [
    {
      name: "Chicken Breast Boneless",
      text: "Lean, tender boneless breast for grills and curries.",
      image: chickenImage("Chicken Breast Boneless"),
    },
    {
      name: "Chicken Drumstick Skinless",
      text: "Juicy skinless drumsticks for frying and roasting.",
      image: chickenImage("Chicken Drumstick Skinless"),
    },
    {
      name: "Chicken Gizzard",
      text: "Cleaned gizzards, fresh and ready to cook.",
      image: chickenImage("Chicken Gizzard"),
    },
    {
      name: "Chicken Leg Boneless",
      text: "Boneless leg meat, soft and full of flavour.",
      image: chickenImage("Chicken Leg Boneless"),
    },
    {
      name: "Chicken Liver & Heart",
      text: "Fresh liver and heart, cleaned and packed.",
      image: chickenImage("Chicken Liver & Heart"),
    },
    {
      name: "Chicken Lollipop",
      text: "Frenched wing pieces, ready to marinate and fry.",
      image: chickenImage("Chicken Lollipop"),
    },
    {
      name: "Chicken Neck With Skin",
      text: "Fresh neck pieces with skin, great for gravies.",
      image: chickenImage("Chicken Neck With Skin"),
    },
    {
      name: "Chicken Soup Bones (Janatha Chicken)",
      text: "Meaty bones for rich, nourishing soups.",
      image: chickenImage("Chicken Soup Bones (Janatha Chicken)"),
    },
    {
      name: "Chicken Whole Leg Skinless",
      text: "Whole skinless leg, perfect for curries and roasts.",
      image: chickenImage("Chicken Whole Leg Skinless"),
    },
    {
      name: "Chicken Wings With Skin",
      text: "Fresh wings with skin, trimmed and ready to cook.",
      image: chickenImage("Chicken Wings With Skin"),
    },
    {
      name: "Whole Chicken With Skin",
      text: "Farm-fresh whole bird, dressed and cleaned.",
      image: chickenImage("Whole Chicken With Skin"),
    },
    {
      name: "Whole Chicken Without Skin",
      text: "Skinless whole bird for lighter cooking.",
      image: chickenImage("Whole Chicken WithOut Skin"),
    },
    {
      name: "Tandoor Chicken",
      text: "Whole chicken prepared for tandoor and grill.",
      image: chickenImage("Tandoor Chicken"),
    },
    {
      name: "Gavran/Country Chicken",
      text: "Free-range country chicken with a rich, authentic taste.",
      image:
        "https://images.pexels.com/photos/19038587/pexels-photo-19038587.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "White Eggs (pc)",
      text: "Fresh white eggs, sold per piece.",
      image:
        "https://images.pexels.com/photos/6700695/pexels-photo-6700695.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
  ],

  Mutton: [
    {
      name: "Mutton Curry Cut",
      text: "Fresh cuts prepared for rich Indian curries.",
      image:
        mediaImage("mutton", "Mutton Curry Cut") ??
        "https://images.pexels.com/photos/6281509/pexels-photo-6281509.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "Mutton Boneless",
      text: "Tender boneless mutton for kebabs and fry.",
      image:
        mediaImage("mutton", "Mutton Boneless") ??
        "https://images.pexels.com/photos/4411696/pexels-photo-4411696.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "Mutton Chops",
      text: "Tender chops with rich natural flavour.",
      image:
        mediaImage("mutton", "Mutton Chops") ??
        "https://images.pexels.com/photos/31732110/pexels-photo-31732110.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "Mutton Shoulder",
      text: "Flavourful shoulder cut, ideal for slow cooking.",
      image:
        mediaImage("mutton", "Mutton Shoulder") ??
        "https://images.pexels.com/photos/31732115/pexels-photo-31732115.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "Mutton Leg",
      text: "Lean leg cut for roasts and biryani.",
      image:
        mediaImage("mutton", "Mutton Leg") ??
        "https://images.pexels.com/photos/36691281/pexels-photo-36691281.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "Mutton Paya",
      text: "Cleaned trotters for traditional, rich paya soup.",
      image:
        mediaImage("mutton", "Mutton Paya") ??
        "https://images.pexels.com/photos/36691295/pexels-photo-36691295.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "Mutton Brain",
      text: "Fresh, cleaned brain for classic fry dishes.",
      image:
        mediaImage("mutton", "Mutton Brain") ??
        "https://images.pexels.com/photos/6281509/pexels-photo-6281509.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "Mutton Liver",
      text: "Fresh liver, cleaned and ready to cook.",
      image:
        mediaImage("mutton", "Mutton Liver") ??
        "https://images.pexels.com/photos/4411696/pexels-photo-4411696.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
  ],

  "Fish & Seafood": [
    {
      name: "Fresh Sea Fish",
      text: "Fresh fish selected for everyday cooking.",
      image:
        "https://images.pexels.com/photos/37092459/pexels-photo-37092459.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "Fresh Fish",
      text: "Freshly sourced fish with natural flavour.",
      image:
        "https://images.pexels.com/photos/3650159/pexels-photo-3650159.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "Seafood Selection",
      text: "A selection of fresh seafood cuts.",
      image:
        "https://images.pexels.com/photos/3903587/pexels-photo-3903587.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "Fresh Fish Market Cut",
      text: "Carefully selected fish prepared fresh.",
      image:
        "https://images.pexels.com/photos/36122229/pexels-photo-36122229.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "Fresh Seafood",
      text: "Quality seafood for your favourite recipes.",
      image:
        "https://images.pexels.com/photos/10727383/pexels-photo-10727383.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "Fish on Ice",
      text: "Fresh fish ready for your kitchen.",
      image:
        "https://images.pexels.com/photos/27553354/pexels-photo-27553354.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
  ],

  "Farm Eggs": [
    {
      name: "Farm Fresh Eggs",
      text: "Fresh eggs selected for everyday meals.",
      image:
        "https://images.pexels.com/photos/30805254/pexels-photo-30805254.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "Country Eggs",
      text: "Fresh eggs with naturally rich yolks.",
      image:
        "https://images.pexels.com/photos/15428991/pexels-photo-15428991.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "Brown Farm Eggs",
      text: "Fresh brown eggs from trusted farms.",
      image:
        "https://images.pexels.com/photos/29802845/pexels-photo-29802845.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "Fresh Egg Selection",
      text: "Naturally fresh eggs for everyday cooking.",
      image:
        "https://images.pexels.com/photos/22764388/pexels-photo-22764388.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "Farm Egg Collection",
      text: "Fresh eggs carefully selected for quality.",
      image:
        "https://images.pexels.com/photos/30805251/pexels-photo-30805251.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      name: "Fresh Eggs",
      text: "Farm-fresh eggs for your everyday kitchen.",
      image:
        "https://images.pexels.com/photos/30805259/pexels-photo-30805259.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
  ],
};

// URL slug -> category name, used by links like /catalog?category=mutton
const categorySlugs = {
  chicken: "Chicken",
  mutton: "Mutton",
  fish: "Fish & Seafood",
  eggs: "Farm Eggs",
};

export default function CatalogPage() {
  const [searchParams] = useSearchParams();
  const categoryParam = categorySlugs[searchParams.get("category")];
  const [active, setActive] = useState(categoryParam ?? "All Cuts");
  const [page, setPage] = useState(1);
  const productsRef = useRef(null);
  const reduce = useReducedMotion();

  // Arriving from a "Explore products" link: show that category and jump
  // straight to the product cards instead of the page header.
  useEffect(() => {
    if (!categoryParam) return;
    setActive(categoryParam);
    setPage(1);
    const timer = setTimeout(() => {
      productsRef.current?.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "start",
      });
    }, 350);
    return () => clearTimeout(timer);
  }, [categoryParam, reduce]);

  const reveal = (delay = 0, y = 32) => ({
    initial: reduce ? false : { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.8, delay, ease: EASE },
  });

  const visibleProducts =
    active === "All Cuts"
      ? Object.values(products).flat()
      : products[active];

  const totalPages = Math.ceil(visibleProducts.length / PAGE_SIZE);
  const pagedProducts = visibleProducts.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  // Mobile shows a sliding window of 3 page numbers around the current page
  const windowStart = Math.max(1, Math.min(page - 1, totalPages - 2));
  const inMobileWindow = (n) => n >= windowStart && n < windowStart + 3;

  const goToPage = (p) => {
    setPage(p);
    productsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="min-h-screen bg-white text-[#171719]">

      {/* ================= HEADER ================= */}
      <section className="px-6 pb-10 pt-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[1320px]">

          <motion.p {...reveal(0, 16)} className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#EC1F36]">
            Fresh Protein Range
          </motion.p>

          <motion.h1 {...reveal(0.1)} className="max-w-3xl text-4xl font-semibold tracking-tight lg:text-6xl">
            Our Farm-Fresh Cuts
          </motion.h1>

          <motion.p {...reveal(0.2, 20)} className="mt-4 max-w-xl text-base leading-7 text-neutral-500">
            Carefully selected cuts, prepared fresh for everyday cooking.
          </motion.p>

        </div>
      </section>


      {/* ================= PROMO + CATEGORIES ================= */}
      <section className="px-6 pb-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-[1320px] gap-5 lg:grid-cols-[0.7fr_1.8fr]">

          {/* PROMO */}
          <motion.div {...reveal(0, 40)} className="flex min-h-[170px] flex-col justify-between rounded-[24px] bg-[#EC1F36] p-6 text-white lg:p-7">

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                Legacy of Freshness
              </p>

              <h2 className="mt-3 max-w-xs text-2xl font-semibold leading-tight">
                Fresh cuts, honest quality every day.
              </h2>
            </div>

            <Link
  to="/contact"
  className="mt-5 inline-flex w-fit items-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#EC1F36] transition hover:bg-neutral-100"
>
  Contact Now →
</Link>

          </motion.div>


          {/* CATEGORIES */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">

            {categories.map((category, i) => {
              return (
                <motion.button
                  key={category.name}
                  {...reveal(0.1 + i * 0.08, 40)}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setActive(category.name);
                    setPage(1);
                  }}
                  className="group flex min-h-[210px] flex-col items-center justify-center rounded-[26px] border border-neutral-200 bg-[#FAFAFA] p-4 text-center transition-all duration-300 hover:border-[#EC1F36] hover:bg-[#FFF4F5] hover:shadow-lg hover:shadow-[#EC1F36]/10"
                >
                  <div className="mb-4 h-28 w-28 overflow-hidden rounded-full bg-white ring-2 ring-transparent ring-offset-2 transition-all duration-500 group-hover:scale-105 group-hover:ring-[#EC1F36]"
                  >
                    <img
                      src={category.image}
                      alt={category.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <span className="max-w-[120px] text-sm font-semibold leading-5 text-[#171719] transition-colors duration-300 group-hover:text-[#EC1F36]">
                    {category.name}
                  </span>
                </motion.button>
              );
            })}

          </div>
        </div>
      </section>


      {/* ================= PRODUCTS ================= */}
      <section ref={productsRef} className="scroll-mt-24 px-6 pb-24 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[1320px]">

          {/* SECTION TITLE */}
          <motion.div {...reveal()} className="mx-auto mb-8 max-w-[1320px]">

            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400">
              {active}
            </p>

            <h2 className="mt-2 text-3xl font-semibold tracking-tight lg:text-4xl">
              Freshly <span className="text-[#EC1F36]">prepared</span>
            </h2>

          </motion.div>


          {/* PRODUCT GRID */}
          <div key={active} className="mx-auto grid max-w-[1320px] grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-6 sm:gap-y-9 lg:grid-cols-3">

            {pagedProducts.map((product, i) => (
              <motion.article
                key={product.name}
                {...reveal((i % 3) * 0.1, 48)}
                className="group"
              >
                <div className="relative aspect-[16/11] overflow-hidden rounded-2xl bg-neutral-100 sm:rounded-[22px]">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[9px] sm:left-4 sm:top-4 sm:px-3 sm:py-1 sm:text-[11px] font-semibold uppercase tracking-wider text-neutral-700 backdrop-blur">
                    Fresh
                  </span>
                </div>

                <div className="flex flex-col items-start gap-2 px-1 pt-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:pt-4">
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold leading-snug tracking-tight sm:text-lg">
                      {product.name}
                    </h3>
                    <p className="mt-1 hidden text-sm leading-6 text-neutral-500 sm:block">
                      {product.text}
                    </p>
                  </div>

                  <Link
                    to="/contact"
                    aria-label={`Order ${product.name}`}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#EC1F36] px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-[#c9172d] sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm"
                  >
                    Order Now
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </motion.article>
            ))}

          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <nav aria-label="Pagination" className="mt-12 flex items-center justify-center space-x-2 sm:space-x-4">
              <button
                type="button"
                aria-label="Previous page"
                disabled={page === 1}
                onClick={() => goToPage(page - 1)}
                className="flex h-9 w-9 shrink-0 items-center justify-center text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EC1F36] rotate-180 text-neutral-600 hover:text-[#EC1F36] disabled:cursor-default disabled:text-neutral-300 sm:rounded-full sm:border sm:border-neutral-300 sm:hover:border-[#EC1F36] sm:disabled:bg-neutral-100 sm:disabled:text-neutral-400 sm:disabled:hover:border-neutral-300 sm:disabled:hover:text-neutral-400"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="size-3 overflow-visible" fill="currentColor" viewBox="0 0 451.846 451.847" aria-hidden="true"><path d="M345.441 248.292 151.154 442.573c-12.359 12.365-32.397 12.365-44.75 0-12.354-12.354-12.354-32.391 0-44.744L278.318 225.92 106.409 54.017c-12.354-12.359-12.354-32.394 0-44.748 12.354-12.359 32.391-12.359 44.75 0l194.287 194.284c6.177 6.18 9.262 14.271 9.262 22.366 0 8.099-3.091 16.196-9.267 22.373" /></svg>
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  aria-current={n === page ? "page" : undefined}
                  onClick={() => goToPage(n)}
                  className={`${inMobileWindow(n) ? "flex" : "hidden sm:flex"} h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EC1F36] ${
                    n === page
                      ? "border-[#EC1F36] bg-[#EC1F36] text-white"
                      : "border-neutral-300 text-[#171719] hover:border-[#EC1F36] hover:bg-[#FFF4F5] hover:text-[#EC1F36]"
                  }`}
                >
                  {n}
                </button>
              ))}

              <button
                type="button"
                aria-label="Next page"
                disabled={page === totalPages}
                onClick={() => goToPage(page + 1)}
                className="flex h-9 w-9 shrink-0 items-center justify-center text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EC1F36] text-neutral-600 hover:text-[#EC1F36] disabled:cursor-default disabled:text-neutral-300 sm:rounded-full sm:border sm:border-neutral-300 sm:hover:border-[#EC1F36] sm:disabled:bg-neutral-100 sm:disabled:text-neutral-400 sm:disabled:hover:border-neutral-300 sm:disabled:hover:text-neutral-400"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="size-3 overflow-visible" fill="currentColor" viewBox="0 0 451.846 451.847" aria-hidden="true"><path d="M345.441 248.292 151.154 442.573c-12.359 12.365-32.397 12.365-44.75 0-12.354-12.354-12.354-32.391 0-44.744L278.318 225.92 106.409 54.017c-12.354-12.359-12.354-32.394 0-44.748 12.354-12.359 32.391-12.359 44.75 0l194.287 194.284c6.177 6.18 9.262 14.271 9.262 22.366 0 8.099-3.091 16.196-9.267 22.373" /></svg>
              </button>
            </nav>
          )}

        </div>
      </section>

    </main>
  );
}