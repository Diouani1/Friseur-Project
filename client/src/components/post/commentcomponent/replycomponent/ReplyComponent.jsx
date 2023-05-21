import { useContext, useEffect, useState } from "react";
import {
  Container,
  Form,
  Button,
  Col,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { PostContext } from "../../../../context/post/Post";
import ReplyComment from "./replycomment/ReplyComment";
const ReplyComponent = ({ replyComments, commentId, postId }) => {
  const {
    postDispatch,
    update,
    setUpdate,
    setShowGetPostError,
    setGetPostError,
    posts,
  } = useContext(PostContext);

  const [replyComment, setReplyComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    postDispatch({
      type: "add-reply-comment",
      update,
      setUpdate,
      postId,
      commentId,
      replyComment,
      setReplyComment,
      setShowGetPostError,
      setGetPostError,
    });
  };
  useEffect(() => setUpdate(!update), [posts]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "end",
      }}
    >
      <div
        style={{
          background: "rgba(0, 0, 0, 1)",
          color: "white",
          width: "70%",
        }}
      >
        <Container>
          <Col style={{ margin: "1rem 0 0" }}>
            <Form onSubmit={handleSubmit}>
              <Form.Group
                controlId="commentForm"
                style={{
                  margin: "0px 1rem",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div style={{ position: "relative", width: "100%" }}>
                  <Form.Control
                    type="text"
                    placeholder="Enter your comment"
                    value={replyComment}
                    onChange={(e) => setReplyComment(e.target.value)}
                    autoFocus
                    required
                  />
                  <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip id="tooltip">Add reply</Tooltip>}
                  >
                    <Button
                      variant="link"
                      type="submit"
                      style={{
                        position: "absolute",
                        right: "0.5rem",
                        top: "50%",
                        transform: "translateY(-50%)",
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faLocationArrow}
                        style={{
                          fontSize: "2rem",
                          color: "black",
                          transition: "color 0.3s ease",
                        }}
                        className="icon-hover"
                      />
                    </Button>
                  </OverlayTrigger>
                </div>
              </Form.Group>
            </Form>
          </Col>
          <hr style={{ margin: "8px 0px" }} />
          {replyComments &&
            replyComments.map((item) => (
              <ReplyComment
                key={item._id}
                item={item}
                postId={postId}
                commentId={commentId}
              />
            ))}
        </Container>
      </div>
    </div>
  );
};

export default ReplyComponent;
