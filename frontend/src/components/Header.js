import { Link, useNavigate } from "react-router-dom";
import { LoginOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
  return (
    <header>
      <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
        <Link
          to="/"
          className="d-flex align-items-center text-dark text-decoration-none"
        >
          <span className="fs-4">UrStocks</span>
        </Link>

        <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
          {user ? (
            <>
              <button
                className="me-3 py-2 text-white text-decoration-none btn btn-dark"
                onClick={onLogout}
              >
                <LogoutOutlined />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                className="me-3 py-2 text-white text-decoration-none btn btn-dark"
                to="/login"
              >
                <LoginOutlined />
                Login
              </Link>
              <Link
                className="me-3 py-2 text-white text-decoration-none btn btn-dark"
                to="/register"
              >
                <UserOutlined />
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
