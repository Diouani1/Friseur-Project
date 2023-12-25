import "./GetPost.css";
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
import SharePostModale from "./SharePostModale";
import Avater from "../../../assets/avatar.jpg";

const GetPost = ({ post }) => {
  const { user, setOnOff, onOff } = useContext(UserContext);
  const {
    postDispatch,
    setUpdate,
    update,
    posts,
    setShowGetPostError,
    setGetPostError,
    setUpdatePost,
  } = useContext(PostContext);
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [url, setUrl] = useState("");

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
      setShowGetPostError,
      setGetPostError,
    });
  };
  // show the comment
  const handleComment = () => {
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
  // handle Share post
  const handleShare = () => {
    setShowShareModal(true);
  };

  useEffect(() => {
    if (user) {
      setDislike(post.dislikes.includes(user._id));
      setLike(post.likes.includes(user._id));
    }
  }, [posts]);
  useEffect(() => setShowComment(false), [onOff]);
  useEffect(() => {
    const fetchPostMedia = async () => {
      try {
        const response = await fetch(`/api/post/get-post-media/${post._id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch post media");
        }
        const imageUrl = await response.text();
        setUrl(imageUrl);
      } catch (error) {
        console.error("Error fetching post media:", error);
      }
    };

    fetchPostMedia();
  }, [post]);

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
                <Card.Img variant="top" src={url ? url : Avater} />
              ) : post.postVideo ? (
                <video
                  width="100%"
                  controls
                  className="videoStyle"
                  autoPlay
                  muted
                  src={url}
                  type="video/mp4"
                >
                  Your browser does not support the video tag.
                </video>
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
                      className="iconMobile"
                      icon={faThumbsUp}
                      style={{
                        color: like ? "blue" : "inherit",
                      }}
                    />
                    {post.likes.length}
                  </Button>
                  <Button variant="light" onClick={handleDislike}>
                    <FontAwesomeIcon
                      className="iconMobile"
                      icon={faThumbsDown}
                      style={{
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
                      className="iconMobile"
                      icon={faCommentDots}
                    />
                    {post.comments.length}
                  </Button>
                </div>
                <Button variant="light" onClick={handleShare}>
                  <FontAwesomeIcon className="iconMobile" icon={faShare} />
                </Button>
              </Card.Footer>
            </Card>
            <DeletePostModal
              showDeleteModal={showDeleteModal}
              setShowDeleteModal={setShowDeleteModal}
              post={post}
            />
            <SharePostModale
              showShareModal={showShareModal}
              setShowShareModal={setShowShareModal}
              selectedPost={post}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetPost;
