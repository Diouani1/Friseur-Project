import { useContext, useEffect, useState } from "react";
import { Card, Button, Image, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faEllipsis,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { PostContext } from "../../../../../context/post/Post";
import { UserContext } from "../../../../../context/user/User";
import { getTimeDifference } from "../../getTime";
import Avater from "../../../../../assets/avatar.jpg";

const ReplyComment = ({ item, commentId, postId }) => {
  const {
    postDispatch,
    setUpdate,
    update,
    posts,
    setShowGetPostError,
    setGetPostError,
  } = useContext(PostContext);
  const { user, setOnOff } = useContext(UserContext);
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [url, setUrl] = useState("");

  // Update the likes count in the database
  const handleLikeReply = () => {
    if (!user) {
      setOnOff(true);
      return;
    }
    postDispatch({
      type: "update-like-reply-comment",
      like: !like,
      dislike: false,
      postId,
      commentId,
      item,
      setUpdate,
      update,
      setShowGetPostError,
      setGetPostError,
    });
  };
  // Update the dislikes count in the database
  const handleDislikeReply = () => {
    if (!user) {
      setOnOff(true);
      return;
    }
    postDispatch({
      type: "update-like-reply-comment",
      like: false,
      dislike: !dislike,
      postId,
      commentId,
      item,
      setUpdate,
      update,
      setShowGetPostError,
      setGetPostError,
    });
  };
  // Show the options dropdown
  const handleOptions = () => {
    setShowOptions(!showOptions);
  };
  // delete the reply comment
  const handleDeleteReply = () => {
    postDispatch({
      type: "delete-reply-comment",
      postId,
      commentId,
      item,
      setUpdate,
      update,
      setShowGetPostError,
      setGetPostError,
    });
  };

  useEffect(() => {
    if (user) {
      setDislike(item.dislikeReply.includes(user._id));
      setLike(item.likeReply.includes(user._id));
    }
  }, [posts]);
  useEffect(() => {
    const fetchAuthorProfileImg = async () => {
      try {
        const response = await fetch(
          `/api/post/profile-picture/${item.author.userName}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch post media");
        }
        const imageUrl = await response.text();
        setUrl(imageUrl);
      } catch (error) {
        console.error("Error fetching post media:", error);
      }
    };

    fetchAuthorProfileImg();
  }, []);
  useEffect(() => setUpdate(!update), []);

  return (
    <div
      className="hide-scroll-bar"
      style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        columnGap: "10px",
      }}
    >
      <Image className="imgMobile" src={url ? url : Avater} />
      <Card
        style={{
          color: "black",
          marginBottom: "5px",
          borderRadius: "0 10px 10px 10px",
        }}
      >
        <Card.Header
          className="d-flex justify-content-between align-items-center"
          style={{ border: "none", padding: "0 8px" }}
        >
          <div>
            {item.author.userName}
            <span style={{ marginLeft: "1rem", color: "grey" }}>
              {getTimeDifference(item.createdAt)}
            </span>
          </div>
          {user && (user.role === "admin" || item.author._id === user._id) ? (
            <div>
              {showOptions ? (
                <Dropdown
                  show={showOptions}
                  align="end"
                  onClick={handleOptions}
                >
                  <Dropdown.Toggle
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                    }}
                    variant="light"
                    id="dropdown-options"
                  />
                  <Dropdown.Menu
                    style={{
                      padding: "0",
                      border: "none",
                    }}
                  >
                    <Dropdown.Item
                      onClick={handleDeleteReply}
                      style={{
                        backgroundColor: "transparent",
                        padding: "0 10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "end",
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Button
                  className="position-absolute top-0 end-0 m-1"
                  variant="light"
                  onClick={handleOptions}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                  }}
                >
                  <FontAwesomeIcon icon={faEllipsis} />
                </Button>
              )}
            </div>
          ) : null}
        </Card.Header>
        <Card.Body style={{ border: "none", padding: "0 16px" }}>
          <Card.Text>{item.comment}</Card.Text>
        </Card.Body>
        <Card.Footer
          className="d-flex gap-1"
          style={{ border: "none", padding: "0 8px" }}
        >
          <Button
            variant="light"
            style={{
              backgroundColor: "transparent",
              color: "black",
            }}
            onClick={handleLikeReply}
            className="iconComment"
          >
            <FontAwesomeIcon
              icon={faThumbsUp}
              style={{
                color: like ? "blue" : "inherit",
                marginRight: "5px",
              }}
            />
            {item.likeReply.length}
          </Button>
          <Button
            variant="light"
            style={{
              backgroundColor: "transparent",
              color: "black",
            }}
            onClick={handleDislikeReply}
            className="iconComment"
          >
            <FontAwesomeIcon
              icon={faThumbsDown}
              style={{
                color: dislike ? "red" : "inherit",
                marginRight: "5px",
              }}
            />
            {item.dislikeReply.length}
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default ReplyComment;
