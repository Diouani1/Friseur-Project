import { useContext } from "react";

import { Button } from "react-bootstrap";
import { UserContext } from "../../../context/user/User";
const UserAppointment = () => {
  const { setComponent, setShowError } = useContext(UserContext);

  return (
    <div style={{ marginTop: "1.5rem" }}>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="p-4 shadow-lg rounded border border-gray-300 bg-white w-100">
          <h5
            style={{ color: "darkblue" }}
            className="mb-4 text-center font-weight-bold"
          >
            My Appointment
          </h5>
          <div>
            <p>
              Thank you for checking your appointment. Our team is currently
              working on processing your request. We understand the importance
              of providing you with the necessary information. Please be
              patient, and we will get back to you as soon as possible with the
              details regarding your appointment. If you have any urgent
              concerns, please feel free to contact our support team. We
              appreciate your cooperation.
            </p>
          </div>
          <div className="d-grid gap-2 ">
            <Button
              variant="outline-light"
              onClick={() => {
                setComponent("customer-nav");
                setShowError(false);
              }}
              style={{
                borderBottom: "2px solid #ced4da",
                borderLeft: "2px solid #ced4da",
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

export default UserAppointment;
