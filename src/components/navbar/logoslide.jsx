import React, { useEffect, useRef } from 'react';

// Adjusted imports at the top of your file
import logo1 from "../images/laxmibanklogo.png";
import logo2 from "../images/gokarnalogo.png";
import logo3 from "../images/lincolnlogo.png";
import logo4 from "../images/nepalpolice.png";
import logo5 from "../images/hanlogo.png";
import logo7 from "../images/patanmueseum.png";
import logo8 from "../images/tbclogo.png";
import logo9 from "../images/deerwalk.png";
import logo10 from "../images/NAC.png";

// Create an array of objects with image paths and attributes
const logosData = [
  { src: logo1, alt: "Laxmi Bank Logo", width: 120, height: 120 },
  { src: logo2, alt: "Gokarna Logo", width: 120, height: 120 },
  { src: logo3, alt: "Lincoln Logo", width: 400, height: 400 },
  { src: logo4, alt: "Nepal Police Logo", width: 320, height: 320 },
  { src: logo5, alt: "Han Logo", width: 120, height: 120 },
  { src: logo7, alt: "Patan Museum Logo", width: 120, height: 120 },
  { src: logo8, alt: "TBC Logo", width: 120, height: 120 },
  { src: logo9, alt: "Deerwalk Logo", width: 120, height: 120 },
  { src: logo10, alt: "NAC Logo", width: 120, height: 120 },
];

const InfiniteLogoSlider = () => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    let animationId;

    const animate = () => {
      if (slider.scrollLeft >= slider.scrollWidth / 2) {
        slider.scrollLeft = 0;
      } else {
        slider.scrollLeft += 1;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="w-full overflow-hidden bg-white py-8">
      <div
        ref={sliderRef}
        className="flex space-x-8 overflow-x-hidden"
        style={{ scrollBehavior: 'auto', whiteSpace: 'nowrap' }}
      >
        {/* Map over the adjusted logosData array */}
        {[...logosData, ...logosData].map((logoData, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[12rem] h-[12rem] flex items-center justify-center"
          >
            <img
              src={logoData.src}
              alt={logoData.alt}
              width={logoData.width}
              height={logoData.height}
              className="max-w-full max-h-[8rem] object-contain transition-all duration-300 ease-in-out grayscale hover:grayscale-0"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteLogoSlider;
