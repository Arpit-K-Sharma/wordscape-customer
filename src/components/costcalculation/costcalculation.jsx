import React, { useEffect, useState } from "react";
// import "../styles/cost-calc.css";
import axios from "axios";
import "./external.css";
import DrawerOpen from "./drawer";
import drawertest from "./drawertest";
import DrawerTest from "./drawertest";
import Navbar from "../navbar/navbar";

const CostCalculation = () => {
  const [paperSizes, setPaperSizes] = useState([]);

  const [outerPaperType, setOuterPaperType] = useState([]);

  const [paperSize, setPaperSize] = useState("");
  const [plateSize, setPlateSize] = useState("");
  const [quantity, setQuantity] = useState("");
  const [pages, setPages] = useState("");
  const [otherField, setOtherField] = useState("");
  const [paperType, setPaperType] = useState([]);
  const [selectedPaperType, setSelectedPaperType] = useState("");
  const [outerSelectedPaperType, setOuterSelectedPaperType] = useState("");
  const [selectedPaperThickness, setSelectedPaperThickness] = useState("");
  const [selectedOuterPaperThickness, setSelectedOuterPaperThickness] =
    useState("");
  const [changeCostPerKg, setChangeCostPerKg] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [laminationPrice, setLaminationPrice] = useState("");
  const [plateSizes, setPlateSizes] = useState([]);
  const [outerChangeCostPerKg, setOuterChangeCostPerKg] = useState(0);
  const [bindingType, setBindingType] = useState([]);

  const [reamCost, setReamCost] = useState(0);
  const [packetCost, setPacketCost] = useState(0);
  const [plateCost, setPlateCost] = useState(0);
  const [inkCost, setInkCost] = useState(0);
  const [bindingCost, setBindingCost] = useState(0);
  const [selectedBindingType, setSelectedBindingType] = useState("");
  const [selectedInkType, setSelectedInkType] = useState("");
  const [selectedLaminationType, setSelectedLaminationType] = useState("");
  const [coverTreatmentTypes, setCoverTreatmentTypes] = useState([]);
  const [covertreatmentType, setCovertreatmentType] = useState("");

  const handleCovertreatmentTypeChange = (event) => {
    setCovertreatmentType(event.target.value);
  };

  useEffect(() => {
    getBinding();
    getPaperSizes();
    getCoverTreatment();
    getPaper();
    getOuterPaper();
  }, []);

  const sizesAndCosts = [
    { paperSize: "A3", plateSize: "19x25 or 20x30", plateCost: 40 },
    { paperSize: "A4", plateSize: "19x25", plateCost: 15 },
    { paperSize: "A5", plateSize: "19x25", plateCost: 20 },
    { paperSize: "B5", plateSize: "15x20 or 20x30", plateCost: 40 },
    { paperSize: "Letter", plateSize: "18x24", plateCost: 30 },
  ];

  const plateValue = [
    {
      value: 126,
    },
    {
      value: 600,
    },
  ];

  const handlePaperThicknessChange = (e) => {
    const selectedPaperThickness = e.target.value;
    setSelectedPaperThickness(selectedPaperThickness);
  };

  const [isLaminationSelected, setIsLaminationSelected] = useState(false);

  const handleOuterPaperThicknessChange = (e) => {
    const selectedOuterPaperThickness = e.target.value;
    setSelectedOuterPaperThickness(selectedOuterPaperThickness);
  };

  const handleOuterPaperTypeChange = (e) => {
    setSelectedPaperType(e.target.value);
  };

  const getCoverTreatment = () => {
    axios
      .get("http://localhost:8081/coverTreatments")
      .then((response) => {
        setCoverTreatmentTypes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cover treatment types:", error);
      });
  };

  const handlePaperTypeChange = (e) => {
    setSelectedPaperType(e.target.value);
  };

  const getPaperSizes = () => {
    axios
      .get("http://localhost:8081/paperSizes")
      .then((response) => {
        // Extract paper sizes from response data
        const fetchedPaperSizes = response.data.map((size) => ({
          value: size.paperSizeId, // Assuming 'paperSizeId' is the unique identifier
          label: size.paperSize,
        }));
        // Set the paper size state
        setPaperSizes(fetchedPaperSizes);
      })
      .catch((error) => {
        console.error("Error fetching paper sizes:", error);
      });
  };

  const getPaper = () => {
    axios
      .get("http://localhost:8081/papers")
      .then((response) => {
        setPaperType(response.data);
      })
      .catch((error) => {
        console.error("Error fetching paper data:", error);
      });
  };

  const getOuterPaper = () => {
    axios
      .get("http://localhost:8081/papers") // Adjust the URL accordingly
      .then((response) => {
        setOuterPaperType(response.data);
      })
      .catch((error) => {
        console.error("Error fetching outer paper data:", error);
      });
  };

  const sheetDimension = [
    {
      value: 864, // 24 x 36
    },
    {
      value: 600, // 20 x 30
    },
  ];

  const inkTypes = [
    { value: "CMYK", label: "CMYK" },
    { value: "Spot", label: "Spot" },
    { value: "Black and White", label: "Black and White" },
  ];

  const paperThicknesses = [
    60, 70, 80, 90, 100, 115, 120, 128, 150, 200, 250, 300,
  ];

  const getBinding = () => {
    axios
      .get("http://localhost:8081/bindings")
      .then((response) => {
        // Extract binding types from response data
        const bindingTypes = response.data.map(
          (binding) => binding.bindingType
        );
        // Set the binding type state
        setBindingType(bindingTypes);
      })
      .catch((error) => {
        console.error("Error fetching binding types:", error);
      });
  };

  const handleBindingTypeChange = (event) => {
    setSelectedBindingType(event.target.value);
  };

  const laminationType = [
    "Normal Glossy",
    "Normal Matte",
    "Thermal Glossy",
    "Thermal Matte",
  ];

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    setQuantity(value);
  };

  const handleLaminationTypeChange = (e) => {
    const selectedLaminationType = e.target.value;
    setSelectedLaminationType(selectedLaminationType);

    const requiresCustomPrice =
      selectedLaminationType === "Normal Glossy" ||
      selectedLaminationType === "Normal Matte" ||
      selectedLaminationType === "Thermal Glossy" ||
      selectedLaminationType === "Thermal Matte";

    setIsLaminationSelected(requiresCustomPrice);

    if (requiresCustomPrice) {
      // Fetch the lamination cost data from the backend
      axios
        .get("http://localhost:8081/laminationCost")
        .then((response) => {
          const laminationCostData = response.data;
          // Find the entry corresponding to the selected lamination type
          const selectedLaminationCost = laminationCostData.find(
            (cost) => cost.laminationType === selectedLaminationType
          );
          if (selectedLaminationCost) {
            // Update the state with the fetched lamination cost value
            setLaminationPrice(selectedLaminationCost.laminationCost);
            console.log(
              "Lamination cost:",
              selectedLaminationCost.laminationCost
            );
            console.log(laminationPrice);
          }
        })
        .catch((error) => {
          console.error("Error fetching lamination cost data:", error);
        });
    } else {
      setShowPopup(false);
    }
  };

  function reamCalc(selectedPaperThickness, costPerKg) {
    return (864 * selectedPaperThickness * costPerKg) / 3100;
  }

  function packetCalc(selectedOuterPaperThickness, outerChangeCostPerKg) {
    return reamCalc(selectedOuterPaperThickness, outerChangeCostPerKg) / 5;
  }

  function totalPages(quantity, pages) {
    return Math.round(quantity * pages);
  }

  function totalSheets(quantity, pages) {
    return totalPages(quantity, pages) / 16;
  }

  function totalReams(pages, quantity) {
    return Math.round((pages * quantity) / 16 / 500);
  }

  function innerCost(quantity, pages, selectedPaperThickness, changeCostPerKg) {
    return (
      totalReams(pages, quantity) *
      reamCalc(selectedPaperThickness, changeCostPerKg)
    );
  }

  function totalPacket(quantity) {
    return Math.ceil(totalSheets(quantity, 4) / 100);
  }

  function calculateLamination(laminationPrice, quantity, pages) {
    return Math.ceil(
      ((12 * 18 * laminationPrice) / 2) * totalPages(quantity, pages)
    );
  }

  function platePrice(pages, plateCost) {
    return pages * plateCost;
  }

  const handlePagesChange = (e) => {
    const value = parseInt(e.target.value);
    setPages(value);
  };

  const handlePlateSizeChange = (e) => {
    const selectedSize = e.target.value;
    console.log("Selected Plate Size:", selectedSize);
    setPlateSize(selectedSize);

    // Fetch the plate cost data
    axios
      .get("http://localhost:8081/plates")
      .then((response) => {
        const plateCostData = response.data;
        // Selected plate size
        const selectedPlateCost = plateCostData.find(
          (cost) => cost.plateSize.toLowerCase() === selectedSize.toLowerCase()
        );
        if (selectedPlateCost) {
          // Fetched plate cost value
          setPlateCost(selectedPlateCost.plateCost);
          console.log("Plate cost:", selectedPlateCost.plateCost);

          setInkCost(selectedPlateCost.inkCost);
          // Log out the ink cost for the selected plate size
          console.log("Ink cost:", selectedPlateCost.inkCost);
        }
      })
      .catch((error) => {
        console.error("Error fetching plate cost data:", error);
      });
  };

  const handlePaperSizeChange = (e) => {
    const selectedSize = e.target.value;
    setPaperSize(selectedSize);

    const selectedSizeData = sizesAndCosts.find(
      (data) => data.paperSize === selectedSize
    );
    if (selectedSizeData) {
      setPlateSize(selectedSizeData.plateSize);

      // Add logic to recommend an appropriate plate size based on paper type
      let recommendedPlateSize = selectedSizeData.plateSize;

      // Logic to recommend a plate size based on paper type
      if (selectedPaperType === "Art Paper") {
        recommendedPlateSize = "20x30";
      } else if (selectedPaperType === "Ivory Board") {
        recommendedPlateSize = "19x25";
      }
      // Set the recommended plate size
      setPlateSize(recommendedPlateSize);

      setPlateCost(selectedSizeData.plateCost);
    }
  };

  const handleOtherFieldChange = (e) => {
    const value = e.target.value;
    setOtherField(value);
  };

  const handleInkTypeChange = (e) => {
    setSelectedInkType(e.target.value);
  };

  const totalCost =
    Math.ceil(
      totalPacket(quantity) *
        packetCalc(selectedOuterPaperThickness, outerChangeCostPerKg)
    ) +
    Math.round(
      innerCost(quantity, pages, selectedPaperThickness, changeCostPerKg)
    ) +
    platePrice(pages, plateCost) +
    Math.ceil(bindingCost * quantity) +
    calculateLamination(laminationPrice, quantity, pages);

  return (
    <>
      <Navbar />
      <div className="cost-calc-container bg-zinc-800">
        <div className="empty-box">
          <div className="test-box">
            <div className="open-box text-zinc-900">
              <br></br>
              <h1 className="heading-c">
                <b>Cost</b> Calculator
              </h1>
              <br></br>
              {/* <DrawerTest
                plateSize={plateSize}
                outerChangeCostPerKg={outerChangeCostPerKg}
                selectedLaminationType={selectedLaminationType}
                inkCost={inkCost}
                selectedOuterPaperThickness={selectedOuterPaperThickness}
                outerCost={Math.ceil(
                  totalPacket(quantity) *
                    reamCalc(selectedOuterPaperThickness, changeCostPerKg)
                )}
                outerSelectedPaperType={outerSelectedPaperType}
                paperSize={paperSize}
                selectedBindingType={selectedBindingType}
                changeCostPerKg={changeCostPerKg}
                pages={totalPages(quantity, pages)}
                selectedPaperType={selectedPaperType}
                selectedPaperThickness={selectedPaperThickness}
                totalSheets={totalSheets(quantity, pages)}
                totalReams={totalReams(quantity, pages)}
                totalPacket={totalPacket(quantity)}
                laminationCost={Math.ceil(
                  calculateLamination(laminationPrice, quantity, pages)
                )}
                quantity={quantity}
                selectedInkType={selectedInkType}
                totalCost={totalCost}
                costReam={Math.ceil(
                  reamCalc(selectedPaperThickness, changeCostPerKg)
                )}
              /> */}
            </div>
            <div className="total-b"></div>
            <br></br>
            <div className="cost-main text-zinc-800">
              {/* <h2 className="c-heading">Calculate Specs</h2> */}

              <h3>
                Total Estimate: Rs.<b>{totalCost}</b>
              </h3>
              <br></br>
              <form>
                <div className="cost-box">
                  <p className="divider-p-1">Product Specs</p>
                  <br></br>
                  <div className="cost-container">
                    <label htmlFor="paperSize">
                      <b>Paper Size:</b>
                    </label>
                    <br></br>
                    <select
                      id="paperSize"
                      value={paperSize}
                      onChange={(e) => setPaperSize(e.target.value)}
                    >
                      <option value="">Select Paper Size</option>
                      {/* Map over the fetched paper sizes */}
                      {paperSizes.map((size) => (
                        <option key={size.value} value={size.value}>
                          {size.label}
                        </option>
                      ))}
                    </select>
                    <br></br>

                    <label htmlFor="pages">
                      <b>Pages</b> (Number of pages per copy):
                    </label>
                    <br></br>
                    <input
                      type="number"
                      id="pages"
                      placeholder="Enter number of pages"
                      value={pages}
                      onChange={handlePagesChange}
                      min="8"
                      max="500"
                      required
                    />
                    <br></br>

                    <label htmlFor="quantity">
                      <b>Quantity</b> (Number of copies):
                    </label>
                    <br></br>
                    <input
                      type="number"
                      id="quantity"
                      value={quantity}
                      onChange={handleQuantityChange}
                      min="50"
                      max="10000"
                      required
                    />
                  </div>
                </div>
                <div className="cost-box-1">
                  <p className="divider-p">Product Detail</p>
                  <div className="cost-container">
                    <label htmlFor="binding-type">
                      <b>Binding</b> Type
                    </label>
                    <br></br>
                    <select
                      id="binding-type"
                      name="binding-type"
                      value={selectedBindingType}
                      onChange={handleBindingTypeChange}
                      required
                    >
                      <option value="">Select Binding Type</option>
                      {bindingType.map((binding, index) => (
                        <option key={index} value={binding}>
                          {binding}
                        </option>
                      ))}
                    </select>

                    <br></br>
                    <label htmlFor="covertreatment-type">
                      <b>Cover </b>Treatment
                    </label>
                    <br></br>
                    <select
                      id="covertreatment-type"
                      name="covertreatment-type"
                      value={covertreatmentType}
                      onChange={handleCovertreatmentTypeChange}
                      required
                    >
                      <option value="">Select Cover Treatment Type</option>
                      {/* Map over the fetched cover treatment types */}
                      {coverTreatmentTypes.map((coverTreatment, index) => (
                        <option
                          key={index}
                          value={coverTreatment.coverTreatmentType}
                        >
                          {coverTreatment.coverTreatmentType}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <br></br>

                <div className="cost-box-m">
                  <p className="divider-p">Material Detail</p>

                  <div className="det">
                    <div className="det-col">
                      <br></br>
                      <label htmlFor="paper-type">
                        <b>Inner Paper</b> Type
                      </label>
                      <br></br>
                      <br></br>
                      <select
                        id="paper-type"
                        name="paper-type"
                        value={selectedPaperType}
                        onChange={handlePaperTypeChange}
                        className="paper-type-select"
                        required
                      >
                        <option value="">Select Paper Type</option>
                        {paperType.map((paper, index) => (
                          <option key={index} value={paper.paperType}>
                            {paper.paperType.replace("_", " ")}
                          </option>
                        ))}
                      </select>
                      <br></br>
                    </div>
                    <br></br>
                    <div className="det-col">
                      <label htmlFor="paper-thickness">
                        <b>Inner Paper</b> Thickness (in GSM)
                      </label>
                      <p> </p>
                      <br></br>
                      <select
                        id="paper-thickness"
                        name="paper-thickness"
                        value={selectedPaperThickness}
                        onChange={handlePaperThicknessChange}
                        className="paper-type-select"
                        required
                      >
                        <option value="">Set Paper Thickness</option>
                        {paperThicknesses.map((thickness, index) => (
                          <option key={index} value={thickness}>
                            {thickness}
                          </option>
                        ))}
                      </select>
                    </div>
                    <br></br>
                  </div>

                  <div className="det-1">
                    <div className="det-col-1">
                      <label htmlFor="outer-paper-type">
                        <b>Cover Paper</b> Type
                      </label>
                      <br></br>
                      <p> </p>
                      <br></br>
                      <select
                        id="outer-paper-type"
                        name="outer-paper-type"
                        value={outerSelectedPaperType}
                        onChange={handleOuterPaperTypeChange}
                        className="paper-type-select"
                        required
                      >
                        <option value="">Select Outer Paper Type</option>
                        {outerPaperType.map((paper, index) => (
                          <option key={index} value={paper.paperType}>
                            {paper.paperType.replace("_", " ")}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="det-col-1">
                      <br></br>
                      <label htmlFor="paper-thickness">
                        <b>Outer Paper</b> Thickness (in GSM)
                      </label>
                      <p> </p>
                      <br></br>
                      <select
                        id="paper-outer-thickness"
                        name="paper-outer-thickness"
                        value={selectedOuterPaperThickness}
                        onChange={handleOuterPaperThicknessChange}
                        className="paper-type-select"
                        required
                      >
                        <option value="">Set Paper Thickness</option>
                        {paperThicknesses.map((thickness, index) => (
                          <option key={index} value={thickness}>
                            {thickness}
                          </option>
                        ))}
                      </select>
                      <br></br>
                    </div>
                    <br></br>
                    <div className="l-container">
                      <label htmlFor="lamination-type">
                        <b>Lamination</b> Type{" "}
                      </label>
                      <br></br>
                      <select
                        id="lamination-type"
                        name="lamination-type"
                        value={selectedLaminationType}
                        onChange={handleLaminationTypeChange}
                        required
                      >
                        <option value="">Select Lamination Type</option>
                        {laminationType.map((type, index) => (
                          <option key={index} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <p> </p>
                </div>
                <br></br>
                <div className="cost-box-2">
                  <div className="det-col">
                    <p className="divider-p">Process Detail</p>
                    <br></br>
                    <label htmlFor="plateSize">
                      <b>Plate </b>Size:
                    </label>
                    <br></br>
                    <br></br>
                    <select
                      id="plateSize"
                      value={plateSize}
                      onChange={handlePlateSizeChange}
                    >
                      <option value="">Select Plate Size</option>
                      {/* Mapping over plateSizes directly */}
                      {plateSizes.map((size, index) => (
                        <option key={index} value={size.value}>
                          {size.label}
                        </option>
                      ))}
                    </select>
                    <br></br>
                    <br></br>
                    <label htmlFor="ink-type">
                      <b>Ink </b> Type:
                    </label>
                    <br></br>
                    <br></br>
                    <select
                      id="ink-type"
                      name="ink-type"
                      value={selectedInkType}
                      onChange={handleInkTypeChange}
                      required
                    >
                      <option value="">Select Ink Type</option>
                      {inkTypes.map((ink, index) => (
                        <option key={index} value={ink.value}>
                          {ink.label}
                        </option>
                      ))}
                    </select>
                    <br></br>
                    <br></br>
                  </div>
                </div>
                <br></br>
              </form>
            </div>
          </div>
        </div>
        <div />
      </div>
    </>
  );
};
export default CostCalculation;
