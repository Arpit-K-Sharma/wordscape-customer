import React from "react";

function Pricing() {
  return (
    <section className="bg-zinc-900 py-12 font-archivo pt-5 pb-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl mt-10">
            Printing Options
          </h2>
          <p className="mt-4 text-xl text-gray-400 m-5">
            Simple, transparent printing for your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-7 p-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-zinc-800 rounded-lg shadow-lg p-6 transform hover:scale-105 transition duration-300">
            <div className="mb-8">
              <h3 className="text-2xl pb-5 font-semibold text-white">
                Booklets
              </h3>
              <p className="mt-4 text-gray-400">
                Booklet printing service is tailored to meet your unique needs
                and exceed your expectations.
              </p>
            </div>
            <div className="mb-8">
              <span className="text-5xl font-extrabold">
                <img
                  className="ml-10"
                  width="100"
                  height="100"
                  src="https://img.icons8.com/ios/50/FAB005/pricing-structure.png"
                  alt="pricing-structure"
                />
              </span>
            </div>

            <ul className="mb-8 space-y-4 text-gray-400">
              <li className="flex items-center">
                <svg
                  className="h-6 w-6 text-r1 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
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
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
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
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
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

          <div className="bg-zinc-800 rounded-lg shadow-lg p-6 transform hover:scale-105 transition duration-300">
            <div className="mb-8">
              <h3 className="text-2xl pb-5 font-semibold text-white">
                Posters
              </h3>
              <p className="mt-4 text-gray-400">
                Transform your ideas into vibrant visual displays with our
                professional poster printing service
              </p>
            </div>
            <div className="mb-8">
              <span className="text-5xl font-extrabold">
                <img
                  className="ml-11"
                  width="100"
                  height="100"
                  src="https://img.icons8.com/external-icongeek26-outline-icongeek26/64/FAB005/external-poster-politic-icongeek26-outline-icongeek26.png"
                  alt="external-poster-politic-icongeek26-outline-icongeek26"
                />
              </span>
            </div>
            <ul className="mb-8 space-y-4 text-gray-400">
              <li className="flex items-center">
                <svg
                  className="h-6 w-6 text-r1 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
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
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
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
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
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
          <div className="bg-zinc-800 rounded-lg shadow-lg p-6 transform hover:scale-105 transition duration-300">
            <div className="mb-8">
              <h3 className="text-2xl pb-5 font-semibold text-white">
                Banners
              </h3>
              <p className="mt-4 text-gray-400">
                Make a bold statement with our high-quality banner printing
                services to suit your specific needs
              </p>
            </div>
            <div className="mb-8">
              <span className="text-5xl font-extrabold">
                <img
                  className="ml-11"
                  width="100"
                  height="100"
                  src="https://img.icons8.com/external-line-adri-ansyah/64/FAB005/external-islam-islam-and-ramadhan-line-adri-ansyah-22.png"
                  alt="external-islam-islam-and-ramadhan-line-adri-ansyah-22"
                />
              </span>
            </div>
            <ul className="mb-8 space-y-4 text-gray-400">
              <li className="flex items-center">
                <svg
                  className="h-6 w-6 text-r1 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
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
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
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
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
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

          <div className="bg-zinc-800 rounded-lg shadow-lg p-6 transform hover:scale-105 transition duration-300">
            <div className="mb-8">
              <h3 className="text-2xl pb-5 font-semibold text-white">
                Additional Services
              </h3>
              <p className="mt-4 text-gray-400">
                Our additional services are designed to ensure a seamless
                printing experience from start to finish.
              </p>
            </div>
            <div className="mb-8">
              <span className="text-5xl font-extrabold">
                <img
                  className="ml-11"
                  width="100"
                  height="100"
                  src="https://img.icons8.com/ios/50/FAB005/in-transit--v1.png"
                  alt="in-transit--v1"
                />
              </span>
            </div>
            <ul className="mb-8 space-y-4 text-gray-400">
              <li className="flex items-center">
                <svg
                  className="h-6 w-6 text-r1 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
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
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
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
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
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
