import { useContext } from "react";
import Alert from "react-bootstrap/Alert";
import { PostContext } from "../../context/post/Post";

const AlertPostError = () => {
  const { getPostError, setShowGetPostError, showGetPostError } =
    useContext(PostContext);
  return (
    <Alert
      show={showGetPostError}
      variant="danger"
      onClose={() => setShowGetPostError(false)}
      dismissible
      style={{ margin: "5rem" }}
    >
      <Alert.Heading>You got an error!</Alert.Heading>
      <p>{getPostError}</p>
    </Alert>
  );
};

export default AlertPostError;
