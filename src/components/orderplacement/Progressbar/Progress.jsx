import React, { useEffect } from "react";
import Navbar from "../../navbar/navbar";
import MobileNavbar from "../../navbar/mobile-navbar";
import MobileMenu from "../../navbar/mobile-menu";

function Progress({ step }) {
  return (
    <div>
      <Navbar />
      <MobileMenu/>
      <div className="mt-[-30px] max-sm:mt-[-50px] text-slate-200 mx-auto relative w-full flex justify-center max-sm:max-w-[130px]">
        <div>
          <ul className="steps steps-horizontal">
            <li
              className={step >= 1 ? `step step-primary` : `step`}
              data-content={step > 1 ? `✓` : `●`}
            >
              {step == 1 && "Inner Paper"}
            </li>
            <li
              className={step >= 2 ? `step step-primary` : `step`}
              data-content={step > 2 ? `✓` : `●`}
            >
              {step == 2 && "Outer Paper"}
            </li>
            <li
              className={step >= 3 ? `step step-primary` : `step`}
              data-content={step > 3 ? `✓` : `●`}
            >
              {step == 3 && "Quantity"}
            </li>
            <li
              className={step >= 4 ? `step step-primary` : `step`}
              data-content={step > 4 ? `✓` : `●`}
            >
              {step == 4 && "Extras"}
            </li>
            <li
              className={step >= 5 ? `step step-primary` : `step`}
              data-content={step > 5 ? `✓` : `●`}
            >
              {step == 5 && "Confirm Order"}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Progress;
