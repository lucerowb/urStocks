import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Spin } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

import { register, reset } from "../features/auth/authSlice";
import { useEffect } from "react";

const FormItem = Form.Item;
const { Password } = Input;

function Register() {
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
    console.log("registration", values);

    if (values?.password !== values?.password2) {
      toast.error("passwords do not match");
    } else {
      const userData = {
        name: values?.name,
        email: values?.email,
        password: values?.password,
      };
      dispatch(register(userData));
    }
  };

  return (
    <Spin spinning={isLoading}>
      <div className="d-flex justify-content-center align-items-center">
        <div>
          <section>
            <h1>
              <UserOutlined />
              Register
            </h1>
            <p>please create an account</p>
          </section>
          <section className="form">
            <Form onFinish={onFinish} className="login-form">
              <FormItem
                name="name"
                rules={[{ required: true, message: "Please input your name" }]}
              >
                <Input size="large" placeholder="name" />
              </FormItem>
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
                <Input size="large" placeholder="Email" />
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
              <FormItem
                name="password2"
                rules={[
                  { required: true, message: "Please enter confirm password" },
                ]}
              >
                <Password
                  size="large"
                  prefix={<LockOutlined />}
                  placeholder="Confirm Password"
                />
              </FormItem>
              <FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Register
                </Button>
              </FormItem>
            </Form>
          </section>
        </div>
      </div>
    </Spin>
  );
}

export default Register;
