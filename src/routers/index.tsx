import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/home";
import W3Node from "../pages/W3Node";
import Validators from "../pages/Validators";
import Dashboard from "../pages/Dashboard";
import Assets from "../pages/Assets";
import LoginPage from "../pages/login";
const RoutersComponent = () => {
  return (
    <div>
      <Routes>
        <Route path="/" Component={() => <HomePage />} />
        <Route path="/login" Component={() => <LoginPage />} />
        <Route path="/W3Node" Component={() => <W3Node />} />
        <Route path="/Validators" Component={() => <Validators />} />
        <Route path="/Dashboard" Component={() => <Dashboard />} />
        <Route path="/Assets" Component={() => <Assets />} />
      </Routes>
    </div>
  );
};

export default RoutersComponent;
