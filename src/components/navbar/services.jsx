import React from "react";

function Services() {
  return (
    <div className="py-16 bg-zinc-900 pt-1 pb-1 font-archivo ">
      <div className="container m-auto px-6  text-gray-400 md:px-12 xl:px-0">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl m-1 mb-10">
            Our Services
          </h2>
        </div>
        <div className="mx-auto grid gap-6 md:w-3/4 lg:w-full lg:grid-cols-3">
          <div className="bg-zinc-800 rounded-2xl shadow-xl px-8 py-12 sm:px-12 lg:px-8">
            <div className="mb-12 space-y-4">
              <h3 className="text-2xl font-semibold text-white pt-5 pb-5">
                Web-to-Print Services
              </h3>
              <p className="mb-6">
                Online ordering system allows customers to submit print orders
                directly through your website.
              </p>
              <img
                src="https://tailus.io/sources/blocks/end-image/preview/images/graphic.svg"
                className="w-2/3 ml-auto"
                alt="illustration"
                loading="lazy"
                width="900"
                height="600"
              />
            </div>
          </div>
          <div className="bg-zinc-800 rounded-2xl shadow-xl px-8 py-12 sm:px-12 lg:px-8">
            <div className="mb-12 space-y-4 pt-5 pb-5">
              <h3 className="text-2xl font-semibold text-white pb-5">
                Prepress Services
              </h3>
              <p className="mb-6">
                Assistance with file preparation, color correction, and proofing
                before printing.
              </p>
              <img
                src="https://tailus.io/sources/blocks/end-image/preview/images/ui-design.svg"
                className="w-2/3 ml-auto"
                alt="illustration"
                loading="lazy"
                width="900"
                height="600"
              />
            </div>
          </div>
          <div className="bg-zinc-800 rounded-2xl shadow-xl px-8 py-12 sm:px-12 lg:px-8">
            <div className="mb-12 space-y-4 pt-5 pb-5">
              <h3 className="text-2xl font-semibold text-white pb-5">
                Binding and Finishing
              </h3>
              <p className="mb-6">
                Options such as cutting, folding, binding (saddle stitch,
                perfect binding, coil binding, etc.), laminating, and other
                finishing touches
              </p>
              <img
                src="https://tailus.io/sources/blocks/end-image/preview/images/ux-design.svg"
                className="w-2/3 ml-auto"
                alt="illustration"
                loading="lazy"
                width="900"
                height="600"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
