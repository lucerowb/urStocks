import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Dashboard from "./pages/Dashboard";
import AddStock from "./pages/AddStock";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OverLayout from "./components/OverLayout";
import Portfolio from "./pages/Portfolio";
import Company from "./pages/Company";
function App() {
  return (
    <>
      <Router>
        <OverLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/company" element={<Company />} />
          </Routes>
        </OverLayout>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
