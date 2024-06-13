import React, { useEffect } from "react";
import Navbar from "../../navbar/navbar";
import MobileNavbar from "../../navbar/mobile-navbar";
import MobileMenu from "../../navbar/mobile-menu";

function Progress({ step }) {
  return (
    <div>
      <Navbar />
      <MobileMenu />
      <div className="mt-[-30px] max-sm:mt-[-50px] text-zinc-800 mx-auto relative flex justify-center max-sm:max-w-xs items-center">
        {" "}
        <div>
          <ul className="steps steps-horizontal">
            <li
              className={step >= 1 ? `step step-primary` : `step`}
              data-content={step > 1 ? `✓` : `●`}
            >
              <span
                style={{ display: "inline-block" }}
                className="lg:w-[120px]"
              >
                {step == 1 && "Inner Paper"}
              </span>
            </li>
            <li
              className={step >= 2 ? `step step-primary` : `step`}
              data-content={step > 2 ? `✓` : `●`}
            >
              <span style={{ display: "inline-block" }}>
                {step == 2 && "Outer Paper"}
              </span>
            </li>
            <li
              className={step >= 3 ? `step step-primary` : `step`}
              data-content={step > 3 ? `✓` : `●`}
            >
              <span style={{ display: "inline-block" }}>
                {step == 3 && "Page Quantity"}
              </span>
            </li>
            <li
              className={step >= 4 ? `step step-primary` : `step`}
              data-content={step > 4 ? `✓` : `●`}
            >
              <span style={{ display: "inline-block" }}>
                {step == 4 && "Extras"}
              </span>
            </li>
            <li
              className={step >= 5 ? `step step-primary` : `step`}
              data-content={step > 5 ? `✓` : `●`}
            >
              <span style={{ display: "inline-block" }}>
                {step == 5 && "Confirm"}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Progress;
