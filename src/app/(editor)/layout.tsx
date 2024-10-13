"use client";

import { Button, Col, Form, FormProps, Row } from "antd";
import MainNavbar from "../components/Molecules/MainNavbar";
import ProfileLinkDetail from "../components/Organisms/ProfileLinkDetail";
import ProfileMockUp from "../components/Molecules/ProfileMockUp";

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const onFinish: FormProps<any>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<any>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <section className="p-3 flex flex-col gap-4">
      <MainNavbar />

      <Row gutter={[16, 16]}>
        <Col xs={0} lg={8}>
          <div className="bg-white rounded-md p-4">
            <ProfileLinkDetail>
              <ProfileMockUp />
            </ProfileLinkDetail>
          </div>
        </Col>

        <Col xs={24} lg={16}>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="w-full"
          >
            <div className="bg-white rounded-md">
              <div>{children}</div>

              <hr />

              <div className="w-full flex justify-end p-6">
              <Form.Item >
                <Button type="primary" size="large" htmlType="submit">
                  Save
                </Button>
              </Form.Item>
              </div>
            </div>
          </Form>
        </Col>
      </Row>
    </section>
  );
}
