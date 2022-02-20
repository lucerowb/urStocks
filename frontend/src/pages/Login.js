import { useState, useEffect } from "react";
import { Form, Input, Button, Spin } from "antd";
import { LoginOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { login, reset } from "../features/auth/authSlice";

const FormItem = Form.Item;
const { Password } = Input;

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onFinish = (values) => {
    console.log("login", values);
    const userData = {
      email: values?.email,
      password: values?.password,
    };
    dispatch(login(userData));
  };
  return (
    <Spin spinning={isLoading}>
      <div className="d-flex justify-content-center align-items-center">
        <div>
          <section>
            <h1>
              <LoginOutlined />
              Login
            </h1>
            <p>Sign in to urstocks</p>
          </section>
          <section className="form">
            <Form onFinish={onFinish} className="login-form">
              <FormItem
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please enter your email",
                  },
                  {
                    type: "email",
                    message: "Please enter valid email",
                  },
                ]}
              >
                <Input
                  size="large"
                  prefix={<UserOutlined />}
                  placeholder="Email"
                />
              </FormItem>
              <FormItem
                name="password"
                rules={[
                  { required: true, message: "Please enter your password" },
                ]}
              >
                <Password
                  size="large"
                  prefix={<LockOutlined />}
                  placeholder="Password"
                />
              </FormItem>
              <FormItem>
                {/*<Link to={'/reset'} className="login-form-forgot">*/}
                {/*Forgot password*/}
                {/*</Link>*/}
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Login
                </Button>
              </FormItem>
            </Form>
          </section>
        </div>
      </div>
    </Spin>
  );
}

export default Login;
