import { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { UserContext } from "../../../context/user/User";
import AlertDanger from "../../alert/AlertDanger";

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
  useEffect(() => setProfilePictureUrl(`/api/user/profile-picture`), []);
  // styling the image
  const styles = {
    imageContainer: {
      display: "flex",
      justifyContent: "center",
      marginBottom: "1rem",
    },
    image: {
      width: "200px", // Adjust the width as per your requirement
      height: "auto",
      maxWidth: "100%",
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
            <Image
              src={profilePictureUrl}
              roundedCircle
              fluid
              style={styles.image}
            />
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
