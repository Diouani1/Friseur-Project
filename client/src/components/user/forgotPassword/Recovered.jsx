import { Container, Row, Col, Image, Alert, Button } from "react-bootstrap";
import { UserContext } from "../../../context/User";
import { useContext } from "react";

function Recovered() {
  const { setComponent, setModeType, setData, setShowPassword, navigate } =
    useContext(UserContext);
  const handleGoHome = () => {
    setModeType("login");
    navigate("/");
    setComponent("");
    setData({});
    setShowPassword(false);
  };
  return (
    <div>
      <section className="h-screen">
        <Container fluid className="h-100 text-gray-800 px-6 w-100">
          <Row className="h-100  justify-content-center justify-content-lg-between align-items-center g-1">
            <Col>
              <Alert show={true} variant="success">
                <Alert.Heading>My Alert</Alert.Heading>
                Password successfully set
                <p></p>
                <hr />
                <div className="d-flex justify-content-end">
                  <Button onClick={handleGoHome} variant="outline-success">
                    Welcome HOME
                  </Button>
                </div>
              </Alert>
            </Col>
          </Row>

          <Row className="h-100  justify-content-center justify-content-lg-between align-items-center g-1">
            <Col>
              <Image
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                fluid
                alt="Sample image"
              />
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default Recovered;
