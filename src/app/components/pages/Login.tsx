"use client";

import React from "react";
import type { FormProps } from "antd";
import { Button, Col, Form, Input, Row } from "antd";
import Link from "next/link";
import { useRequest } from "ahooks";
import { loginUser } from "@/controllers/user.controller";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { login, setUserDetails } from "@/redux/userSlice";
import Cookies from "js-cookie";

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

const LoginContainer: React.FC = () => {
  const router = useRouter();

  const dispatch = useDispatch();
  const data = useRequest((data) => loginUser(data), {
    onSuccess: (data) => {
      if (data?.status === "success") {
        dispatch(login());
        dispatch(setUserDetails(data?.data));
        router.push("/links");
        Cookies.set("isUser", "true", { expires: 7 });
        Cookies.set("Token", data?.data?.accessToken)
      }
    },
    manual: true,
  });
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    data.run(values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row>
      <Col xs={24}>
        <div className="bg-white rounded-md p-4 mx-auto">
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600, margin: "0 auto" }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password size="large" />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit" size="large"  loading={data.loading} disabled={data.loading}>
                Submit
              </Button>
            </Form.Item>
          </Form>

          <Link href="/register">
            <Button type="link" size="large" className="mt-6">
              Don't have an account? Register
            </Button>
          </Link>
        </div>
      </Col>
    </Row>
  );
};

export default LoginContainer;
