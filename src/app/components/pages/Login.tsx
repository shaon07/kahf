"use client";

import React from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import Link from "next/link";
import { useRequest } from "ahooks";
import { loginUser } from "@/controllers/user.controller";
import { redirect, useRouter } from "next/navigation";

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

const LoginContainer: React.FC = () => {
  const router = useRouter();
  const data = useRequest((data) => loginUser(data), {
    onSuccess: (data) => {
      console.log(data);
      router.push("/links");
    },
    manual: true,
  });
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log(values)
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
              rules={[
                { required: true, message: "Please input your email!" },
              ]}
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
              <Button type="primary" htmlType="submit" size="large">
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
