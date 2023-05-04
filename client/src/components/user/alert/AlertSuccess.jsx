import { Alert, Button } from "react-bootstrap";
import { UserContext } from "../../../context/User";
import { useContext } from "react";

function AlertSuccess() {
  const { showSuccess, setShowSuccess, successMessage } =
    useContext(UserContext);
  return (
    <>
      <Alert show={showSuccess} variant="success">
        <Alert.Heading>My Alert</Alert.Heading>
        <p>{successMessage}</p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button
            onClick={() => setShowSuccess(false)}
            variant="outline-success"
          >
            Close me
          </Button>
        </div>
      </Alert>
    </>
  );
}

export default AlertSuccess;
