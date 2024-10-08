// Import necessary dependencies
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const ToastMessage = () => {
  // Function to display a success toast
  const notifySuccess = () => {
    toast.success("This is a success message!", {
      position: "top-right",
    });
  };

  // Function to display an error toast
  const notifyError = () => {
    toast.error("This is an error message!", {
      position: "top-right",
    });
  };

  // Function to display a custom info toast
  const notifyInfo = () => {
    toast.info("This is an info message!", {
      position: "top-right",
    });
  };

  // Function to display a warning toast
  const notifyWarning = () => {
    toast.warn("This is a warning message!", {
      position: "top-right",
    });
  };

  return (
    <div>
      <h1>Toast Notification Example</h1>

      {/* Buttons to trigger different types of toasts */}
      <button onClick={notifySuccess}>Show Success Toast</button>
      <button onClick={notifyError}>Show Error Toast</button>
      <button onClick={notifyInfo}>Show Info Toast</button>
      <button onClick={notifyWarning}>Show Warning Toast</button>

      {/* Toast container to display all toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default ToastMessage;
