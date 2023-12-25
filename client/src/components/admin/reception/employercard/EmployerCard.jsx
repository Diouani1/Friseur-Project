import { useContext } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { AdminContext } from "../../../../context/admin/Admin";
import { UserContext } from "../../../../context/user/User";
import AlertDanger from "../../../alert/AlertDanger";
import AlertSuccess from "../../../alert/AlertSuccess";
import Avatar from "../../../../assets/avatar.jpg";

const EmployerCard = () => {
  const {
    employerCard,
    setModalShow,
    setWorker,
    selectedEmployer,
    setSelectedEmployer,
  } = useContext(AdminContext);

  const { showError, showSuccess, setShowSuccess } = useContext(UserContext);

  const handleService = (employer) => {
    setShowSuccess(false);
    setModalShow(true);
    setWorker(employer);
    setSelectedEmployer(employer);
  };

  return (
    <Container style={{ marginTop: "3%" }}>
      <Row className="justify-content-center" style={{ gap: "1rem" }}>
        {showError && <AlertDanger />}
        {employerCard &&
          employerCard.map((employer) => (
            <Col
              md={6}
              lg={3}
              key={employer._id}
              style={{ padding: "1rem" }}
              className="d-flex justify-content-center"
            >
              {selectedEmployer === employer && showSuccess ? (
                <AlertSuccess />
              ) : (
                <Card
                  style={{
                    width: "18rem",
                    height: "500px",
                    padding: "1rem",
                    boxShadow: "2px 4px 8px  rgba(0, 0, 0, 0.7)",
                  }}
                >
                  <div className="d-flex justify-content-center">
                    <Card.Img
                      style={{
                        width: "200px",
                        height: "auto",
                        maxWidth: "100%",
                        borderRadius: "50%",
                      }}
                      variant="top"
                      src={
                        employer.imgProfile.path
                          ? employer.imgProfile.path
                          : Avatar
                      }
                    />
                  </div>
                  <Card.Body className="d-flex flex-column align-items-around justify-content-around">
                    <Card.Title className="text-center">
                      {employer.fullName.toUpperCase()}
                    </Card.Title>
                    <Card.Title className="text-center">
                      {employer.telephone}
                    </Card.Title>
                    <Button
                      variant="outline-dark"
                      onClick={() => handleService(employer)}
                    >
                      Add Service
                    </Button>
                  </Card.Body>
                </Card>
              )}
            </Col>
          ))}
      </Row>
    </Container>
  );
};
export default EmployerCard;
