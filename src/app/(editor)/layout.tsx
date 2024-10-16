"use client";

import { Button, Col, Form, FormProps, Row } from "antd";
import MainNavbar from "../components/Molecules/MainNavbar";
import ProfileLinkDetail from "../components/Organisms/ProfileLinkDetail";
import ProfileMockUp from "../components/Molecules/ProfileMockUp";
import { useRequest } from "ahooks";
import { getUserDetail, updateUser } from "@/controllers/user.controller";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setUserDetails } from "@/redux/userSlice";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname()
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const getUserData = useRequest(() => getUserDetail(), {
    onSuccess: (response) => {
      dispatch(setUserDetails(response?.data));
    },
    manual: true,
  });
  const data = useRequest((data) => updateUser(user.detail?.id, data), {
    manual: true,
    onSuccess: (response) => {
      dispatch(setUserDetails(response?.data));
    },
    onError: (error) => {
      console.error("Error updating user:", error);
    },
  });
  const onFinish: FormProps<any>["onFinish"] = (values) => {
    const payload = {
      ...values,
    };
    if (pathname === "/links") {
      const links = user?.detail?.socialLinks?.map((item: any) => ({
        platform: item.platform,
        url: item?.url,
      }));

      payload.socialLinks = links;
    }
    data.run(payload);
  };

  const onFinishFailed: FormProps<any>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    getUserData.run();
  }, []);

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
            initialValues={{
              firstname: user.detail.firstname || "",
              lastname: user.detail.lastname || "",
              email: user.detail.email || "",
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="w-full"
          >
            <div className="bg-white rounded-md">
              <div>{children}</div>

              <hr />

              <div className="w-full flex justify-end p-6">
                <Form.Item>
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
