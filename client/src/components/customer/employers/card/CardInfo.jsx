import React, { useContext } from "react";
import { AdminContext } from "../../../../context/admin/Admin";
import { UserContext } from "../../../../context/user/User";
import { Card, Button } from "react-bootstrap";

const CardInfo = () => {
  const { selectedEmployer } = useContext(AdminContext);
  const { setComponent, setShowAppointmentModal } = useContext(UserContext);
  return (
    <div style={{ marginTop: "1.5rem" }}>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="p-4 shadow-lg rounded border border-gray-300 bg-white w-100">
          <Card
            style={{
              width: "18rem",
              height: "500px",
              padding: "1rem",
              boxShadow: "1px 2px 4px  rgba(0, 0, 0, 0.7)",
              margin: "0 auto",
            }}
          >
            <div className="d-flex justify-content-center">
              <Card.Img
                style={{
                  borderRadius: "50%",
                }}
                className="profileImg"
                variant="top"
                src={`/api/post/profile-picture/${selectedEmployer.userName}`}
              />
            </div>
            <Card.Body className="d-flex flex-column align-items-around justify-content-around">
              <Card.Title className="text-center">
                {selectedEmployer.userName}
              </Card.Title>
              <Card.Title className="text-center">experience</Card.Title>
              <Button
                variant="outline-dark"
                onClick={() => setShowAppointmentModal(true)}
              >
                Book appointment
              </Button>
            </Card.Body>
            <Card.Footer>
              <Button
                variant="outline-dark"
                onClick={() => {
                  setComponent("employer");
                  setShowError(false);
                }}
              >
                Go back
              </Button>
            </Card.Footer>
          </Card>
          <div className="d-grid gap-2  mt-4">
            <Button
              variant="outline-light"
              onClick={() => {
                setComponent("customer-nav");
                setShowError(false);
              }}
              style={{
                borderBottom: "2px solid black",
                borderLeft: "2px solid black",
                color: "black",
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardInfo;
