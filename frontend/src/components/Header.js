import { Link } from "react-router-dom";
import { RightSquareOutlined, UserOutlined } from "@ant-design/icons";

function Header() {
  return (
    <header>
      <div class="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
        <Link
          to="/"
          class="d-flex align-items-center text-dark text-decoration-none"
        >
          <span class="fs-4">UrStocks</span>
        </Link>

        <nav class="d-inline-flex mt-2 mt-md-0 ms-md-auto">
          <Link class="me-3 py-2 text-dark text-decoration-none" to="/login">
            <RightSquareOutlined />
            Login
          </Link>
          <Link class="me-3 py-2 text-dark text-decoration-none" to="/register">
            <UserOutlined />
            Register
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
