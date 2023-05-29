import { useContext, useState } from "react";
import { Container, Image, Button, Modal, Form } from "react-bootstrap";
import { UserContext } from "../../../../context/user/User";
import avatar from "../../../../assets/avatar.jpg";
import AlertWarned from "../../../alert/AlertWarned";
const ChangeProfilePicture = () => {
  const {
    showWarned,
    user,
    setWarnedMessage,
    setShowWarned,
    userDispatch,
    setShowError,
    setErrorMessage,
    setUser,
    profilePicture,
    setProfilePicture,
    setProfilePictureUrl,
    setComponent,
    profilePictureUrl,
  } = useContext(UserContext);
  const [isType, setType] = useState(true);
  const [picture, setPicture] = useState(profilePictureUrl);
  const handleProfilePictureChange = (event) => {
    setProfilePicture(event.target.files[0]);
    if (event.target.files[0]) {
      setType(true);
    }
    setPicture(URL.createObjectURL(event.target.files[0]));
  };
  const handleDeletePicture = () => {
    setType(false);
    setPicture(avatar);
    setShowWarned(false);
  };
  const handleProfilePictureUpdate = () => {
    if (isType) {
      if (!profilePicture) {
        setWarnedMessage("Please click the Pictur to upload new one!!");
        setShowWarned(true);
        return;
      }
    }
    setComponent("multi");
    setShowWarned(false);
    userDispatch({
      type: isType ? "updateProfilePicture" : "deleteProfilePicture",
      user,
      setUser,
      profilePicture,
      setShowError,
      setErrorMessage,
    });
    if (isType) {
      // the URL.createObjectURL method, which will create a temporary URL for the updated image file.
      setProfilePictureUrl(URL.createObjectURL(profilePicture));
    } else {
      setProfilePictureUrl(avatar);
    }
  };

  return (
    <Container style={{ marginTop: "1rem" }}>
      <Modal show={true}>
        {showWarned && <AlertWarned />}
        <Modal.Header className="d-flex justify-content-center">
          <Modal.Title>Upload new Picture</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center">
          <Form>
            <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
              <Form.Label>
                <Image
                  src={picture}
                  roundedCircle
                  fluid
                  style={{ width: "200px", cursor: "pointer" }}
                />
              </Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
                style={{ display: "none" }}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ marginRight: "auto" }}
            variant="outline-danger"
            onClick={handleDeletePicture}
          >
            Delete picture
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => {
              setComponent("multi");
              setShowWarned(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="outline-primary"
            onClick={handleProfilePictureUpdate}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ChangeProfilePicture;
