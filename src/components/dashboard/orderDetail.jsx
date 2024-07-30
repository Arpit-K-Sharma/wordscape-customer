import React from "react";

const OrderDetails = (order) => {
  console.log(order);
  const {
    date,
    paperSize,
    pages,
    quantity,
    bindingType,
    coverTreatmentType,
    innerPaperType,
    innerPaperThickness,
    outerPaperType,
    outerPaperThickness,
    laminationType,
    inkType,
    remarks,
    customerName,
    orientation,
  } = order;

  if (!date) {
    return (
      <div className="order-details p-4 rounded shadow-lg bg-gray-100 max-w-lg mx-auto">
        No order details available.
      </div>
    );
  }

  return (
    <div className="order-details p-4 rounded shadow-lg bg-gray-100 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Order Details</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <strong>Customer Name:</strong> <span>{customerName}</span>
        </div>
        <div>
          <strong>Date:</strong> <span>{new Date(date).toLocaleString()}</span>
        </div>
        <div>
          <strong>Paper Size:</strong> <span>{paperSize}</span>
        </div>
        <div>
          <strong>Orientatino:</strong> <span>{orientation}</span>
        </div>
        <div>
          <strong>Pages:</strong> <span>{pages}</span>
        </div>
        <div>
          <strong>Quantity:</strong> <span>{quantity}</span>
        </div>
        <div>
          <strong>Binding Type:</strong> <span>{bindingType}</span>
        </div>
        <div>
          <strong>Cover Treatment Type:</strong>{" "}
          <span>{coverTreatmentType}</span>
        </div>
        <div>
          <strong>Inner Paper Type:</strong> <span>{innerPaperType}</span>
        </div>
        <div>
          <strong>Inner Paper Thickness:</strong>{" "}
          <span>{innerPaperThickness} gsm</span>
        </div>
        <div>
          <strong>Outer Paper Type:</strong> <span>{outerPaperType}</span>
        </div>
        <div>
          <strong>Outer Paper Thickness:</strong>{" "}
          <span>{outerPaperThickness} gsm</span>
        </div>
        <div>
          <strong>Lamination Type:</strong> <span>{laminationType}</span>
        </div>
        <div>
          <strong>Ink Type:</strong> <span>{inkType}</span>
        </div>
        <div>
          <strong>Remarks:</strong> <span>{remarks}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
