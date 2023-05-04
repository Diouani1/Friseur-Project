import { useContext } from "react";
import Alert from "react-bootstrap/Alert";
import { UserContext } from "../../../context/User";

function AlertDanger() {
  const { errorMessage, setShowError } = useContext(UserContext);

  return (
    <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
      <Alert.Heading>You got an error!</Alert.Heading>
      <p>{errorMessage}</p>
    </Alert>
  );
}

export default AlertDanger;
