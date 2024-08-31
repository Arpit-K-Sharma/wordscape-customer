import { useRef, useEffect } from "react";
import React from "react";
import { ShoppingCart, CheckCircle, Settings, Star } from "lucide-react";

const services = [
  {
    title: "Online Order Service",
    subtitle: "Convenience at Your Fingertips",
    description:
      "Seamlessly place your print orders online with our intuitive platform. From selecting products to customizing designs, our online service makes the process effortless. Upload your files, review proofs, and finalize your order—all from the comfort of your home or office. Experience hassle-free printing with just a few clicks.",
    icon: <ShoppingCart size={48} color="#9D1C79" />,
  },
  {
    title: "Pre-Press Service",
    subtitle: "Perfect Prints Begin Here",
    description:
      "Ensure flawless print quality with our meticulous pre-press service. Our experts meticulously check your files, adjust colors, and prepare your designs for optimal printing. With precision and care, we ensure every detail is perfect, so your prints turn out exactly as you envisioned.",
    icon: <CheckCircle size={48} color="#9D1C79" />,
  },
  {
    title: "Post Press Service",
    subtitle: "Post Press Services",
    description:
      "Enhance the final product with our comprehensive post-press services. From binding and wiro to laminating and cutting, we ensure your prints are finished to perfection. Our post-press solutions add the professional touch your projects deserve.",
    icon: <Settings size={48} color="#9D1C79" />,
  },
  {
    title: "Delivery Service",
    subtitle: "Timely and Reliable",
    description:
      "Experience the convenience of our reliable delivery service. We ensure your printed materials are delivered safely and on time, right to your doorstep. Whether it's a small batch or a large shipment, our delivery team handles your orders with care and efficiency. Track your delivery in real-time and enjoy peace of mind knowing your prints are in good hands.",
    icon: <Star size={48} color="#9D1C79" />,
  },
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
      carousel.classList.add("active");
      startX = e.pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDown = false;
      carousel.classList.remove("active");
    };

    const handleMouseUp = () => {
      isDown = false;
      carousel.classList.remove("active");
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

    carousel.addEventListener("mousedown", handleMouseDown);
    carousel.addEventListener("mouseleave", handleMouseLeave);
    carousel.addEventListener("mouseup", handleMouseUp);
    carousel.addEventListener("mousemove", handleMouseMove);
    carousel.addEventListener("wheel", handleWheel);

    return () => {
      carousel.removeEventListener("mousedown", handleMouseDown);
      carousel.removeEventListener("mouseleave", handleMouseLeave);
      carousel.removeEventListener("mouseup", handleMouseUp);
      carousel.removeEventListener("mousemove", handleMouseMove);
      carousel.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div className="mx-auto px-4 py-10 lg:mt-[-8rem] lg:mb-[8rem] lg:max-w-7xl">
      <h2 className="text-3xl font-bold text-center mb-2">
        Precision. Creativity. Excellence
      </h2>
      <p className="text-center mb-8 text-gray-600">Our service offerings</p>

      <div
        ref={carouselRef}
        className="carousel carousel-center w-full p-4 space-x-8 overflow-x-auto scrollbar-hide cursor-grab"
      >
        {services.map((service, index) => (
          <div
            key={index}
            className="carousel-item w-[90%] sm:w-[60%] md:w-[40%] lg:w-[27%] flex-shrink-0 max-sm:w-[80%] max-sm:mr-4"
          >
            <div className="text-content p-9 bg-[#F4F4F4] h-full w-full flex flex-col items-center">
              {service.icon}
              <h3 className="text-[#9D1C79] font-semibold mb-2 mt-5">
                {service.title}
              </h3>
              <h4 className="text-2xl font-bold mb-4 mt-5">
                {service.subtitle}
              </h4>
              <p className="text-[#3D3B3B]">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceCarousel;
