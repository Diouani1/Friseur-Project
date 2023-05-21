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

const SharePostModale = ({ showShareModal, setShowShareModal, post }) => {
  const { posts } = useContext(PostContext);

  const [selectedPost, setSelectedPost] = useState({});
  const [postPictureUrl, setPostPictureUrl] = useState("");

  useEffect(() => {
    const fetchPostPicture = async () => {
      try {
        const response = await fetch(`/api/post/get-post-picture/${post._id}`);
        if (response.ok) {
          const pictureBlob = await response.blob();
          const pictureUrl = URL.createObjectURL(pictureBlob);
          setPostPictureUrl(pictureUrl);
        }
      } catch (error) {
        console.error("Failed to fetch post picture:", error);
      }
    };

    const fetchSelectedPost = () => {
      const postId = post._id;
      if (postId) {
        // Fetch the selected post from your API or context
        const selectedPost = posts.find((post) => post._id === postId);
        if (selectedPost) {
          setSelectedPost(selectedPost);
          fetchPostPicture(); // Fetch the post picture
        }
      }
    };

    fetchSelectedPost();
  }, [showShareModal]);

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
        `https://www.instagram.com/create/foreground?utm_source=ig_web_copy_link&background_media=${encodeURIComponent(
          postPictureUrl
        )}&caption=${encodeURIComponent(message)}`
      );
    }
  };

  const handleTikTokShare = () => {
    if (selectedPost) {
      const message = `${selectedPost.title} ${shareUrl}`;
      window.open(
        `https://www.tiktok.com/create?is_copy_url=1&desc=${encodeURIComponent(
          message
        )}&imageUrl=${encodeURIComponent(postPictureUrl)}`
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
