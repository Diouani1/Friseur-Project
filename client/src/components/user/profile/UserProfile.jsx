import { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { UserContext } from "../../../context/user/User";
import AlertDanger from "../../alert/AlertDanger";
import Avater from "../../../assets/avatar.jpg";
const UserProfile = () => {
  const {
    user,
    showError,
    profilePictureUrl,
    setProfilePictureUrl,
    setShowError,
    navigate,
    // thanks God */
  } = useContext(UserContext);
  const [updateMode, setUpdateMode] = useState(false);
  const handleUpdateClick = () => {
    if (updateMode) {
      setUpdateMode(false);
      setShowError(false);
      navigate("/");
    } else {
      navigate("update-profile");
      setUpdateMode(true);
    }
  };
  useEffect(() => {
    if (user.imgProfile.path) {
      setProfilePictureUrl(user.imgProfile.path);
    } else {
      setProfilePictureUrl(Avater);
    }
  }, []);
  // styling the image
  const styles = {
    imageContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: "1rem",
    },
  };
  function getRandomColor() {
    const colors = ["black", "rgba(0, 0, 0, 0.7)", "  rgba(0, 0, 0, 0.5)"];

    return colors[Math.floor(Math.random() * colors.length)];
  }

  return (
    <Container>
      {showError && <AlertDanger />}
      <Row>
        <Col>
          <div style={styles.imageContainer}>
            <Image src={profilePictureUrl} fluid className="profileImg" />
          </div>
        </Col>
        <Col md={8}>
          <h2>
            {user.fullName
              .toUpperCase()
              .split("")
              .map((x, i) => (
                <span key={i} style={{ color: getRandomColor() }}>
                  {x}
                </span>
              ))}
          </h2>
          <Button
            variant={updateMode ? "outline-danger" : "outline-dark"}
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
