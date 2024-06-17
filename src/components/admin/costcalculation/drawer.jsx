import { Drawer, ButtonToolbar, Button, Placeholder } from "rsuite";
import React from "react";
import ReactDOM from "react-dom";
import axios from "../../components/axiosInstance";
import "./external.css";

// axios
//   .post("http://localhost:8081/quotation", {
//     pages: pages,
//     paperSize: paperSize,
//     selectedPaperType: selectedPaperType,
//     selectedPaperThickness: selectedPaperThickness,
//     totalSheets: totalSheets,
//     totalReams: totalReams,
//     costReam: costReam,
//     changeCostPerKg: changeCostPerKg,
//     outerSelectedPaperType: outerSelectedPaperType,
//     selectedOuterPaperThickness: selectedOuterPaperThickness,
//     totalPacket: totalPacket,
//     plateSize: plateSize,
//     selectedInkType: selectedInkType,
//     inkCost: inkCost,
//     selectedBindingType: selectedBindingType,
//     selectedLaminationType: selectedLaminationType,
//     laminationCost: laminationCost,
//     totalCost: totalCost,
//   })
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });

const DrawerOpen = ({
  paperSize,
  setPaperSize,
  plateSize,
  setPlateSize,
  quantity,
  laminationCost,
  setQuantity,
  pages,
  selectedLaminationType,
  setPages,
  otherField,
  setOtherField,
  selectedPaperType,
  selectedBindingType,
  setSelectedPaperType,
  selectedInkType,
  outerSelectedPaperType,
  setOuterSelectedPaperType,
  selectedPaperThickness,
  setSelectedPaperThickness,
  selectedOuterPaperThickness,
  setSelectedOuterPaperThickness,
  outerCost,
  changeCostPerKg,
  setChangeCostPerKg,
  showPopup,
  inkCost,
  totalCost,
  setShowPopup,
  laminationPrice,
  setLaminationPrice,
  totalSheets,
  plateSizes,
  costReam,
  totalReams,
  setPlateSizes,
  outerChangeCostPerKg,
  totalPacket,
  setOuterChangeCostPerKg,
}) => {
  //   const [open, setOpen] = React.useState(false);
  const [openWithHeader, setOpenWithHeader] = React.useState(false);

  const sendOrder = async (data) => {
    try {
      const response = await axios.post("/order", data);
      console.log("Order sent successfully:", response.data);
      // Handle successful response (e.g., show a success message)
    } catch (error) {
      console.error("Error sending order:", error);
      // Handle errors (e.g., show an error message)
    }
  };

  const handleClickSendOrder = async () => {
    const orderData = {
      customerName: "Sarthak Shrestha", 
      customerEmail: "ssarthak20@tbc.edu.np", 
      paperSize: paperSize,
      pages: pages,
      quantity: quantity, 
      bindingType: selectedBindingType,
      coverTreatment: "Die Cutting", 
      innerPaperType: selectedPaperType,
      innerPaperThickness: selectedPaperThickness,
      outerPaperType: outerSelectedPaperType,
      outerPaperThickness: selectedOuterPaperThickness,
      laminationType: selectedLaminationType,
      plateSize: plateSize,
      inkType: selectedInkType,
      extraNotes: "Here you go king",
    };
  
    await sendOrder(orderData);
  };
  


  return (
    <>
      <ButtonToolbar>
        {/* <Button onClick={() => setOpen(true)}>Open</Button> */}
        <Button className="btn-open" onClick={() => setOpenWithHeader(true)}>
          Open Cost Breakdown
        </Button>
      </ButtonToolbar>
      {/* 
      <Drawer open={open} onClose={() => setOpen(false)}>
        <Drawer.Body>
          <Placeholder.Paragraph />
        </Drawer.Body>
      </Drawer> */}

      <Drawer open={openWithHeader} onClose={() => setOpenWithHeader(false)}>
        <Drawer.Header>
          <Drawer.Title>Cost Breakdown</Drawer.Title>
          <Drawer.Actions>
            <Button onClick={() => setOpenWithHeader(false)}>Cancel</Button>
            <Button
              className="quota-btn"
              onClick={handleClickSendOrder}
              appearance="primary"
            >
              Send Quotation
            </Button>
            {/* <Button
              className="quota-btn"
              onClick={() => setOpenWithHeader(false)}
              appearance="primary"
            >
              Send Quotation
            </Button> */}
          </Drawer.Actions>
        </Drawer.Header>
        <Drawer.Body>
          <div className="cost-heading">
            <h2>Cost Breakdown</h2>
          </div>
          <div className="c-container">
            <h3>Paper</h3>
            <br></br>
            <p>
              {" "}
              Total Number of Pages: <b>{pages}</b>
            </p>
            <p>
              Paper size: <b>{paperSize}</b>
            </p>
            <p>
              {" "}
              Inner type: <b>{selectedPaperType}</b>
            </p>
            <p>
              {" "}
              Inner paper thickness: <b>{selectedPaperThickness} </b> gsm
            </p>
            <p>
              Total Sheets: <b>{totalSheets}</b>
            </p>
            <p>
              Total Reams: <b>{totalReams}</b>
            </p>
            <p>
              Cost of Reams: Rs. <b>{costReam}</b>
            </p>
            <p>
              Unit cost for paper type (per kg): Rs. <b>{changeCostPerKg}</b>
            </p>
            <br></br>
            <br></br>
            <p></p>
            <h3>Cover Paper</h3>
            <p>
              Cover paper type: <b>{outerSelectedPaperType}</b>
            </p>
            <p>
              Cover paper thickness: <b>{selectedOuterPaperThickness} gsm</b>
            </p>

            <p>
              Total packet: <b>{totalPacket}</b>
            </p>
            <br></br>
            <h3>Plate Details</h3>
            <p>
              Chosen plate size: <b>{plateSize}</b>
            </p>
            <p>
              Ink Details: <b>{selectedInkType}</b>
            </p>
            <p>
              Cost of Ink: Rs. <b>{inkCost * 4}</b>
            </p>
            <br></br>
            <br></br>
            <h3>Binding </h3>
            <p>
              {" "}
              Selected binding type: Rs. <b>{selectedBindingType}</b>
            </p>
            <br></br>
            <br></br>
            <h3>Lamination</h3>
            <p>
              Type of Lamination: <b>{selectedLaminationType}</b>
            </p>
            <p>
              Cost of Lamination: Rs. <b>{laminationCost}</b>
            </p>
            <br></br>
            <br></br>
            <h1 className="cost-t">Total Cost:</h1>
            <h3>
              {" "}
              Rs. <b> {totalCost} </b>
            </h3>
          </div>
        </Drawer.Body>
      </Drawer>
    </>
  );
};

export default DrawerOpen;
