import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OverLayout from "./components/OverLayout";
import Portfolio from "./pages/portfolio/Portfolio";
import Company from "./pages/company/Company";
import NotFound from "./components/notFound";
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </OverLayout>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
