import logo from "./logo.svg";
import "./App.css";
import { Provider } from "react-redux";
import Home from "./features/Home";
import PincodeDetails from "./features/PincodeDetails";
import store from "./store";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/pincode-details" element={<PincodeDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;