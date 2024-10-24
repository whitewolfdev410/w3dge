import "./App.css";
import RoutersComponent from "./routers";
import Headers from "./components/header";
import ShadowValidators from "./assets/images/Ellipse_9.png";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { accessToken } from "./assets/constant";
import LoginPage from "./pages/login";
import { useAccount } from "wagmi";
import { useDispatch } from "react-redux";
import * as walletStore from "./store/wallet";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [loadingPage, setLoadingPage] = useState(true);
  const { address, isConnected } = useAccount();
  useEffect(() => {
    if (address) {
      dispatch(walletStore.setAddress(address));
    }
  }, [address]);

  useEffect(() => {
    const token = localStorage.getItem(accessToken);
    if (token) {
      setLoadingPage(false);
    } else {
      localStorage.setItem(accessToken, "sdfsdf");
      setLoadingPage(false);
    }
  }, []);

  if (loadingPage) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="w-16 h-16 border-4 border-primary-main border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <div>
      {isConnected ? (
        <main className="max-width-app pt-9">
          {location.pathname !== "/" &&
            location.pathname !== "/W3Node" &&
            location.pathname !== "/Dashboard" && (
              <div>
                <div
                  className="h-full top-4 w-[50%] -left-[25%] bg-contain bg-center bg-no-repeat fixed -z-10"
                  style={{
                    backgroundImage: `url(${ShadowValidators})`,
                  }}
                ></div>
                <div
                  className="h-full w-[50%] -right-[25%] bg-contain bg-center bg-no-repeat fixed top-4 -z-10"
                  style={{
                    backgroundImage: `url(${ShadowValidators})`,
                  }}
                ></div>
              </div>
            )}
          <Headers />
          <div className="section">
            <RoutersComponent />
          </div>
        </main>
      ) : (
        <div className="section-loginPage max-width-app">
          <LoginPage />
        </div>
      )}
    </div>
  );
}

export default App;
