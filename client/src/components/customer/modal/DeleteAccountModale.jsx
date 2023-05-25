import { useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { UserContext } from "../../../context/user/User";

const DeleteAccount = () => {
  const {
    showDeleteAcountModal,
    setShowDeleteAcountModal,
    setErrorMessage,
    setOnOff,
    userDispatch,
    setShowError,
    setUser,
  } = useContext(UserContext);

  const handleDeleteAccount = () => {
    userDispatch({
      type: "delete-acount",
      setShowDeleteAcountModal,
      setErrorMessage,
      setOnOff,
      setUser,
      setShowError,
    });
  };

  return (
    <>
      <Modal
        show={showDeleteAcountModal}
        onHide={() => setShowDeleteAcountModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Account Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete your account? This action cannot be
          undone.
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={() => setShowDeleteAcountModal(false)}
          >
            Close
          </Button>
          <Button variant="outline-danger" onClick={handleDeleteAccount}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteAccount;
