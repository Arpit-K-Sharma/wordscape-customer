import React from "react";

function Products() {
  return (
    <div className="py-8 md:py-16 bg-gray-100 font-archivo">
      <div className="container mx-auto px-4 md:px-6 xl:px-0 text-zinc-800 lg:mt-[10%] max-sm:mt-[30%]">
        <div className="text-center mb-8 md:mb-12">
          <h2
            style={{ fontFamily: "Proxima Nova" }}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold text-zinc-800 mb-4 md:mt-[20%] lg:mt-[30%]"
          >
            DISCOVER THE ART OF PRINT
            <br className="hidden sm:block" />{" "}
            <span className="text-pink-600">OUR PRODUCT LINEUP</span>
          </h2>
        </div>
        <div className="grid gap-5 max-sm:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-md:gap-6">
          {[
            {
              title: "BROCHURES",
              subtitle: "Your Message, Artfully Folded!",
              description:
                "Elevate your brand with our eye-catching brochures, designed to communicate your message with clarity and style.",
            },
            {
              title: "BOOKLETS",
              subtitle: "Storytelling in Every Page Turn!",
              description:
                "Transform your ideas into captivating narratives with our high-quality booklets. Ideal for catalogs, manuals or presentations.",
            },
            {
              title: "POSTERS",
              subtitle: "Grab Attention, Inspire Action!",
              description:
                "Make a statement with our dynamic posters, designed to grab attention and convey your message loud and clear.",
            },
            {
              title: "BANNERS",
              subtitle: "Say It Boldly, Display It Proudly!",
              description:
                "Capture attention and make your presence known with our striking banners. Perfect for events, promotions, or storefronts.",
            },
            {
              title: "MAGAZINES",
              subtitle: "Turn Pages, Uncover Stories!",
              description:
                "Experience the allure of expertly printed magazines, designed to engage and entertain. From lifestyle to fashion, our magazines are crafted with stunning visuals.",
            },
            {
              title: "BUSINESS CARDS",
              subtitle: "First Impressions That Last!",
              description:
                "Leave a mark with our elegantly crafted business cards that speak volumes about your professionalism and style.",
            },
          ].map((product, index) => (
            <div
              key={index}
              className="bg-[#ECECEC] max-sm:mx-8 p-6 lg:w-auto lg:h-[18rem] flex flex-col justify-center mx-auto"
            >
              <div className="space-y-4 lg:space-y-5">
                <h3
                  style={{ fontFamily: "Proxima Nova" }}
                  className="text-xl md:text-2xl font-semibold text-zinc-800"
                >
                  {product.title}
                </h3>
                <p className="text-xs md:text-sm text-[#6D636A]">
                  {product.subtitle}
                </p>
                <p
                  style={{ fontFamily: "Proxima Nova" }}
                  className="text-sm md:text-base text-gray-800 mt-2 lg:mt-3"
                >
                  {product.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
