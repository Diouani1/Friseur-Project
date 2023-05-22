import "./Comment.css";
import {
  Card,
  Button,
  OverlayTrigger,
  Tooltip,
  Image,
  Dropdown,
} from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { PostContext } from "../../../../context/post/Post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserContext } from "../../../../context/user/User";
import {
  faThumbsUp,
  faThumbsDown,
  faTrash,
  faReply,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import ReplyComponent from "../replycomponent/ReplyComponent";
import { getTimeDifference } from "../getTime";
const Comment = ({ item, postId }) => {
  const {
    postDispatch,
    setUpdate,
    update,
    posts,
    setShowGetPostError,
    setGetPostError,
  } = useContext(PostContext);
  const { user } = useContext(UserContext);

  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [showReply, setShowRepley] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  // Update the likes count in the database
  const handleLikeComment = () => {
    postDispatch({
      type: "update-like-comment",
      like: !like,
      dislike: false,
      postId,
      item,
      setUpdate,
      update,
      setShowGetPostError,
      setGetPostError,
    });
  };
  // Update the dislikes count in the database
  const handleDislikeComment = () => {
    postDispatch({
      type: "update-like-comment",
      like: false,
      dislike: !dislike,
      postId,
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
  // delete the  comment
  const handleDeleteComment = () => {
    postDispatch({
      type: "delete-comment",
      postId,
      item,
      setUpdate,
      update,
      setShowGetPostError,
      setGetPostError,
    });
  };
  useEffect(() => {
    if (user) {
      setDislike(item.dislikeComment.includes(user._id));
      setLike(item.likeComment.includes(user._id));
    }
  }, [posts]);

  return (
    <div>
      <div
        className="hide-scroll-bar"
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          columnGap: "10px",
        }}
      >
        <Image
          src={`/api/post/profile-picture/${item.author.userName}`}
          style={{ width: "3rem", borderRadius: "50%" }}
        />
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
            {user.role === "admin" || item.author._id === user._id ? (
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
                        onClick={handleDeleteComment}
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
            className="d-flex justify-content-between align-items-center"
            style={{ border: "none", padding: "0 8px" }}
          >
            <div>
              <Button
                variant="light"
                style={{
                  backgroundColor: "transparent",
                  color: "black",
                }}
                onClick={handleLikeComment}
              >
                <FontAwesomeIcon
                  icon={faThumbsUp}
                  style={{
                    color: like ? "blue" : "inherit",
                    marginRight: "5px",
                  }}
                />
                {item.likeComment.length}
              </Button>
              <Button
                variant="light"
                style={{
                  backgroundColor: "transparent",
                  color: "black",
                }}
                onClick={handleDislikeComment}
              >
                <FontAwesomeIcon
                  icon={faThumbsDown}
                  style={{
                    color: dislike ? "red" : "inherit",
                    marginRight: "5px",
                  }}
                />
                {item.dislikeComment.length}
              </Button>
            </div>
            <OverlayTrigger
              placement="left"
              overlay={<Tooltip id="tooltip">repley</Tooltip>}
            >
              <Button
                variant="light"
                style={{
                  backgroundColor: "transparent",
                  color: "black",
                  transition: "color 0.3s ease",
                }}
                className="icon-hover"
                onClick={() => setShowRepley(!showReply)}
              >
                <FontAwesomeIcon icon={faReply} /> {item.replyComments.length}
              </Button>
            </OverlayTrigger>
          </Card.Footer>
        </Card>
      </div>
      {showReply && (
        <ReplyComponent
          replyComments={item.replyComments}
          commentId={item._id}
          postId={postId}
        />
      )}
    </div>
  );
};

export default Comment;
