import { Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faWhatsapp,
  faInstagram,
  faTiktok,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { useContext, useEffect, useState } from "react";
import { PostContext } from "../../../context/post/Post";

const SharePostModale = ({ showShareModal, setShowShareModal, postId }) => {
  const { posts } = useContext(PostContext);

  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    console.log(postId);
    if (postId) {
      // Find the selected post in the posts array
      const post1 = posts.find((post) => post._id === postId);

      if (post1) {
        setSelectedPost(post1);
      }
    }
  }, [showShareModal]);

  const shareUrl = `https://barbershop-diouani.onrender.com`;

  const handleWhatsAppShare = () => {
    if (selectedPost) {
      const shareUrl = `https://barbershop-diouani.onrender.com/?post=${selectedPost.id}`;
      window.open(
        `whatsapp://send?text=${encodeURIComponent(
          selectedPost.title + " " + shareUrl
        )}`
      );
    }
  };

  const handleFacebookShare = () => {
    if (selectedPost) {
      const shareUrl = `https://barbershop-diouani.onrender.com/?post=${selectedPost.id}`;
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareUrl
        )}`
      );
    }
  };

  const handleInstagramShare = () => {
    if (selectedPost) {
      const shareUrl = `https://barbershop-diouani.onrender.com/?post=${selectedPost.id}`;
      window.open(
        `https://www.instagram.com/sharer.php?u=${encodeURIComponent(shareUrl)}`
      );
    }
  };

  const handleTikTokShare = () => {
    if (selectedPost) {
      const shareUrl = `https://barbershop-diouani.onrender.com/?post=${selectedPost.id}`;
      window.open(
        `https://www.tiktok.com/share?url=${encodeURIComponent(shareUrl)}`
      );
    }
  };

  const handleLinkedInShare = () => {
    if (selectedPost) {
      const shareUrl = `https://barbershop-diouani.onrender.com/?post=${selectedPost.id}`;
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          shareUrl
        )}`
      );
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
