import { useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { PostContext } from "../../../context/post/Post";

const DeletePostModal = ({ showDeleteModal, setShowDeleteModal, post }) => {
  const {
    postDispatch,
    setUpdate,
    update,
    setShowGetPostError,
    setGetPostError,
  } = useContext(PostContext);
  const confirmDelete = () => {
    postDispatch({
      type: "delete-post",
      setShowDeleteModal,
      post,
      setUpdate,
      update,
      setShowGetPostError,
      setGetPostError,
    });
  };

  return (
    <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-secondary"
          onClick={() => setShowDeleteModal(false)}
        >
          Cancel
        </Button>
        <Button variant="outline-danger" onClick={confirmDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeletePostModal;
