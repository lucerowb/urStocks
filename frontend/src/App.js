import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Dashboard from "./pages/Dashboard";
import AddStock from "./pages/AddStock";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import OverLayout from "./components/OverLayout";
import Portfolio from "./pages/Portfolio";
function App() {
  return (
    <>
      <Router>
        {/* <Header /> */}
        <OverLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* <Route path="/add-stock" element={<AddStock />} /> */}
            <Route path="/portfolio" element={<Portfolio />} />
          </Routes>
        </OverLayout>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
