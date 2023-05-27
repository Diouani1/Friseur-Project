import { useContext, useEffect, useState } from "react";
import {
  Container,
  Form,
  Button,
  Col,
  OverlayTrigger,
  Image,
  Tooltip,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { PostContext } from "../../../context/post/Post";
import Comment from "./comment/Comment";
import { UserContext } from "../../../context/user/User";

const CommentComponent = ({ comments, postId }) => {
  const {
    postDispatch,
    update,
    setUpdate,
    setShowGetPostError,
    setGetPostError,
    posts,
  } = useContext(PostContext);
  const { user, setOnOff } = useContext(UserContext);
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      setOnOff(true);
      return;
    }
    postDispatch({
      type: "add-comment",
      update,
      setUpdate,
      postId,
      newComment,
      setNewComment,
      setShowGetPostError,
      setGetPostError,
    });
  };
  useEffect(() => setUpdate(!update), [posts]);

  return (
    <div
      style={{
        background: "rgba(0, 0, 0, 1)",
        color: "white",
        maxHeight: "60vh",
        overflowY: "auto" /* Enable vertical scrolling */,
      }}
    >
      <Container>
        <Col
          xs={12}
          md={8}
          style={
            {
              // margin: "1rem",
            }
          }
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              columnGap: "10px",
              marginTop: "0.5rem",
              alignItems: "center",
            }}
          >
            {user ? (
              <Image
                className="imgMobile"
                src={`/api/post/profile-picture/${user.userName}`}
              />
            ) : null}
            <Form onSubmit={handleSubmit}>
              <Form.Group
                controlId="commentForm"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Form.Control
                  type="text"
                  placeholder="Enter your comment"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  autoFocus
                  required
                />
                <OverlayTrigger
                  placement="right"
                  overlay={<Tooltip id="tooltip">Add comment</Tooltip>}
                >
                  <Button variant="link" type="submit">
                    <FontAwesomeIcon
                      icon={faLocationArrow}
                      style={{
                        color: "white",
                        transition: "color 0.3s ease",
                      }}
                      className="icon-hover faArrow"
                    />
                  </Button>
                </OverlayTrigger>
              </Form.Group>
            </Form>
          </div>
        </Col>

        <hr style={{ margin: "8px 0px" }} />
        {comments &&
          comments.map((item) => (
            <Comment key={item._id} item={item} postId={postId} />
          ))}
      </Container>
    </div>
  );
};

export default CommentComponent;
