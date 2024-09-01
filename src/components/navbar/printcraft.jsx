import React, { useState } from "react";
import livingimage1 from "../images/living/1.jpg";
import livingimage2 from "../images/living/2.jpg";
import livingimage3 from "../images/living/3.jpg";

import ecs1 from "../images/ecs/1.jpg";
import ecs2 from "../images/ecs/2.jpg";
import ecs3 from "../images/ecs/3.jpg";

import wb1 from "../images/wb/wb1.jpg";
import wb2 from "../images/wb/wb2.jpg";
import wb3 from "../images/wb/wb3.jpg";

import b1 from "../images/build/wb1.jpg";
import b2 from "../images/build/wb2.jpg";
import b3 from "../images/build/wb3.jpg";

// Move "ECS Nepal" to the first position in the categories array
const categories = ["ECS Nepal", "Wedding Bells", "Build", "Living"];

const imageData = {
  Living: [
    { src: livingimage1, alt: "Kinfolk Magazine" },
    { src: livingimage2, alt: "SoltGoes Magazine" },
    { src: livingimage3, alt: "Vogue Magazine" },
  ],
  "ECS Nepal": [
    { src: ecs1, alt: "Kinfolk Magazine" },
    { src: ecs2, alt: "SoltGoes Magazine" },
    { src: ecs3, alt: "Vogue Magazine" },
  ],
  "Wedding Bells": [
    { src: wb1, alt: "Wedding Image 1" },
    { src: wb2, alt: "Wedding Image 2" },
    { src: wb3, alt: "Wedding Image 3" },
  ],
  Build: [
    { src: b3, alt: "Build Image 1" },
    { src: b2, alt: "Build Image 2" },
    { src: b1, alt: "Build Image 3" },
  ],
  Friday: [
    { src: "", alt: "Friday Image 1" },
    { src: "", alt: "Friday Image 2" },
    { src: "", alt: "Friday Image 3" },
  ],
};

function PrintCraft() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  return (
    <div className="bg-white py-[2rem] max-sm:p-7">
      <div className="container mx-auto px-4 min-h-[550px] font-archivo">
        <h1 className="text-5xl font-semibold text-center mb-2">
          CURIOUS ABOUT OUR <span className="text-pink-600">CRAFT?</span>
        </h1>
        <p className="text-center mb-10 mt-[15px] font-archivo">
          Enter Our Realm Of Printing Excellence
        </p>

        <div className="flex justify-center space-x-10 mb-12 font-archivo">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 ${
                activeCategory === category
                  ? "text-pink-600 border-b-2 border-pink-600"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-[4rem] mt-9 overflow-x-auto">
          {imageData[activeCategory] &&
            imageData[activeCategory].map((image, index) => (
              <div
                key={index}
                className={`p-4 ${
                  index === 1 ? "w-full md:w-[29%]" : "w-full md:w-[23%]"
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto"
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default PrintCraft;
