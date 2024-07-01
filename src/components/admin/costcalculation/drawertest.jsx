import React from "react";

const DrawerTest = ({
  paperSize,
  pages,
  selectedPaperType,
  selectedPaperThickness,
  requiredSheet,
  bindingCost,
  sheetLength,
  paperFit,
  sheetBreadth,
  totalReams,
  outerPaperPrice,
  standardLength,
  standardBreadth,
  outerLaminationRate,
  selectedOuterLaminationType,
  totalSheets,
  length,
  breadth,
  costReam,
  sheetValue,
  outerLamination,
  sheetSize,
  changeCostPerKg,
  outerSelectedPaperType,
  selectedOuterPaperThickness,
  totalPacket,
  plateSize,
  selectedInkType,
  inkCost,
  totalCost,
  selectedBindingType,
  selectedLaminationType,
  laminationCost,
}) => {
  return (
    <div className="drawer  drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex justify-center">
        <label
          htmlFor="my-drawer-4"
          className="drawer-button btn btn-primary mx-auto relative font-archivo bg-slate-300 text-black border-none hover:bg-slate-950 hover:text-white"
        >
          Open Cost Breakdown
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <ul className="menu p-4 w-80 min-h-full bg-gray-200 text-gray-800">
          {/* Sidebar content here */}
          <li>
            <h1 className="text-3xl mb-4 font-bold mt-5 mb-5 text-archivo">
              Cost Breakdown
            </h1>
            <h3 className="text-xl font-semibold mb-2">Paper</h3>
            <p>
              Total Number of Pages: <b>{pages}</b>
            </p>
            <p>
              Paper size: <b>{paperSize}</b>
            </p>
            <p>
              Paper size's length: <b>{standardLength}</b>
            </p>
            <p>
              Paper size's breadth <b>{standardBreadth}</b>
            </p>
            <p>
              Custom Paper's Length <b>{length}</b>
            </p>
            <p>
              Custom Paper's Breadth <b>{breadth}</b>
            </p>

            <p>
              Inner type: <b>{selectedPaperType}</b>
            </p>
            <p>
              Unit cost for paper type (per kg): Rs. <b>{changeCostPerKg}</b>
            </p>
            <p>
              Inner paper thickness: <b>{selectedPaperThickness}</b> gsm
            </p>
            <p>
              Total Sheets: <b>{totalReams * 500}</b>
            </p>
            <p>
              Total Reams: <b>{totalReams}</b>
            </p>
            {/* <p>
              Cost of Reams: Rs. <b>{costReam}</b>
            </p> */}
          </li>
          <li>
            <h3 className="text-xl font-semibold mb-2">Cover Paper</h3>
            <p>
              Cover paper type: <b>{outerSelectedPaperType}</b>
            </p>
            <p>
              Unit cost for outer paper type (per kg): Rs.{" "}
              <b>{outerPaperPrice}</b>
            </p>
            <p>
              Cover paper thickness: <b>{selectedOuterPaperThickness} gsm</b>
            </p>
            <p>
              Total packet: <b>{totalPacket}</b>
              {/* {console.log("TOTAL" + totalPacket)} */}
            </p>
          </li>
          <li>
            <h3 className="text-xl font-semibold mb-2">Plate Details</h3>
            <p>
              Chosen plate size: <b>{plateSize}</b>
            </p>
            <p>
              Ink Details: <b>{selectedInkType}</b>
            </p>
            {/* <p>
              Cost of Ink: Rs. <b>{inkCost * 4}</b>
            </p> */}
          </li>
          <li>
            <h3 className="text-xl font-semibold mb-2">Sheet Details</h3>
            <p>
              Chosen sheet size: <b>{sheetSize}</b>
            </p>
            <p>
              Value of sheet size: <b>{sheetValue}</b>
            </p>
            <p>
              Length of sheet size: <b>{sheetLength || length}</b>
            </p>
            <p>
              Breadth of sheet size: <b>{sheetBreadth || breadth}</b>
            </p>
            <p>
              Sheet can contain: <b>{paperFit} Papers</b>
            </p>
            <p>
              Total number of sheets for inner pages: <b>{requiredSheet}</b>
            </p>
          </li>
          <li>
            <h3 className="text-xl font-semibold mb-2">Binding</h3>
            <p>
              Selected binding type: <b>{selectedBindingType}</b>
            </p>
            <p>
              Cost of binding: Rs. <b>{bindingCost}</b>
            </p>
          </li>
          <li>
            <h3 className="text-xl font-semibold mb-2">Lamination</h3>
            <p>
              Type of Inner Lamination: <b>{selectedLaminationType}</b>
            </p>
            <p>
              Cost of Inner Lamination: Rs. <b>{laminationCost}</b>
            </p>
            <p>
              Type of Outer Lamination: <b>{selectedOuterLaminationType}</b>
            </p>
            <p>
              Cost of Outer Lamination: Rs. <b>{outerLaminationRate}</b>
            </p>
          </li>
          <li>
            <h3 className="text-3xl font-semibold mb-2">Total Cost</h3>
            <p>
              Total Cost: Rs. <b>{totalCost}</b>
            </p>
          </li>
          <li></li>
        </ul>
      </div>
    </div>
  );
};

export default DrawerTest;
