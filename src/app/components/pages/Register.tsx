"use client";

import React from "react";
import type { FormProps } from "antd";
import { Button, Col, Form, Input, Row } from "antd";
import Link from "next/link";
import { useRequest } from "ahooks";
import { registerUser } from "@/controllers/user.controller";
import { useRouter } from "next/navigation";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
  email?: string;
  firstname?: string;
  lastname?: string;
};

const RegisterContainer: React.FC = () => {
  const router = useRouter();
  const data = useRequest((data) => registerUser(data), {
    manual: true,
    onSuccess: (user) => {
      console.log(user);
      router.push("/login");
    }
  });
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
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
              label="First Name"
              name="firstname"
              rules={[
                { required: true, message: "Please input your firstname!" },
              ]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Last Name"
              name="lastname"
              rules={[
                { required: true, message: "Please input your lastname!" },
              ]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
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
              <Button type="primary" htmlType="submit" size="large" loading={data.loading} disabled={data.loading}>
                Register
              </Button>
            </Form.Item>
          </Form>

          <Link href={"/login"}>
            <Button type="link" size="large" className="mt-6">
              Already have an account? Login
            </Button>
          </Link>
        </div>
      </Col>
    </Row>
  );
};

export default RegisterContainer;
