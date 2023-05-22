import React, { useContext } from "react";
import { UserContext } from "../../../context/user/User";
import { Button } from "react-bootstrap";

const EmployerNav = () => {
  const { setComponent, setShowAppointmentModal } = useContext(UserContext);

  return (
    <div style={{ marginTop: "2rem" }}>
      <div className="d-flex  flex-column justify-content-center align-items-center">
        <div className="p-4 shadow-lg rounded border border-gray-300 bg-white w-100">
          <div className="d-grid gap-4 ">
            <Button
              variant="outline-link"
              onClick={() => setComponent("add-post")}
              style={{
                borderBottom: "2px solid #ced4da",
                borderLeft: "2px solid #ced4da",
              }}
            >
              Add new Post
            </Button>
            <Button
              variant="outline-link"
              onClick={() => setShowAppointmentModal(true)}
              style={{
                borderBottom: "2px solid #ced4da",
                borderLeft: "2px solid #ced4da",
              }}
            >
              Booked Appointment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerNav;
