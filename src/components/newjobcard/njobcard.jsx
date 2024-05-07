import React, { useState } from "react";
import PaymentTable from "./paymentTable";
import DeliveryDetail from "./deliverydetail";
import PressUnit from "./prepressunit";
import PaperDetail from "./paperdetail";
import PlateDetail from "./platedetail";
import PaperUnit from "./paperunit";
import Bindery from "./bindery";
import PressUnits from "./pressunit";
function NJobCard() {
  const[open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true)
  }
  return (
    <div>
      <div className="grid h-screen grid-cols-2 font-archivo">
        <div className={open == true ? 'xl:mr-[50%]' : null}>
          <h2 className="text-center w-[200px] xl:ml-[85%] mt-[15px] text-4xl font-extrabold">
            Job Card
          </h2>
          <h1 className=" xl:ml-[85%] w-[200px] text-center mt-[10px] text-xl">Order Details</h1>
          <h1 className=" xl:ml-[85%] w-[200px] mt-[10px] text-center text-l">TO DO: Pull Order DB Here</h1>
          <div className="xl:ml-[85%] w-[200px] lg:grid ">
          <div onClick={handleClick}>
          <PaymentTable/>
          <DeliveryDetail/>
          <PressUnit/>
          <PaperDetail/>
          <PlateDetail/>
          <PaperUnit/>
          <Bindery/>
          <PressUnits/>
          </div>
          </div>
          </div>
        </div>
      </div>
    
  );
}

export default NJobCard;
