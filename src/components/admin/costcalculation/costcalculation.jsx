import React, { useEffect, useState } from "react";
// import "../styles/cost-calc.css";
import axios from "../../axiosInstance";
import "./external.css";
import DrawerOpen from "./drawer";
import drawertest from "./drawertest";
import DrawerTest from "./drawertest";
import Navbar from "../../navbar/navbar";
import PaperThickness from "../menu/paperthickness/paperthickness";
import AdminDrawer from "../../admin/menu/AdminDrawer";
import MobileMenu from "../../navbar/mobile-menu";

const CostCalculation = () => {
  const [paperSizes, setPaperSizes] = useState([]);
  const [sheetSizes, setSheetSizes] = useState([]);
  const [length, setLength] = useState("");
  const [standardLength, setStandardLength] = useState("");
  const [standardBreadth, setStandardBreadth] = useState("");
  const [selectedOuterLaminationType, setSelectedOuterLaminationType] =
    useState("");
  const [outerLaminationRate, setOuterLaminationRate] = useState(0);

  const [breadth, setBreadth] = useState("");
  const [paperLength, setPaperLength] = useState("");
  const [paperBreadth, setPaperBreadth] = useState("");
  const [sheetLength, setSheetLength] = useState("");
  const [sheetBreadth, setSheetBreadth] = useState("");

  const [outerPaperType, setOuterPaperType] = useState([]);
  const [outerPaperThickness, setOuterPaperThickness] = useState([]);
  const [sheetSize, setSheetSize] = useState("");
  const [sheetValue, setSheetValue] = useState(null);

  const [paperSize, setPaperSize] = useState("");
  const [plateSize, setPlateSize] = useState("");
  const [quantity, setQuantity] = useState("");
  const [pages, setPages] = useState("");
  const [outerpages, setOuterPages] = useState("");
  const [paperType, setPaperType] = useState([]);
  const [selectedPaperType, setSelectedInnerPaper] = useState("");
  const [outerSelectedPaperType, setOuterSelectedPaperType] = useState("");
  const [selectedPaperThickness, setSelectedPaperThickness] = useState("");

  const [selectedOuterPaperThickness, setSelectedOuterPaperThickness] =
    useState("");
  const [changeCostPerKg, setChangeCostPerKg] = useState(0);
  // const [laminationPrice, setLaminationPrice] = useState("");
  const [laminationPrice, setLaminationPrice] = useState(0);
  const [paperPrice, setPaperPrice] = useState(0);

  const [plateSizes, setPlateSizes] = useState([]);
  const [outerChangeCostPerKg, setOuterChangeCostPerKg] = useState(0);
  const [bindingType, setBindingType] = useState([]);
  const [laminationType, setLaminationType] = useState([]);
  const [coverTreatmentType, setCoverTreatmentType] = useState([]);

  const [packetCost, setPacketCost] = useState(0);
  const [plateCost, setPlateCost] = useState(0);
  const [inks, setInks] = useState([]);
  const [coverTreatmentRate, setCoverTreatmentRate] = useState(0);

  const [inkCost, setInkCost] = useState(0);
  const [bindingCost, setBindingCost] = useState(0);
  const [selectedBindingType, setSelectedBindingType] = useState(0);
  const [selectedInkType, setSelectedInkType] = useState("");
  const [selectedLaminationType, setSelectedLaminationType] = useState("");
  const [selectedCoverPaperType, setSelectedCoverPaperType] = useState("");

  const [selectedCoverTreatmentType, setSelectedCoverTreatmentType] =
    useState("");

  const [paperThicknesses, setPaperThicknesses] = useState([]);
  const [laminationTypes, setLaminationTypes] = useState([]);
  const [costPerKg, setPaperRate] = useState(0);
  const [outerPaperPrice, setOuterPaperPrice] = useState(0);

  useEffect(() => {
    getBinding();
    getPaperSizes();
    getCoverTreatment();
    getPaper();
    getOuterPaper();
    getThickness();
    getOuterPaperThickness();
    getLamination();
    getPlates();
    getRatePlate(plateSize);
    getInks();
    getRateForBindingType(selectedBindingType);
    getRateForLaminationType(selectedLaminationType);
    getRateForCoverTreatment(selectedCoverTreatmentType);
    getRateForPaper(selectedPaperType);
    getRateForOuterPaper();
    getRateForOuterLaminationType(selectedOuterLaminationType);
    getSheetSizes();
    const paperFit = fitPapers(
      sheetBreadth,
      sheetLength,
      breadth || standardBreadth,
      length || standardLength
    );
    console.log("Paper Fit (updated):", paperFit);

    //getRateForOuterPaper(selectedOuterPaperType);
  }, [
    selectedBindingType,
    selectedLaminationType,
    selectedCoverTreatmentType,
    selectedPaperType,
    plateSize,
    outerSelectedPaperType,
    sheetBreadth,
    sheetLength,
    breadth,
    standardBreadth,
    length,
    standardLength,
  ]);

  const getInks = () => {
    axios
      .get("/inks")
      .then((response) => {
        setInks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching inks:", error);
      });
  };

  const getRatePlate = (plateSize) => {
    axios
      .get("/plates")
      .then((response) => {
        // Find the plate with the matching size in the response data
        const plate = response.data.find(
          (plate) => plate.plateSize === plateSize
        );

        if (plate) {
          // Update the state with the plate rate
          setPlateCost(plate.plateRate);
          console.log("Plate Rate for size", plateSize, "is", plate.plateRate);
        } else {
          console.error("Plate size not found:", plateSize);
        }
      })
      .catch((error) => {
        console.error("Error fetching plate rate:", error);
      });
  };

  const handlePaperThicknessChange = (e) => {
    const selectedPaperThickness = e.target.value;
    setSelectedPaperThickness(selectedPaperThickness);
  };

  const handlePaperOuterThicknessChange = (e) => {
    const selectedOuterPaperThickness = e.target.value;
    setSelectedOuterPaperThickness(selectedOuterPaperThickness);
  };

  const handleOuterPaperTypeChange = (e) => {
    setOuterSelectedPaperType(e.target.value);
  };

  const getRateForOuterLaminationType = (selectedOuterLaminationType) => {
    axios
      .get("/laminations")
      .then((response) => {
        const selectedOuterLamination = response.data.find(
          (lamination) =>
            lamination.laminationType === selectedOuterLaminationType
        );
        if (selectedOuterLamination) {
          setOuterLaminationRate(selectedOuterLamination.rate);
          console.log(
            "Outer Lamination Type:",
            selectedOuterLaminationType,
            "Rate:",
            selectedOuterLamination.rate
          );
        } else {
          console.error(
            "Outer Lamination type not found:",
            selectedOuterLaminationType
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching outer lamination types:", error);
      });
  };

  const handleOuterLaminationTypeChange = (event) => {
    setSelectedOuterLaminationType(event.target.value);
    getRateForOuterLaminationType(event.target.value);
  };

  const handlePaperTypeChange = (e) => {
    setSelectedInnerPaper(e.target.value);
  };

  const handleCoverTreatmentTypeChange = (e) => {
    setSelectedCoverTreatmentType(e.target.value);
  };

  const getPlates = () => {
    axios
      .get("/plates")
      .then((response) => {
        // Extract plate sizes from response data
        const fetchedPlateSizes = response.data.map((plate) => ({
          value: plate.plateId, // Assuming 'plateId' is the unique identifier
          label: plate.plateSize,
        }));
        // Set the plate sizes state
        setPlateSizes(fetchedPlateSizes);
      })
      .catch((error) => {
        console.error("Error fetching plate sizes:", error);
      });
  };

  const getThickness = () => {
    axios
      .get("/paperThickness")
      .then((response) => {
        // Update the state with fetched paper thickness data
        setPaperThicknesses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching paper thickness data:", error);
      });
  };

  const handlePaperSizeChange = (e) => {
    const selectedSize = e.target.value;
    console.log("Selected Paper Size:", selectedSize);
    setPaperSize(selectedSize);

    // Fetch the paper size data
    axios
      .get("/paperSizes")
      .then((response) => {
        const paperSizeData = response.data;
        // Find the selected paper size
        const selectedPaperSize = paperSizeData.find(
          (paper) =>
            paper.paperSize.toLowerCase() === selectedSize.toLowerCase()
        );
        if (selectedPaperSize) {
          // Set the values for the selected paper size
          //setPaperLength(selectedPaperSize.paperLength);
          setStandardLength(selectedPaperSize.paperLength);
          setStandardBreadth(selectedPaperSize.paperBreadth);
          // setPaperBreadth(selectedPaperSize.paperBreadth);
        }
      })
      .catch((error) => {
        console.error("Error fetching paper size data:", error);
      });
  };

  const getOuterPaperThickness = () => {
    axios
      .get("/paperThickness") // Adjust URL accordingly
      .then((response) => {
        // Assuming the response data is an array of thickness values
        setOuterPaperThickness(response.data);
      })
      .catch((error) => {
        console.error("Error fetching outer paper thickness:", error);
      });
  };

  const getPaperSizes = () => {
    axios
      .get("/paperSizes")
      .then((response) => {
        // Extract paper sizes from response data
        const fetchedPaperSizes = response.data.map((size) => ({
          value: size.paperSizeId, // Assuming 'paperSizeId' is the unique identifier
          label: size.paperSize,
          length: size.paperLength,
          breadth: size.paperBreadth,
        }));
        // Set the paper size state
        setPaperSizes(fetchedPaperSizes);
        setPaperLength(fetchedPaperSizes.length);
        setPaperBreadth(fetchedPaperSizes.breadth);
      })
      .catch((error) => {
        console.error("Error fetching paper sizes:", error);
      });
  };

  const getPaper = () => {
    axios
      .get("/papers")
      .then((response) => {
        setPaperType(response.data);
      })
      .catch((error) => {
        console.error("Error fetching paper data:", error);
      });
  };

  const getSheetSizes = () => {
    axios
      .get("/sheetSizes")
      .then((response) => {
        setSheetSizes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sheet sizes:", error);
      });
  };

  const getOuterPaper = () => {
    axios
      .get("/papers") // Adjust the URL accordingly
      .then((response) => {
        setOuterPaperType(response.data);
      })
      .catch((error) => {
        console.error("Error fetching outer paper data:", error);
      });
  };
  const getLamination = () => {
    axios
      .get("/laminations")
      .then((response) => {
        // Map the response data to include both laminationId and laminationType
        const laminationTypes = response.data.map(
          (lamination) => lamination.laminationType
        );
        // Set the laminationTypes state
        setLaminationType(laminationTypes);
      })
      .catch((error) => {
        console.error("Error fetching lamination types:", error);
      });
  };

  const getCoverTreatment = () => {
    axios
      .get("/coverTreatments")
      .then((response) => {
        const covertreatmentTypes = response.data.map(
          (covertreatment) => covertreatment.coverTreatmentType
        );
        setCoverTreatmentType(covertreatmentTypes);
      })
      .catch((error) => {
        console.error("Error fetching cover treatment types:", error);
      });
  };

  const getBinding = () => {
    axios
      .get("/bindings")
      .then((response) => {
        // Extract binding types from response data
        const bindingTypes = response.data.map(
          (binding) => binding.bindingType
        );
        // console.log(response);
        // Set the binding type state
        setBindingType(bindingTypes);
      })
      .catch((error) => {
        console.error("Error fetching binding types:", error);
      });
  };

  const getRateForPaper = (selectedPaperType) => {
    // Fetch the paper rates from the database
    axios
      .get("/papers") // Adjust the URL to match your API endpoint
      .then((response) => {
        // Find the selected paper type in the response data
        const selectedPaper = response.data.find(
          (paper) => paper.paperType === selectedPaperType
        );

        if (selectedPaper) {
          // Update the state with the paper rate
          setPaperPrice(selectedPaper.rate); // Assuming you have a state variable to store the paper rate
          setOuterPaperPrice(selectedPaper.rate);
          // console.log(
          //   "Paper Type:",
          //   selectedPaperType,
          //   "Rate:",
          //   selectedPaper.rate
          // );
        } else {
          // If paper type not found, handle error accordingly
          console.error("Paper type not found:", selectedPaperType);
        }
      })
      .catch((error) => {
        console.error("Error fetching paper rates:", error);
      });
  };

  const getRateForOuterPaper = () => {
    // Fetch the paper rates from the database
    if (outerSelectedPaperType) {
      // console.log("Outer Paper Type test:", outerSelectedPaperType);
      axios
        .get("/papers") // Adjust the URL to match your API endpoint
        .then((response) => {
          // Find the selected paper type in the response data
          const outPaper = response.data.find(
            (paper) => paper.paperType === outerSelectedPaperType
          );

          if (outPaper) {
            // Update the state with the paper rate
            setOuterPaperPrice(outPaper.rate);
            // console.log(
            //   "Outer Paper Type:",
            //   outPaper,
            //   "Outer Rate:",
            //   outPaper.rate
            // );
          } else {
            // If paper type not found, handle error accordingly
            console.error("Paper type not found:", selectedPaperType);
          }
        })
        .catch((error) => {
          console.error("Error fetching paper rates:", error);
        });
    }
  };

  const getRateForBindingType = (selectedBindingType) => {
    // Fetch the binding types and rates from the database
    axios
      .get("/bindings")
      .then((response) => {
        // Find the selected binding type in the response data
        const selectedBinding = response.data.find(
          (binding) => binding.bindingType === selectedBindingType
        );

        if (selectedBinding) {
          setBindingCost(selectedBinding.rate);
          // Log the rate of the selected binding
          // console.log(
          //   "Binding Type:",
          //   selectedBindingType,
          //   "Rate:",
          //   selectedBinding.rate
          // );
        } else {
          // If binding type not found, handle error accordingly
          console.error("Binding type not found:", selectedBindingType);
        }
      })
      .catch((error) => {
        console.error("Error fetching binding types:", error);
      });
  };

  const getRateForLaminationType = (selectedLaminationType) => {
    axios
      .get("/laminations")
      .then((response) => {
        const selectedLamination = response.data.find(
          (lamination) => lamination.laminationType === selectedLaminationType
        );
        if (selectedLamination) {
          setLaminationPrice(selectedLamination.rate);
          // console.log(
          //   "Lamination Type:",
          //   selectedLaminationType,
          //   "Rate:",
          //   selectedLamination.rate
          // );
        } else {
          console.error("Lamination type not found:", selectedLaminationType);
        }
      })
      .catch((error) => {
        console.error("Error fetching lamination types:", error);
      });
  };

  const getRateForCoverTreatment = (selectedCoverTreatmentType) => {
    // Fetch the cover treatments and rates from the database
    axios
      .get("/coverTreatments")
      .then((response) => {
        // Find the selected cover treatment type in the response data
        const selectedCoverTreatment = response.data.find(
          (coverTreatment) =>
            coverTreatment.coverTreatmentType === selectedCoverTreatmentType
        );

        if (selectedCoverTreatment) {
          // Update the state with the cover treatment rate
          setCoverTreatmentRate(selectedCoverTreatment.rate);
          // console.log(
          //   "Cover Treatment Type:",
          //   selectedCoverTreatmentType,
          //   "Rate:",
          //   selectedCoverTreatment.rate
          // );
        } else {
          // If cover treatment type not found, handle error accordingly
          console.error(
            "Cover treatment type not found:",
            selectedCoverTreatmentType
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching cover treatments:", error);
      });
  };

  const handleBindingTypeChange = (event) => {
    setSelectedBindingType(event.target.value);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    setQuantity(value);
  };

  const handleLaminationTypeChange = (event) => {
    setSelectedLaminationType(event.target.value);
  };

  function reamCalc(selectedPaperThickness, costPerKg) {
    return Math.ceil((sheetValue * selectedPaperThickness * costPerKg) / 3100);
  }

  // console.log("Ream cost is " + reamCalc(selectedPaperThickness, costPerKg));

  function packetCalc(selectedOuterPaperThickness, outerChangeCostPerKg) {
    return reamCalc(selectedOuterPaperThickness, outerChangeCostPerKg) / 5;
  }

  function totalPages(quantity, pages) {
    return Math.round(quantity * pages);
  }

  function totalSheets(quantity, pages, paperFit) {
    let val =
      totalPages(quantity, pages) / paperFit +
      (0.05 * totalPages(quantity, pages)) / paperFit;
    return val;
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
    const sheets = (4 * quantity) / 16;
    return Math.ceil(sheets / 100);
  }

  // console.log("The number of packets required are " + totalPacket(quantity));

  function calculateLamination(laminationPrice, quantity, pages) {
    return Math.ceil(((12 * 18 * laminationPrice) / 2) * pages * quantity);
  }

  // console.log("Lamination price is " + laminationPrice);

  // console.log(
  //   "Total Lamination is " +
  //     calculateLamination(laminationPrice, quantity, pages)
  // );

  const handleSheetSizeChange = (e) => {
    const selectedSize = e.target.value;
    // console.log("Selected Sheet Size:", selectedSize);
    setSheetSize(selectedSize);

    // Fetch the sheet size data
    axios
      .get("/sheetSizes")
      .then((response) => {
        const sheetSizeData = response.data;
        // Find the selected sheet size
        const selectedSheetSize = sheetSizeData.find(
          (sheet) =>
            sheet.sheetSize.toLowerCase() === selectedSize.toLowerCase()
        );
        if (selectedSheetSize) {
          // Set the value for the selected sheet size
          setSheetLength(selectedSheetSize.sheetLength);
          setSheetBreadth(selectedSheetSize.sheetBreadth);
          setSheetValue(selectedSheetSize.value);
          // console.log("Sheet value:", selectedSheetSize.value);
          // console.log("Sheet Length TEST: ", selectedSheetSize.sheetLength);
        }
      })
      .catch((error) => {
        console.error("Error fetching sheet size data:", error);
      });
  };

  function platePrice(pages, plateCost) {
    return pages * plateCost;
  }

  const handlePagesChange = (e) => {
    const value = parseInt(e.target.value);
    setPages(value);
  };

  const handleOuterPagesChange = (e) => {
    const value = parseInt(e.target.value);
    setOuterPages(value);
  };

  const handlePlateSizeChange = (e) => {
    const selectedSize = e.target.value;
    // console.log("Selected Plate Size:", selectedSize);
    setPlateSize(selectedSize);

    // Fetch the plate cost data
    axios
      .get("/plates")
      .then((response) => {
        const plateCostData = response.data;
        // Selected plate size
        const selectedPlateCost = plateCostData.find(
          (cost) => cost.plateSize.toLowerCase() === selectedSize.toLowerCase()
        );
        if (selectedPlateCost) {
          // Fetched plate cost value
          setPlateCost(selectedPlateCost.plateCost);
          // console.log("Plate cost:", selectedPlateCost.plateCost);

          setInkCost(selectedPlateCost.inkCost);
          // Log out the ink cost for the selected plate size
          // console.log("Ink cost:", selectedPlateCost.inkCost);
        }
      })
      .catch((error) => {
        console.error("Error fetching plate cost data:", error);
      });
  };

  const handleInkTypeChange = (e) => {
    setSelectedInkType(e.target.value);
  };

  // Inside your CostCalculation component

  function fitPapers(sheetBreadth, sheetLength, paperBreadth, paperLength) {
    function calculateFit(
      sheetBreadth,
      sheetLength,
      paperBreadth,
      paperLength
    ) {
      let fitHorizontally = Math.floor(sheetBreadth / paperBreadth);
      let fitVertically = Math.floor(sheetLength / paperLength);
      return fitHorizontally * fitVertically;
    }

    let fitNormal = calculateFit(
      sheetBreadth,
      sheetLength,
      paperBreadth,
      paperLength
    );
    let fitRotated = calculateFit(
      sheetBreadth,
      sheetLength,
      paperLength,
      paperBreadth
    );

    console.log("Fit Normal:", fitNormal);
    console.log("Fit Rotated:", fitRotated);
    console.log("Max Fit for Two Sides:", Math.max(fitNormal, fitRotated));

    return Math.max(fitNormal, fitRotated) * 2;
  }

  const paperFit = fitPapers(
    sheetBreadth,
    sheetLength,
    breadth || standardBreadth,
    length || standardLength
  );

  console.log("THE PAPER FIT :", paperFit);

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
      {/* <MobileMenu /> */}
      <Navbar />
      <AdminDrawer />
      <div className="cost-calc-container bg-zinc-800">
        <div className="empty-box">
          <div className="test-box">
            <div className="open-box text-zinc-900">
              <br></br>
              <MobileMenu />
              <h1 className="heading-c">
                <b>Cost</b> Calculator
              </h1>
              <br></br>

              {console.log("PAPER SIZE TEST: " + paperSize)}
              {console.log(
                "TOTAL SHEEEETS " + totalSheets(quantity, pages, paperFit)
              )}
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
              <form className="pb-[20px]">
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
                      onChange={handlePaperSizeChange}
                    >
                      <option value="">Select Paper Size</option>
                      {/* Map over the fetched paper sizes */}
                      {paperSizes.map((size, index) => (
                        <option key={index} value={size.label}>
                          {size.label}
                        </option>
                      ))}
                    </select>
                    <br></br>
                    <label htmlFor="pages">
                      <b>Inner Pages</b> (Number of pages in the inside):
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
                    <br></br>
                    <br></br>
                    <p className="divider-p">Custom Paper Detail</p>
                    <br></br>

                    <label htmlFor="length">
                      <b>Length (inches):</b>
                    </label>
                    <br></br>
                    <input
                      id="length"
                      type="number"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      placeholder="Enter length"
                    />
                    <br></br>
                    <label htmlFor="breadth">
                      <b>Breadth (inches):</b>
                    </label>
                    <br></br>
                    <input
                      id="breadth"
                      type="number"
                      value={breadth}
                      onChange={(e) => setBreadth(e.target.value)}
                      placeholder="Enter breadth"
                    />
                    <br></br>

                    {/* <label htmlFor="outerpages">
                      <b>Outer Pages</b> (Pages of the cover paper, i.e. 4):
                    </label>
                    <br></br>
                    <input
                      type="number"
                      id="outerpages"
                      placeholder="Enter number of pages"
                      value={outerpages}
                      onChange={handleOuterPagesChange}
                      min="8"
                      max="500"
                      required
                    /> */}
                    <br></br>
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
                      value={selectedCoverTreatmentType}
                      onChange={handleCoverTreatmentTypeChange}
                      // onChange={(e) =>
                      //   setSelectedCoverTreatmentType(e.target.value)
                      // }
                      required
                    >
                      <option value="">Select Cover Treatment Type</option>
                      {/* Map over the fetched cover treatment types */}
                      {coverTreatmentType.map((covertreatment, index) => (
                        <option key={index} value={covertreatment}>
                          {covertreatment}
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
                          <option key={index} value={thickness.thickness}>
                            {thickness.thickness}
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
                        //onChange={(e) => setSelectedCoverPaperType(e.target.value)}
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
                        id="paper-thickness"
                        name="paper-thickness"
                        value={selectedOuterPaperThickness}
                        onChange={handlePaperOuterThicknessChange}
                        className="paper-type-select"
                        required
                      >
                        <option value="">Set Paper Thickness</option>
                        {paperThicknesses.map((thickness, index) => (
                          <option key={index} value={thickness.thickness}>
                            {thickness.thickness}
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
                        {laminationType.map((lamination, index) => (
                          <option key={index} value={lamination}>
                            {lamination}
                          </option>
                        ))}
                      </select>
                    </div>
                    <br></br>
                    <div className="l-container">
                      <label htmlFor="outer-lamination-type">
                        <b>Outer </b>Lamination Type{" "}
                      </label>
                      <br></br>
                      <select
                        id="outer-lamination-type"
                        name="outer-lamination-type"
                        value={selectedOuterLaminationType}
                        onChange={handleOuterLaminationTypeChange}
                        required
                      >
                        <option value="">Select Outer Lamination Type</option>
                        {laminationType.map((lamination, index) => (
                          <option key={index} value={lamination}>
                            {lamination}
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
                        <option key={index} value={size.label}>
                          {size.label}
                        </option>
                      ))}
                    </select>
                    <br></br>
                    <br></br>
                    <label htmlFor="plateSize">
                      <b>Sheet </b>Size:
                    </label>
                    <br></br>
                    <br></br>
                    <select
                      id="sheetSize"
                      value={sheetSize}
                      onChange={handleSheetSizeChange}
                    >
                      <option value="">Select Sheet Size</option>
                      {sheetSizes.map((size, index) => (
                        <option key={size.sheetSizeId} value={size.sheetSize}>
                          {size.sheetSize}
                        </option>
                      ))}
                    </select>
                    <br></br>
                    <br></br>
                    <p>
                      The selected sheet will fit a quantity of: {paperFit}{" "}
                      Papers
                    </p>
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
                      {inks.map((ink) => (
                        <option key={ink.inkId} value={ink.inkType}>
                          {ink.inkType}
                        </option>
                      ))}
                    </select>
                    <br></br>
                    <br></br>
                  </div>
                </div>
                <br></br>

                <DrawerTest
                  // inkCost={inkCost}
                  pages={pages}
                  length={length}
                  breadth={breadth}
                  standardLength={standardLength}
                  standardBreadth={standardBreadth}
                  sheetValue={sheetValue}
                  sheetLength={sheetLength}
                  sheetBreadth={sheetBreadth}
                  quantity={quantity}
                  sheetSize={sheetSize}
                  paperSize={paperSize}
                  selectedPaperType={selectedPaperType}
                  selectedPaperThickness={selectedPaperThickness}
                  selectedOuterPaperThickness={selectedOuterPaperThickness}
                  totalReams={totalReams(quantity, pages)}
                  selectedBindingType={selectedBindingType}
                  outerSelectedPaperType={outerSelectedPaperType}
                  plateSize={plateSize}
                  selectedLaminationType={selectedLaminationType}
                  changeCostPerKg={paperPrice}
                  selectedInkType={selectedInkType}
                  plateCost={plateCost}
                  laminationCost={laminationPrice}
                  bindingCost={bindingCost}
                  outerPaperPrice={outerPaperPrice}
                  totalCost={totalCost}
                  requiredSheet={totalSheets(quantity, pages, paperFit)}
                  paperFit={paperFit}
                  totalPacket={totalPacket(quantity)}
                  selectedOuterLaminationType={selectedOuterLaminationType}
                  outerLaminationRate={outerLaminationRate}
                />
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
