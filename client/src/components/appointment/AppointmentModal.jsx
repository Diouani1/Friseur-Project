import { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { UserContext } from "../../context/user/User";

const AppointmentModal = () => {
  const { user, showAppointmentModal, setShowAppointmentModal } =
    useContext(UserContext);

  const handleClose = () => {
    setShowAppointmentModal(false);
  };

  return (
    <Modal show={showAppointmentModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Under Construction</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Hey {user.fullName} <hr /> This component is currently under
        construction. We are working on it and will have it ready as soon as
        possible.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AppointmentModal;
