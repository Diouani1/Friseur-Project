import { Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faWhatsapp,
  faInstagram,
  faTiktok,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

const SharePostModale = ({
  showShareModal,
  setShowShareModal,
  selectedPost,
}) => {
  const shareUrl = `https://barbershop-diouani.onrender.com/?post=${selectedPost._id}`;

  const handleWhatsAppShare = () => {
    if (selectedPost) {
      const message = `${selectedPost.title} ${shareUrl}`;
      window.open(`whatsapp://send?text=${encodeURIComponent(message)}`);
    }
  };

  const handleFacebookShare = () => {
    if (selectedPost) {
      const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl
      )}`;
      window.open(facebookShareUrl);
    }
  };

  const handleInstagramShare = () => {
    if (selectedPost) {
      const message = `${selectedPost.title} ${shareUrl}`;
      window.open(
        `https://www.instagram.com/create/foreground?utm_source=ig_web_copy_link&caption=${encodeURIComponent(
          message
        )}`
      );
    }
  };

  const handleTikTokShare = () => {
    if (selectedPost) {
      const message = `${selectedPost.title} ${shareUrl}`;
      window.open(
        `https://www.tiktok.com/create?is_copy_url=1&desc=${encodeURIComponent(
          message
        )}`
      );
    }
  };

  const handleLinkedInShare = () => {
    if (selectedPost) {
      const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        shareUrl
      )}`;
      window.open(linkedInShareUrl);
    }
  };

  return (
    <Modal show={showShareModal} onHide={() => setShowShareModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Share Post</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ display: "flex", justifyContent: "space-evenly" }}>
        <Button variant="outline-success" onClick={handleWhatsAppShare}>
          <FontAwesomeIcon icon={faWhatsapp} />
        </Button>
        <Button variant="outline-primary" onClick={handleFacebookShare}>
          <FontAwesomeIcon icon={faFacebook} />
        </Button>
        <Button variant="outline-dark" onClick={handleInstagramShare}>
          <FontAwesomeIcon icon={faInstagram} />
        </Button>
        <Button variant="outline-primary" onClick={handleLinkedInShare}>
          <FontAwesomeIcon icon={faLinkedin} />
        </Button>
        <Button variant="outline-dark" onClick={handleTikTokShare}>
          <FontAwesomeIcon icon={faTiktok} />
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default SharePostModale;
