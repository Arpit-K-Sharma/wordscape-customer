function fitPapers(sheetBreadth, sheetLength, paperBreadth, paperLength) {
  // Function to calculate the number of papers that fit in a given orientation
  function calculateFit(sheetBreadth, sheetLength, paperBreadth, paperLength) {
    let fitHorizontally = Math.floor(sheetBreadth / paperBreadth);
    let fitVertically = Math.floor(sheetLength / paperLength);
    return fitHorizontally * fitVertically;
  }

  // Calculate fit for both orientations
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
  // Return the maximum of the two fits
  return Math.max(fitNormal, fitRotated);
}

// Example usage:
let sheetWidth = 24;
let sheetHeight = 36;
let paperWidth = 8.3;
let paperHeight = 11.7;

let numberOfPapers = fitPapers(
  sheetWidth,
  sheetHeight,
  paperWidth,
  paperHeight
);
console.log(numberOfPapers); // Outputs the number of papers that fit
