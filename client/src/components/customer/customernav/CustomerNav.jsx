import React, { useContext } from "react";
import { UserContext } from "../../../context/user/User";
import { Button } from "react-bootstrap";

const CustomerNav = () => {
  const { setComponent, setShowAppointmentModal } = useContext(UserContext);

  return (
    <div style={{ marginTop: "1.5rem" }}>
      <div className="d-flex  flex-column justify-content-center align-items-center">
        <div className="p-4 shadow-lg rounded border border-gray-300 bg-white w-100">
          <div className="d-grid gap-4 ">
            <Button
              variant="outline-link"
              onClick={() => setComponent("about-us")}
              style={{
                borderBottom: "2px solid #ced4da",
                borderLeft: "2px solid #ced4da",
              }}
            >
              About Us
            </Button>
            <Button
              variant="outline-link"
              onClick={() => setComponent("appointment")}
              style={{
                borderBottom: "2px solid #ced4da",
                borderLeft: "2px solid #ced4da",
              }}
            >
              My Appointment
            </Button>
            <Button
              variant="outline-link"
              onClick={() => setComponent("employer")}
              style={{
                borderBottom: "2px solid #ced4da",
                borderLeft: "2px solid #ced4da",
              }}
            >
              Employers
            </Button>
            <Button
              variant="outline-link"
              onClick={() => setComponent("following-us")}
              style={{
                borderBottom: "2px solid #ced4da",
                borderLeft: "2px solid #ced4da",
              }}
            >
              Following Us
            </Button>
            <Button
              variant="outline-link"
              onClick={() => setComponent("feed-back")}
              style={{
                borderBottom: "2px solid #ced4da",
                borderLeft: "2px solid #ced4da",
              }}
            >
              Feed Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerNav;
