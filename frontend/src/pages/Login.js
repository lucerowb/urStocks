import { useState, useEffect } from "react";
import { Form, Input, Button } from "antd";
import { withRouter, Link } from "react-router-dom";
import {
  RightSquareOutlined,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";

const FormItem = Form.Item;
const { Password } = Input;

function Login() {
  const onFinish = (values) => {
    console.log("registration", values);
  };
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div>
        <section>
          <h1>
            <RightSquareOutlined />
            Login
          </h1>
          <p>Sign in to urstocks</p>
        </section>
        <section className="form">
          <Form onFinish={onFinish} className="login-form">
            {/* <FormItem
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
          </FormItem> */}
            <FormItem
              name="username"
              rules={[
                { required: true, message: "Please enter your username" },
                {
                  pattern: "^[a-zA-Z0-9_.]*$",
                  message:
                    "only alphabets, numbers and special characters (.) & (_) are allowed",
                },
              ]}
            >
              <Input
                size="large"
                prefix={<UserOutlined />}
                placeholder="Username"
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
  );
}

export default Login;
