import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";

function FAQ() {
  return (
    <>
      <Navbar />

      <section class=" text-black py-32 font-archivo pl-1 pr-1 pt-6 pb-5">
        <div class="container flex flex-col justify-center p-4 mx-auto md:p-8">
          <h2 class="mb-6 text-4xl leadi text-center sm:text-5xl pb-5">
            Answers to Our Most Frequently Asked Questions
          </h2>
          <div class="flex flex-col divide-y sm:px-8 lg:px-12 xl:px-32 divide-gray-700 ml-10 mr-10">
            <details>
              <summary class="py-2 outline-none cursor-pointer focus:underline pb-6 pt-5 font-medium text-xl hover:text-y1 focus:text-y1">
                How can I place an order?
              </summary>
              <div class="px-4 pb-5">
                <p>
                  You can easily place an order on our website by browsing our
                  product catalog, selecting the items you want, and adding them
                  to your cart. Then, proceed to checkout, where you can provide
                  your shipping and payment information to complete the order.
                </p>
              </div>
            </details>
            <details>
              <summary class="py-2 outline-none cursor-pointer focus:underline pb-6 pt-6 font-medium text-xl hover:text-y1 focus:text-y1">
                What payment methods do you accept?
              </summary>
              <div class="px-4 pb-5">
                <p>
                  We accept various payment methods, including credit cards,
                  debit cards, net banking, and mobile wallet payments. You can
                  choose the payment option that is most convenient for you
                  during the checkout process.
                </p>
              </div>
            </details>
            <details>
              <summary class="py-2 outline-none cursor-pointer focus:underline pb-6 pt-6 font-medium text-xl hover:text-y1 focus:text-y1">
                How long does shipping take?
              </summary>
              <div class="px-4 pb-5">
                <p>
                  Shipping times may vary depending on your location and the
                  shipping method chosen. Typically, orders are processed within
                  1-2 business days, and delivery can take 3-7 business days
                  within Nepal. You will receive a tracking notification once
                  your order is shipped.
                </p>
              </div>
            </details>
            <details>
              <summary class="py-2 outline-none cursor-pointer focus:underline pb-6 pt-6 font-medium text-xl hover:text-y1 focus:text-y1">
                Can I return a product if I'm not satisfied?
              </summary>
              <div class="px-4 pb-5">
                <p>
                  Yes, we have a hassle-free return policy. If you are not
                  satisfied with your purchase, you can initiate a return within
                  30 days of receiving the product. Please contact our customer
                  support at{" "}
                  <a href="" class="underline">
                    example@gmail.com
                  </a>{" "}
                  for assistance.
                </p>
              </div>
            </details>
            <details>
              <summary class="py-2 outline-none cursor-pointer focus:underline pb-6 pt-6 font-medium text-xl hover:text-y1 focus:text-y1">
                Do you offer international shipping?
              </summary>
              <div class="px-4 pb-5">
                <p>
                  Currently, we only provide shipping services within Nepal.
                  However, we may consider expanding our shipping options to
                  international locations in the future. Please stay updated
                  with our website for any changes in shipping destinations.
                </p>
              </div>
            </details>
            <details>
              <summary class="py-2 outline-none cursor-pointer focus:underline pb-6 pt-6 font-medium text-xl hover:text-y1 focus:text-y1">
                What is your customer support contact?
              </summary>
              <div class="px-4 pb-5">
                <p>
                  If you have any questions, concerns, or need assistance, you
                  can reach our customer support team at 9911083755 during our
                  business hours, Monday to Saturday from 10 am to 6 pm. You can
                  also contact us via email at{" "}
                  <a href="" class="underline">
                    example@gmail.com
                  </a>
                  .
                </p>
              </div>
            </details>
            <details>
              <summary class="py-2 outline-none cursor-pointer focus:underline pb-6 pt-6 font-medium text-xl hover:text-y1 focus:text-y1">
                What are your terms and conditions?
              </summary>
              <div class="px-4 pb-5">
                <p>
                  You can find our detailed terms and conditions by visiting our{" "}
                  <t />
                  <a href="" class="underline">
                    Terms of Service
                  </a>{" "}
                  <t />
                  page on our website. It includes information about our
                  policies, user guidelines, and more.
                </p>
              </div>
            </details>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default FAQ;
