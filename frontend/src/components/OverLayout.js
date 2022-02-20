import React, { useState } from "react";
import { Layout } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LoginOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import MenuRoute from "./MenuRoute";

const { Header, Content, Footer, Sider } = Layout;

function OverLayout(props) {
  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <Layout>
      {user ? (
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{ backgroundColor: "white" }}
        >
          <Link
            to="/"
            className=" logo d-flex justify-content-center align-items-center text-dark text-decoration-none"
          >
            <span className={collapsed ? "fs-5" : "fs-2"}>UrStocks</span>
          </Link>
          <MenuRoute />
        </Sider>
      ) : null}

      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0, backgroundColor: "white" }}
        >
          <header>
            <div className="d-flex flex-column flex-md-row align-items-space-around pb-3 mb-4 border-bottom">
              {}
              {user ? (
                collapsed ? (
                  <MenuUnfoldOutlined
                    style={{ fontSize: 24, margin: "1rem 0 0 1rem" }}
                    onClick={() => setCollapsed(!collapsed)}
                  />
                ) : (
                  <MenuFoldOutlined
                    style={{ fontSize: 24, margin: "1rem 0 0 1rem" }}
                    onClick={() => setCollapsed(!collapsed)}
                  />
                )
              ) : (
                <Link
                  to="/"
                  className=" d-flex justify-content-center align-items-center text-dark text-decoration-none"
                >
                  <h1>UrStocks</h1>
                </Link>
              )}
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
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "90vh",
          }}
        >
          {props.children}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          urStocks ©2018 Created by Srijan Bajracharya
        </Footer>
      </Layout>
    </Layout>
  );
}

export default OverLayout;
