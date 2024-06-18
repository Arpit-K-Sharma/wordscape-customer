import { createPortal } from "react-dom";
import ToastContainer from "rsuite/esm/toaster/ToastContainer";

const ToastPortal = () => {
  return (
    <>
      {createPortal(
        <ToastContainer />,
        document.getElementById("toast-container")
      )}
    </>
  );
};

export default ToastPortal;
