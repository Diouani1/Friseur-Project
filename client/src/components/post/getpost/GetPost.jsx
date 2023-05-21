import { useContext, useEffect, useState } from "react";
import { Card, Button, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faShare,
  faCommentDots,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../../context/user/User";
import { PostContext } from "../../../context/post/Post";
import CommentComponent from "../commentcomponent/CommentComponent";
import DeletePostModal from "./DeletePostModal";

const GetPost = ({ post }) => {
  const { user, setOnOff } = useContext(UserContext);
  const {
    postDispatch,
    setUpdate,
    update,
    posts,
    setShowGetPostError,
    setGetPostError,
    setUpdatePost,
  } = useContext(PostContext);
  const [showComment, setShowComment] = useState(false);
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Update the likes count in the database
  const handleLike = () => {
    if (!user) {
      setOnOff(true);
      return;
    }

    postDispatch({
      type: "update-likes",
      like: !like,
      dislike: false,
      post,
      setUpdate,
      update,
      setShowGetPostError,
      setGetPostError,
    });
  };

  // Update the dislikes count in the database
  const handleDislike = () => {
    if (!user) {
      setOnOff(true);
      return;
    }
    postDispatch({
      type: "update-likes",
      like: false,
      dislike: !dislike,
      post,
      setUpdate,
      update,
    });
  };
  // show the comment
  const handleComment = () => {
    if (!user) {
      setOnOff(true);
      return;
    }
    setShowComment(!showComment);
  };
  // Show the options dropdown
  const handleOptions = () => {
    setShowOptions(!showOptions);
  };
  //  handle update post
  const handleUpdatePost = () => {
    setUpdatePost(post);
    setOnOff(true);
  };

  useEffect(() => {
    if (user) {
      setDislike(post.dislikes.includes(user._id));
      setLike(post.likes.includes(user._id));
    }
  }, [posts]);

  return (
    <div
      className="container "
      style={{ marginTop: "2rem", marginBottom: "2rem" }}
    >
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10 col-sm-12">
          <div className="p-4 shadow-lg rounded border border-gray-300 bg-white position-relative">
            {user ? (
              user.role === "admin" || post.createdBy === user._id ? (
                <div>
                  <Button
                    className="position-absolute top-0 end-0 m-1"
                    variant="light"
                    onClick={handleOptions}
                    style={{
                      backgroundColor: "transparent",
                      zIndex: "10",
                      border: "none",
                    }}
                  >
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                  </Button>
                  {showOptions && (
                    <Dropdown
                      style={{
                        zIndex: "10",
                      }}
                      className="position-absolute top-0 end-0 m-1"
                      show={showOptions}
                      align="end"
                      onClick={handleOptions}
                    >
                      <Dropdown.Toggle variant="light" id="dropdown-options" />
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setShowDeleteModal(true)}>
                          Delete Post
                        </Dropdown.Item>
                        <Dropdown.Item onClick={handleUpdatePost}>
                          Update Post
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                </div>
              ) : null
            ) : null}
            <Card>
              {post.postPicture ? (
                <Card.Img
                  variant="top"
                  src={`/api/post/get-post-picture/${post._id}`}
                />
              ) : null}
              {showComment ? (
                <CommentComponent comments={post.comments} postId={post._id} />
              ) : post.title || post.content ? (
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>{post.content}</Card.Text>
                </Card.Body>
              ) : null}

              <Card.Footer className="d-flex justify-content-between">
                <div>
                  <Button variant="light" onClick={handleLike}>
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      style={{
                        fontSize: "1.5rem",
                        marginRight: "5px",
                        color: like ? "blue" : "inherit",
                      }}
                    />
                    {post.likes.length}
                  </Button>
                  <Button variant="light" onClick={handleDislike}>
                    <FontAwesomeIcon
                      icon={faThumbsDown}
                      style={{
                        fontSize: "1.5rem",
                        marginRight: "5px",
                        color: dislike ? "red" : "inherit",
                      }}
                    />
                    {post.dislikes.length}
                  </Button>
                  <Button
                    variant="light"
                    onClick={handleComment}
                    style={{ marginLeft: "1rem" }}
                  >
                    <FontAwesomeIcon
                      icon={faCommentDots}
                      style={{ fontSize: "1.5rem" }}
                    />
                  </Button>
                </div>
                <Button variant="light">
                  <FontAwesomeIcon
                    icon={faShare}
                    style={{ fontSize: "1.5rem" }}
                  />
                </Button>
              </Card.Footer>
            </Card>
            <DeletePostModal
              showDeleteModal={showDeleteModal}
              setShowDeleteModal={setShowDeleteModal}
              postId={post._id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetPost;
