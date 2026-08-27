import React from "react";

const Featured: React.FC = () => {
  const brands = [
    "Shopify",
    "Awwwards",
    "Muzli",
    "Mindsparkle Mag",
    "Webdesigner Depot",
    "Creative Bloq",
    "Lapa Ninja",
    "Typewolf",
    "CSS Design Awards",
  ];

  return (
    <section id="featured" className="py-12 border-y border-white/10 bg-white/[0.01] overflow-hidden">
      <div className="marquee-wrapper relative flex overflow-x-hidden select-none">
        <div className="marquee-track flex whitespace-nowrap animate-marquee font-display font-extrabold text-2xl sm:text-3xl text-white/30 uppercase tracking-wider">
          {brands.map((brand, i) => (
            <React.Fragment key={i}>
              <span className="mx-8">{brand}</span>
              <span className="mx-8">•</span>
            </React.Fragment>
          ))}
        </div>
        <div
          className="marquee-track flex whitespace-nowrap animate-marquee font-display font-extrabold text-2xl sm:text-3xl text-white/30 uppercase tracking-wider"
          aria-hidden="true"
        >
          {brands.map((brand, i) => (
            <React.Fragment key={`repeat-${i}`}>
              <span className="mx-8">{brand}</span>
              <span className="mx-8">•</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Featured;
