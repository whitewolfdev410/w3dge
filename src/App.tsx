import "./App.css";
import RoutersComponent from "./routers";
import Headers from "./components/header";
import ShadowValidators from "./assets/images/Ellipse_9.png";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  return (
    <>
      <main className="max-width-app pt-9">
        {location.pathname !== "/" && location.pathname !== "/W3Node" && (
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
    </>
  );
}

export default App;
