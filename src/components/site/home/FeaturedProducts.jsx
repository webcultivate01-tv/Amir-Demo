import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { EggCartonIcon } from "./EggIcon";

// Bundled WebP product photos (images/products/<category>/<name>.webp)
const productImages = import.meta.glob("../../../../images/products/*/*.webp", {
  eager: true,
  import: "default",
});
const photo = (folder, file) =>
  productImages[`../../../../images/products/${folder}/${file}.webp`];

const EASE = [0.22, 1, 0.36, 1];

const featured = [
  {
    name: "Chicken Breast Boneless",
    category: "Chicken",
    text: "Lean, tender boneless breast for grills and curries.",
    image: photo("chicken", "Chicken Breast Boneless"),
    tint: "from-[#FFF1F2] to-[#FFE0E3]",
  },
  {
    name: "Chicken Lollipop",
    category: "Chicken",
    text: "Party-ready wings, cleaned and trimmed to perfection.",
    image: photo("chicken", "Chicken Lollipop"),
    tint: "from-[#FFF6EC] to-[#FFE6CC]",
  },
  {
    name: "Mutton Curry Cut",
    category: "Mutton",
    text: "Fresh bone-in pieces cut for slow, rich curries.",
    image: photo("mutton", "Mutton Curry Cut"),
    tint: "from-[#FDEFEF] to-[#F6D3D6]",
  },
  {
    name: "Farm Fresh Eggs",
    category: "Eggs",
    text: "Farm-fresh eggs, carefully packed for everyday cooking and baking.",
    image: photo("eggs", "Egg Tray"),
    tint: "from-[#FFF8E8] to-[#F3DFAF]",
  },
];

function ProductCard({ product, index, reduce, isEggTarget }) {
  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: index * 0.12, ease: EASE }}
      className="group"
    >
      <Link
        to="/contact"
        className="flex h-full flex-col overflow-hidden rounded-2xl border sm:rounded-[1.75rem] border border-neutral-200/80 bg-white transition-all duration-500 hover:-translate-y-2 hover:border-[#EC1F36]/30 hover:shadow-[0_28px_60px_-24px_rgba(236,31,54,0.35)]"
      >
        <div
          id={isEggTarget ? "egg-flight-target" : undefined}
          className={`relative aspect-[4/3.4] overflow-hidden bg-gradient-to-br ${product.tint}`}
        >
          <span className="absolute left-2 top-2 z-10 rounded-full bg-white/90 px-2 py-0.5 text-[9px] font-semibold sm:left-4 sm:top-4 sm:px-3 sm:py-1 sm:text-[11px] uppercase tracking-[0.14em] text-[#EC1F36] backdrop-blur">
            {product.category}
          </span>

          <div className="absolute -bottom-10 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-white/60 blur-2xl" />

          {product.art ? (
            <product.art className="relative h-full w-full object-contain p-6 transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-rotate-1" />
          ) : (
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="relative h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-rotate-1"
            />
          )}
        </div>

        <div className="flex flex-1 flex-col p-3 sm:p-6">
          <h3 className="text-sm font-semibold leading-snug tracking-tight text-[#171719] sm:text-xl">
            {product.name}
          </h3>

          <p className="mt-1 hidden flex-1 text-[15px] leading-6 text-neutral-500 sm:mt-2 sm:block">
            {product.text}
          </p>

          <span className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-[#EC1F36] px-3.5 py-2 text-xs font-semibold sm:mt-6 sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm text-white transition-colors duration-300 group-hover:bg-[#171719]">
            Order now
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
            >
              →
            </span>
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

export default function FeaturedProducts() {
  const reduce = useReducedMotion();

  return (
    <section
      id="featured-products-section"
      aria-label="Featured products"
      className="relative overflow-hidden bg-[#FBF8F7] px-4 pb-10 pt-20 sm:px-8 sm:py-20 lg:px-16 lg:py-28"
    >
      <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-[#EC1F36]/[0.06] blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-[#EC1F36]/[0.05] blur-3xl" />

      <div className="relative mx-auto max-w-[1480px]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#EC1F36]">
              Featured Products
            </p>

            <h2 className="mt-3 text-[2.15rem] font-semibold leading-[1.05] tracking-[-0.04em] text-[#171719] sm:mt-4 sm:text-6xl sm:leading-[0.95] sm:tracking-[-0.05em]">
              Customer favourites,
              <br />
              <span className="text-[#EC1F36]">picked fresh.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            className="max-w-md"
          >
            <p className="text-[15px] leading-6 text-neutral-600 sm:text-base sm:leading-7 sm:text-neutral-500">
              The cuts our customers reach for most, handled with care and
              delivered fresh from our stores.
            </p>

            <Link
              to="/catalog"
              className="mt-5 hidden items-center gap-2 rounded-full bg-[#171719] px-6 sm:inline-flex py-3 text-sm font-semibold text-white transition-colors hover:bg-[#EC1F36]"
            >
              Shop all products <span aria-hidden="true">↗</span>
            </Link>
          </motion.div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-6 lg:grid-cols-4">
          {featured.map((product, index) => (
            <ProductCard
              key={product.name}
              product={product}
              index={index}
              reduce={reduce}
              isEggTarget={index === featured.length - 1}
            />
          ))}
        </div>

        <div className="mt-8 flex justify-center sm:hidden">
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 rounded-full bg-[#171719] px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#EC1F36]"
          >
            See more products <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
