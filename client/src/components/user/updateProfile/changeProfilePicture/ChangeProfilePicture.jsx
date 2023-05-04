import { useContext } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { UserContext } from "../../../../context/User";

const ChangeProfilePicture = () => {
  const {
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
  } = useContext(UserContext);
  const handleProfilePictureChange = (event) => {
    setProfilePicture(event.target.files[0]);
  };
  const handleProfilePictureUpdate = () => {
    if (!profilePicture) {
      setWarnedMessage("Please click on the update Button");
      setShowWarned(true);
      return;
    }
    setShowWarned(false);
    userDispatch({
      type: "updateProfilePicture",
      user,
      setUser,
      profilePicture,
      setShowError,
      setErrorMessage,
    });
    // the URL.createObjectURL method, which will create a temporary URL for the updated image file.
    setProfilePictureUrl(URL.createObjectURL(profilePicture));
  };

  return (
    <Container style={{ marginTop: "1rem" }}>
      <h6>Change the profile Picture</h6>
      <Row>
        <Col>
          <label
            htmlFor="profilePicture"
            style={{
              cursor: "pointer",
              display: "inline-block",
              padding: ".375rem .75rem",
              fontSize: "1rem",
              lineHeight: "1.5",
              color: "#6c757d",
              backgroundColor: "transparent",
              border: "1px solid #6c757d",
              borderRadius: ".25rem",
            }}
          >
            Update
          </label>
          <input
            id="profilePicture"
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
            style={{ display: "none" }}
          />
        </Col>
        <Col>
          {/* <h2>{user.fullName}</h2> */}
          <Button
            variant="outline-primary"
            onClick={handleProfilePictureUpdate}
          >
            Submit
          </Button>
        </Col>
        <Col>
          <Button
            variant="outline-secondary"
            onClick={() => setComponent("multi")}
          >
            Cancel
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ChangeProfilePicture;
