import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-1">
        <div>
          <div className="z-50 normalText">
            <ToastContainer
              newestOnTop
              pauseOnFocusLoss
              autoClose={3000}
              hideProgressBar
            />
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default RootLayout;
