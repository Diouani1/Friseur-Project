import { useContext, useState } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { UserContext } from "../../../context/User";
import AlertWarned from "../alert/AlertWarned";
import AlertDanger from "../alert/AlertDanger";

const UserProfile = () => {
  const { user, showWarned, showError, profilePictureUrl, navigate } =
    useContext(UserContext);
  const [updateMode, setUpdateMode] = useState(false);
  const handleUpdateClick = () => {
    if (updateMode) {
      setUpdateMode(false);
      navigate("/");
    } else {
      navigate("update-profile");
      setUpdateMode(true);
    }
  };

  return (
    <Container>
      {showWarned && <AlertWarned />}
      {showError && <AlertDanger />}
      <Row>
        <Col md={4}>
          <Image src={profilePictureUrl} roundedCircle fluid />
        </Col>
        <Col md={8}>
          <h2>{user.fullName}</h2>
          <Button
            variant={updateMode ? "outline-danger" : "outline-primary"}
            onClick={handleUpdateClick}
          >
            {updateMode ? "Cancel Update" : "Update Profile"}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
