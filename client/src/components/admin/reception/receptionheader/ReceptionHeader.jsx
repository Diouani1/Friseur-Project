import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { AdminContext } from "../../../../context/admin/Admin";
import { UserContext } from "../../../../context/user/User";
const ReceptionNavBar = () => {
  const { setShow } = useContext(AdminContext);
  const { setShowAppointmentModal } = useContext(UserContext);
  return (
    <header
      style={{
        background: "black",
        position: "sticky",
        top: "0",
        zIndex: "10",
      }}
    >
      <div className="d-flex  justify-content-between align-items-center px-5 py-2">
        <Button
          variant="outline-light"
          onClick={() => setShowAppointmentModal(true)}
        >
          Booked Apointment
        </Button>
        <Button variant="outline-light" onClick={() => setShow(true)}>
          Leave The Reception
        </Button>
      </div>
    </header>
  );
};

export default ReceptionNavBar;
