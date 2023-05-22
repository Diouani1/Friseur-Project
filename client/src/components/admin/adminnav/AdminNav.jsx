import "./adminnav.css";
import { useContext } from "react";
import { Button } from "react-bootstrap";
import { UserContext } from "../../../context/user/User";

const AdminNav = () => {
  const { setComponent, setShowAppointmentModal } = useContext(UserContext);

  return (
    <div className="adminnav">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="p-4 shadow-lg rounded border border-gray-300 bg-white w-100">
          <div className="d-grid gap-2 ">
            <Button
              className="adminnav-button"
              variant="outline-link"
              onClick={() => setComponent("addnewpost")}
            >
              Add new Post
            </Button>
            <Button
              className="adminnav-button"
              variant="outline-link"
              onClick={() => setComponent("getreceipt")}
            >
              Get Receipts
            </Button>
            <Button
              className="adminnav-button"
              variant="outline-link"
              onClick={() => setShowAppointmentModal(true)}
            >
              Appointment
            </Button>
            <Button
              className="adminnav-button"
              variant="outline-link"
              onClick={() => setComponent("addemployer")}
            >
              Add new Employer
            </Button>
            <Button
              className="adminnav-button"
              variant="outline-link"
              onClick={() => setComponent("removeemployer")}
            >
              Remove Employer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNav;
