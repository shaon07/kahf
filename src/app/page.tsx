import { Button, Col, Row } from "antd";
import ProfileImageUploader from "./components/Organisms/ProfileImageUploader";
import UserForm from "./components/Organisms/UserForm";

export default function Home() {
  return (
    <form className="p-6">
      <Row>
        <Col xs={24} lg={16} className="mx-auto">
          <div className="">
            <div className="mt-6">
              <ProfileImageUploader />
            </div>

            <div className="mt-6">
              <UserForm />
            </div>
          </div>

          <div className="mt-6">
            <Button className="w-full" type="primary" size="large">
              Login
            </Button>
          </div>
        </Col>
      </Row>
    </form>
  );
}
