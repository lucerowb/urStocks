import { useState, useEffect } from "react";
import { Form, Input, Button } from "antd";
import { withRouter, Link } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const FormItem = Form.Item;
const { Password } = Input;

function Register() {
  const onFinish = (values) => {
    console.log("registration", values);
  };

  return (
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
  );
}

export default Register;
