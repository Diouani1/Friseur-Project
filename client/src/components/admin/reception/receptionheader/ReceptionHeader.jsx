import React, { useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { AdminContext } from "../../../../context/admin/Admin";
const ReceptionNavBar = () => {
  const { setShow } = useContext(AdminContext);
  return (
    <header style={{ background: "black" }}>
      <Container>
        <Row className="align-items-center">
          <Col xs={12} sm={8} md={6} className="text-center mb-3 mb-sm-0">
            <h1 style={{ color: "white" }}>Reception</h1>
          </Col>
          <Col xs={12} sm={4} md={6} className="text-end">
            <Button variant="outline-light" onClick={() => setShow(true)}>
              Leave The Reception
            </Button>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default ReceptionNavBar;
