import React from "react";
import BookLogo from "../../assets/icons/book.svg";
import Poster from "../../assets/icons/poster.svg";
import Banner from "../../assets/icons/banner.svg";
import Van from "../../assets/icons/van.svg";

function Pricing() {
  return (
    <section className="bg-gray-100 py-12 font-archivo pt-5 pb-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-b1 sm:text-5xl mt-10">
            Printing Options
          </h2>
          <p className="mt-4 text-xl text-gray-600 m-5">
            Simple, transparent printing for your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-7 p-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition duration-300">
            <div className="mb-8">
              <h3 className="text-2xl pb-5 font-semibold text-b1">Booklets</h3>
              <p className="mt-4 text-gray-700">
                Booklet printing service is tailored to meet your unique needs
                and exceed your expectations.
              </p>
            </div>
            <div className="mb-8 flex justify-center">
              <img
                src={BookLogo}
                alt="Booklets"
                className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32"
              />
            </div>

            <ul className="mb-8 space-y-4 text-gray-700">
              <li className="flex items-center">
                <svg
                  className="h-6 w-6 text-r1 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Juju Stitch Binding</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="h-6 w-6 text-r1 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Custom Covers</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="h-6 w-6 text-r1 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Perfect Binding</span>
              </li>
            </ul>
            {/* <a
          href="#"
          className="block w-full py-3 px-6 text-center rounded-md text-white font-medium bg-gradient-to-r p-5 bg-o1 hover:bg-y1"
        >
          Sign Up
        </a> */}
          </div>

          <div className="bg-white rounded-lg shadow-xl p-6 transform hover:scale-105 transition duration-300">
            <div className="mb-8">
              <h3 className="text-2xl pb-5 font-semibold text-b1">Posters</h3>
              <p className="mt-4 text-gray-700">
                Transform your ideas into vibrant visual displays with our
                professional poster printing service
              </p>
            </div>
            <div className="mb-8 flex justify-center">
              <img
                src={Poster}
                alt="Posters"
                className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32"
              />
            </div>
            <ul className="mb-8 space-y-4 text-gray-700">
              <li className="flex items-center">
                <svg
                  className="h-6 w-6 text-r1 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Standard (11" x 17")</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="h-6 w-6 text-r1 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Large Format (24" x 36")</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="h-6 w-6 text-r1 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Mounting and Lamination</span>
              </li>
            </ul>
            {/* <a
          href="#"
          className="block w-full py-3 px-6 text-center rounded-md text-white font-medium bg-gradient-to-r p-5 bg-o1 hover:bg-y1"
        >
          Get Started
        </a> */}
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition duration-300">
            <div className="mb-8">
              <h3 className="text-2xl pb-5 font-semibold text-b1">Banners</h3>
              <p className="mt-4 text-gray-700">
                Make a bold statement with our high-quality banner printing
                services to suit your specific needs
              </p>
            </div>
            <div className="mb-8 flex justify-center">
              <img
                src={Banner}
                alt="Banners"
                className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32"
              />
            </div>
            <ul className="mb-8 space-y-4 text-gray-700">
              <li className="flex items-center">
                <svg
                  className="h-6 w-6 text-r1 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Vinyl Banners</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="h-6 w-6 text-r1 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Fabric Banners</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="h-6 w-6 text-r1  mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Grommets and Hemming</span>
              </li>
            </ul>
            {/* <a
          href="#"
          className="block w-full py-3 px-6 text-center rounded-md text-white font-medium bg-gradient-to-r p-5 bg-o1 hover:bg-y1"
        >
          Get Started
        </a> */}
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition duration-300">
            <div className="mb-8">
              <h3 className="text-2xl pb-5 font-semibold text-b1">
                Additional Services
              </h3>
              <p className="mt-4 text-gray-700">
                Our additional services are designed to ensure a seamless
                printing experience from start to finish.
              </p>
            </div>
            <div className="mb-8 flex justify-center">
              <img
                src={Van}
                alt="Additional Services"
                className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32"
              />
            </div>
            <ul className="mb-8 space-y-4 text-gray-700">
              <li className="flex items-center">
                <svg
                  className="h-6 w-6 text-r1 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Rush Orders</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="h-6 w-6 text-r1 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Shipping and Delivery</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="h-6 w-6 text-r1 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Cutting, and Binding</span>
              </li>
            </ul>
            {/* <a
          href="#"
          className="block w-full py-3 px-6 text-center rounded-md text-white font-medium bg-gradient-to-r p-5 bg-o1 hover:bg-y1"
        >
          Contact Sales
        </a> */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Pricing;
