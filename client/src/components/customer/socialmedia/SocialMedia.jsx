import { useContext } from "react";

import { Button } from "react-bootstrap";
import { UserContext } from "../../../context/user/User";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faYoutube,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
const SocialMedia = () => {
  const { setComponent, setShowError } = useContext(UserContext);
  const handleFacebookClick = () => {
    window.location.href = "https://www.facebook.com/";
  };

  const handleInstagramClick = () => {
    window.location.href = "https://www.instagram.com/";
  };

  const handleYoutubeClick = () => {
    window.location.href = "https://www.youtube.com/";
  };

  const handleTiktokClick = () => {
    window.location.href = "https://www.tiktok.com/";
  };
  const handleLinkedInClick = () => {
    window.location.href =
      "https://www.linkedin.com/in/el-mokhtar-diouani-10a009124/";
  };

  return (
    <div style={{ marginTop: "1.5rem" }}>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="p-4 shadow-lg rounded border border-gray-300 bg-white w-100">
          <h5
            style={{ color: "darkblue" }}
            className="mb-4 text-center font-weight-bold"
          >
            Following Us
          </h5>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              alignItems: "flex-start",
              gap: "1rem",
            }}
          >
            <div className="d-flex">
              <Button variant="outline-primary" onClick={handleFacebookClick}>
                <FontAwesomeIcon icon={faFacebook} />
              </Button>
              <Button
                className="flex-shrink-0"
                variant="outline-link"
                onClick={handleFacebookClick}
              >
                @Barber-Shop-FaceBook-Pge
              </Button>
            </div>
            <div className="d-flex">
              <Button variant="outline-dark" onClick={handleInstagramClick}>
                <FontAwesomeIcon icon={faInstagram} />
              </Button>
              <Button
                className="flex-shrink-0"
                variant="outline-link"
                onClick={handleInstagramClick}
              >
                @Barber-Shop-Instegram-Pge
              </Button>
            </div>
            <div className="d-flex">
              <Button variant="outline-danger" onClick={handleYoutubeClick}>
                <FontAwesomeIcon icon={faYoutube} />
              </Button>
              <Button
                className="flex-shrink-0"
                variant="outline-link"
                onClick={handleYoutubeClick}
              >
                @Barber-Shop-YouTube-Chanel
              </Button>
            </div>
            <div className="d-flex">
              <Button variant="outline-primary" onClick={handleLinkedInClick}>
                <FontAwesomeIcon icon={faLinkedin} />
              </Button>
              <Button
                className="flex-shrink-0"
                variant="outline-link"
                onClick={handleLinkedInClick}
              >
                @Your-LinkedIn-Profile
              </Button>
            </div>
            <div className="d-flex">
              <Button variant="outline-dark" onClick={handleTiktokClick}>
                <FontAwesomeIcon icon={faTiktok} />
              </Button>
              <Button
                className="flex-shrink-0"
                variant="outline-link"
                onClick={handleTiktokClick}
              >
                @Barber-Shop-TikTok-Pge
              </Button>
            </div>
          </div>
          <div className="d-grid gap-2  mt-4">
            <Button
              variant="outline-light"
              onClick={() => {
                setComponent("customer-nav");
                setShowError(false);
              }}
              style={{
                borderBottom: "2px solid #ced4da",
                borderLeft: "2px solid #ced4da",
                color: "black",
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMedia;
