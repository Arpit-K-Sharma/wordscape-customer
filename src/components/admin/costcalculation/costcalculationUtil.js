// costCalculationUtil.js

import axios from "../../axiosInstance";

const CostCalculationUtil = {
  // Axios functions
  getPaperSizes: async () => {
    try {
      const response = await axios.get("/paperSizes");
      return response.data.map((size) => ({
        value: size.paperSizeId,
        label: size.paperSize,
        length: size.paperLength,
        breadth: size.paperBreadth,
      }));
    } catch (error) {
      console.error("Error fetching paper sizes:", error);
      return [];
    }
  },

  getBindingTypes: async () => {
    try {
      const response = await axios.get("/bindings");
      return response.data.map((binding) => binding.bindingType);
    } catch (error) {
      console.error("Error fetching binding types:", error);
      return [];
    }
  },

  getCoverTreatmentTypes: async () => {
    try {
      const response = await axios.get("/coverTreatments");
      return response.data.map(
        (covertreatment) => covertreatment.coverTreatmentType
      );
    } catch (error) {
      console.error("Error fetching cover treatment types:", error);
      return [];
    }
  },

  getPaperTypes: async () => {
    try {
      const response = await axios.get("/papers");
      return response.data;
    } catch (error) {
      console.error("Error fetching paper data:", error);
      return [];
    }
  },

  getLaminationTypes: async () => {
    try {
      const response = await axios.get("/laminations");
      return response.data.map((lamination) => lamination.laminationType);
    } catch (error) {
      console.error("Error fetching lamination types:", error);
      return [];
    }
  },

  getPlateSizes: async () => {
    try {
      const response = await axios.get("/plates");
      return response.data.map((plate) => ({
        value: plate.plateId,
        label: plate.plateSize,
      }));
    } catch (error) {
      console.error("Error fetching plate sizes:", error);
      return [];
    }
  },

  getInks: async () => {
    try {
      const response = await axios.get("/inks");
      return response.data;
    } catch (error) {
      console.error("Error fetching inks:", error);
      return [];
    }
  },

  getSheetSizes: async () => {
    try {
      const response = await axios.get("/sheetSizes");
      return response.data;
    } catch (error) {
      console.error("Error fetching sheet sizes:", error);
      return [];
    }
  },

  getRatePlate: async (plateSize) => {
    try {
      const response = await axios.get("/plates");
      const plate = response.data.find(
        (plate) => plate.plateSize === plateSize
      );
      if (plate) {
        return { plateRate: plate.plateRate, inkRate: plate.inkRate };
      } else {
        console.error("Plate size not found:", plateSize);
        return { plateRate: 0, inkRate: 0 };
      }
    } catch (error) {
      console.error("Error fetching plate rate:", error);
      return { plateRate: 0, inkRate: 0 };
    }
  },

  getRateForPaper: async (selectedPaperType) => {
    try {
      const response = await axios.get("/papers");
      const selectedPaper = response.data.find(
        (paper) => paper.paperType === selectedPaperType
      );
      return selectedPaper ? selectedPaper.rate : 0;
    } catch (error) {
      console.error("Error fetching paper rates:", error);
      return 0;
    }
  },

  getRateForBindingType: async (selectedBindingType) => {
    try {
      const response = await axios.get("/bindings");
      const selectedBinding = response.data.find(
        (binding) => binding.bindingType === selectedBindingType
      );
      return selectedBinding ? selectedBinding.rate : 0;
    } catch (error) {
      console.error("Error fetching binding types:", error);
      return 0;
    }
  },

  getRateForLaminationType: async (selectedLaminationType) => {
    try {
      const response = await axios.get("/laminations");
      const selectedLamination = response.data.find(
        (lamination) => lamination.laminationType === selectedLaminationType
      );
      return selectedLamination ? selectedLamination.rate : 0;
    } catch (error) {
      console.error("Error fetching lamination types:", error);
      return 0;
    }
  },

  // Cost calculation functions
  fitPapers: (sheetBreadth, sheetLength, paperBreadth, paperLength) => {
    const calculateFit = (
      sheetBreadth,
      sheetLength,
      paperBreadth,
      paperLength
    ) => {
      let fitHorizontally = Math.floor(sheetBreadth / paperBreadth);
      let fitVertically = Math.floor(sheetLength / paperLength);
      return fitHorizontally * fitVertically;
    };

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

    return Math.max(fitNormal, fitRotated) * 2;
  },

  fitPlate: (plateBreadth, plateLength, paperBreadth, paperLength) => {
    const calculatePlate = (
      plateBreadth,
      plateLength,
      paperBreadth,
      paperLength
    ) => {
      let fitHorizontally = Math.floor(plateBreadth / paperBreadth);
      let fitVertically = Math.floor(plateLength / paperLength);
      return fitHorizontally * fitVertically;
    };

    let fitNormal = calculatePlate(
      plateBreadth,
      plateLength,
      paperBreadth,
      paperLength
    );
    let fitRotated = calculatePlate(
      plateBreadth,
      plateLength,
      paperLength,
      paperBreadth
    );

    return Math.max(fitNormal, fitRotated);
  },

  totalPlate: (pages, plateFit, selectedInkType) => {
    const totalNo = Math.ceil(pages / plateFit);
    return selectedInkType === "CMYK" ? totalNo * 4 : totalNo;
  },

  reamCalc: (selectedPaperThickness, sheetValue) => {
    return Math.ceil(sheetValue * selectedPaperThickness);
  },

  innerPaperCost: (
    sheetValue,
    selectedPaperThickness,
    pages,
    quantity,
    paperFit,
    paperPrice
  ) => {
    const pt = parseInt(selectedPaperThickness);
    const totalReams = Math.ceil(
      0.05 * Math.floor((pages * quantity) / paperFit / 500) +
        Math.floor((pages * quantity) / paperFit / 500)
    );
    return ((sheetValue * pt * paperPrice) / 3100) * totalReams;
  },

  outerFinalCost: (
    sheetValue,
    selectedOuterPaperThickness,
    paperFit,
    quantity,
    outerPaperPrice,
    sheetPackage
  ) => {
    const pt = parseInt(selectedOuterPaperThickness);
    const totalPacket = Math.ceil((4 * quantity) / paperFit / 100);
    let calc = ((sheetValue * pt * outerPaperPrice) / 3100 / 4) * totalPacket;

    if (sheetPackage === "250") {
      calc /= 2;
    } else if (sheetPackage === "125") {
      calc /= 4;
    }

    return calc;
  },

  laminationFinal: (laminationCost, sheetLength, sheetBreadth, quantity) => {
    return laminationCost * (sheetLength / 2) * (sheetBreadth / 2) * quantity;
  },

  totalReams: (pages, quantity, paperFit) => {
    return Math.ceil(
      0.05 * Math.floor((pages * quantity) / paperFit / 500) +
        Math.floor((pages * quantity) / paperFit / 500)
    );
  },

  totalPacket: (quantity, paperFit) => {
    const sheets = (4 * quantity) / paperFit;
    return Math.ceil(sheets / 100);
  },

  calculateTotalCost: (params) => {
    const {
      quantity,
      paperFit,
      selectedOuterPaperThickness,
      outerChangeCostPerKg,
      pages,
      plateCost,
      bindingCost,
      laminationPrice,
      sheetLength,
      sheetBreadth,
      length,
      breadth,
      inkPlate,
      noPlate,
    } = params;

    const packetCost = Math.ceil(
      (CostCalculationUtil.totalPacket(quantity, paperFit) *
        CostCalculationUtil.reamCalc(
          selectedOuterPaperThickness,
          outerChangeCostPerKg
        )) /
        5
    );

    const platePriceCost =
      CostCalculationUtil.totalPlate(pages, paperFit) * plateCost;
    const bindingTotalCost = Math.ceil(bindingCost * quantity);
    const inkPlateCost = inkPlate * noPlate;
    const laminationTotalCost = CostCalculationUtil.laminationFinal(
      laminationPrice,
      sheetLength || length,
      sheetBreadth || breadth,
      quantity
    );

    return (
      packetCost +
      platePriceCost +
      bindingTotalCost +
      inkPlateCost +
      laminationTotalCost
    );
  },
};

export default CostCalculationUtil;
