import { useRef, useEffect } from "react";
import React from 'react';
import serviceslide1 from "../images/slideimg1.png";
import serviceslide2 from "../images/slideimg2.png";
import serviceslide3 from "../images/slideimg3.png";
import serviceslide4 from "../images/slideimg4.png";

const services = [
  {
    title: 'Online Order Service',
    subtitle: 'Convenience at Your Fingertips',
    description: 'Seamlessly place your print orders online with our intuitive platform. From selecting products to customizing designs, our online service makes the process effortless. Upload your files, review proofs, and finalize your order—all from the comfort of your home or office. Experience hassle-free printing with just a few clicks.',
  },
  {
    image: serviceslide1
  },
  {
    title: 'Pre-Press Service',
    subtitle: 'Perfect Prints Begin Here',
    description: 'Ensure flawless print quality with our meticulous pre-press service. Our experts meticulously check your files, adjust colors, and prepare your designs for optimal printing. With precision and care, we ensure every detail is perfect, so your prints turn out exactly as you envisioned.',
  },
  {
    image: serviceslide2
  },
  {
    title: 'Third Service',
    subtitle: 'Service Subtitle Here',
    description: 'Service description goes here. Ensure your content is concise and informative.',
  },
  {
    image: serviceslide3
  },
  {
    title: 'Final Service',
    subtitle: 'Another Service Subtitle',
    description: 'Another service description here. Detail the unique aspects of this service.',
  },
  {
    image: serviceslide4
  }
];

const ServiceCarousel = () => {
  const carouselRef = useRef(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    let isDown = false;
    let startX;
    let scrollLeft;

    const handleMouseDown = (e) => {
      isDown = true;
      carousel.classList.add('active');
      startX = e.pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDown = false;
      carousel.classList.remove('active');
    };

    const handleMouseUp = () => {
      isDown = false;
      carousel.classList.remove('active');
    };

    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 2; // Adjust scroll speed
      carousel.scrollLeft = scrollLeft - walk;
    };

    const handleWheel = (e) => {
      e.preventDefault();
      carousel.scrollLeft += e.deltaY;
    };

    carousel.addEventListener('mousedown', handleMouseDown);
    carousel.addEventListener('mouseleave', handleMouseLeave);
    carousel.addEventListener('mouseup', handleMouseUp);
    carousel.addEventListener('mousemove', handleMouseMove);
    carousel.addEventListener('wheel', handleWheel);

    return () => {
      carousel.removeEventListener('mousedown', handleMouseDown);
      carousel.removeEventListener('mouseleave', handleMouseLeave);
      carousel.removeEventListener('mouseup', handleMouseUp);
      carousel.removeEventListener('mousemove', handleMouseMove);
      carousel.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 lg:mt-[-8rem] lg:mb-[8rem]">
      <h2 className="text-3xl font-bold text-center mb-2">Precision. Creativity. Excellence</h2>
      <p className="text-center mb-8 text-gray-600">Our service offerings</p>

      <div
        ref={carouselRef}
        className="carousel carousel-center w-full p-4 space-x-8 overflow-x-auto scrollbar-hide cursor-grab"
      >
        {services.map((service, index) => (
          <div
            key={index}
            className="carousel-item w-[90%] sm:w-[60%] md:w-[40%] lg:w-[27%] flex-shrink-0"
          >
            {service.title ? (
              <div className="text-content p-9 bg-[#F4F4F4] h-full w-full">
                <h3 className="text-[#9D1C79] font-semibold mb-2">{service.title}</h3>
                <h4 className="text-2xl font-bold mb-4">{service.subtitle}</h4><br></br>
                <p className="text-[#3D3B3B]">{service.description}</p>
              </div>
            ) : (
              <img
                src={service.image}
                alt="Service Image"
                className="w-full h-auto object-cover"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceCarousel;