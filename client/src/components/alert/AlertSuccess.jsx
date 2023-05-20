import { Alert, Button } from "react-bootstrap";
import { UserContext } from "../../context/user/User";
import { useContext } from "react";

function AlertSuccess() {
  const {
    showSuccess,
    setShowSuccess,
    successMessage,
    setComponent,
    lastComponet,
  } = useContext(UserContext);
  return (
    <>
      <Alert show={showSuccess} variant="success">
        <Alert.Heading>Well done</Alert.Heading>
        <p>{successMessage}</p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button
            onClick={() => {
              setShowSuccess(false);
              setComponent(lastComponet);
            }}
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
