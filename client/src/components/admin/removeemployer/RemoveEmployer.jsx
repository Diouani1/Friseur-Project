import "./removeemployer.css";
import { useContext, useEffect } from "react";
import { AdminContext } from "../../../context/admin/Admin";
import { Button } from "react-bootstrap";
import { UserContext } from "../../../context/user/User";
import AlertSuccess from "../../alert/AlertSuccess";

const RemoveEmployer = () => {
  const { employerCard, adminDispatch, setEmployerCard } =
    useContext(AdminContext);
  const {
    setComponent,
    setErrorMessage,
    showSuccess,
    setShowSuccess,
    setShowError,
    setSuccessMessage,
    setLastComponent,
  } = useContext(UserContext);

  const handleDeleteEmployer = (employer) => {
    adminDispatch({
      type: "delete-employer",
      setErrorMessage,
      setShowSuccess,
      setSuccessMessage,
      setEmployerCard,
      employerCard,
      employer,
      setShowError,
    });
  };
  const handleMakeAsUser = (employer) => {
    adminDispatch({
      type: "make-as-user",
      setErrorMessage,
      setShowSuccess,
      setSuccessMessage,
      setEmployerCard,
      employerCard,
      employer,
      setShowError,
    });
  };
  useEffect(() => setLastComponent("adminnav"), []);

  return (
    <div style={{ marginTop: "1rem" }}>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className=" shadow-lg rounded border border-gray-300 bg-white w-100">
          {showSuccess ? (
            <AlertSuccess />
          ) : (
            <div>
              {employerCard &&
                employerCard.map((employer) => (
                  <div className="remove-employer" key={employer._id}>
                    <h6>{employer.fullName.toUpperCase()}</h6>
                    <div className="d-flex justify-content-between">
                      <Button
                        className="make-user-button"
                        variant="outline-link"
                        onClick={() => handleMakeAsUser(employer)}
                      >
                        Make as user
                      </Button>
                      <Button
                        className="delete-button"
                        variant="outline-link"
                        onClick={() => handleDeleteEmployer(employer)}
                      >
                        Delete employer
                      </Button>
                    </div>
                  </div>
                ))}
              <div className="d-grid gap-2 cancel-dev">
                <Button
                  className="cancel-button"
                  variant="outline-secondary"
                  onClick={() => setComponent("adminnav")}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RemoveEmployer;
