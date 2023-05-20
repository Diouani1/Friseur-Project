import { useContext } from "react";
import Alert from "react-bootstrap/Alert";
import { UserContext } from "../../context/user/User";

function AlertWarned() {
  const { warnedMessage, setShowWarned } = useContext(UserContext);

  return (
    <Alert variant="warning" onClose={() => setShowWarned(false)} dismissible>
      <Alert.Heading>You got an warning!</Alert.Heading>
      <p>{warnedMessage}</p>
    </Alert>
  );
}

export default AlertWarned;
