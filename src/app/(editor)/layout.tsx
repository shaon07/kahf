import { Button, Col, Row } from "antd";
import MainNavbar from "../components/Molecules/MainNavbar";
import ProfileLinkDetail from "../components/Organisms/ProfileLinkDetail";
import ProfileMockUp from "../components/Molecules/ProfileMockUp";

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
          <div className="bg-white rounded-md">
            <div>{children}</div>

            <hr />

            <div className="w-full flex justify-end p-6">
              <Button type="primary" size="large" className="w-full md:w-auto">
                Save
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </section>
  );
}
