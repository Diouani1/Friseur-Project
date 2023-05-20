import React, { useContext, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

import { PostContext } from "../../../../context/post/Post";
import { UserContext } from "../../../../context/user/User";

const UpdatePost = () => {
  const {
    postDispatch,
    title,
    setTitle,
    content,
    setContent,
    setUpdate,
    update,
    updatePost,
    setUpdatePost,
  } = useContext(PostContext);
  const { setErrorMessage, setShowError, setOnOff } = useContext(UserContext);
  const handleUpdate = (e) => {
    e.preventDefault();
    postDispatch({
      type: "update-post",
      postId: updatePost._id,
      setUpdate,
      title,
      content,
      update,
      setErrorMessage,
      setShowError,
      setUpdatePost,
      setOnOff,
    });
  };
  useEffect(() => {
    updatePost.title ? setTitle(updatePost.title) : setTitle("");
    updatePost.content ? setContent(updatePost.content) : setContent("");
  }, []);
  return (
    <div style={{ marginTop: "1rem", color: "darkblue" }}>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="p-4 shadow-lg rounded border border-gray-300 bg-white w-100">
          <h5 className="mb-4 text-center font-weight-bold">Add new Post</h5>
          <Form onSubmit={handleUpdate}>
            <Form.Group controlId="formTitle" className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formContent" className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>

            <div className="d-grid gap-2 ">
              <Button type="submit" variant="outline-primary">
                Update The Post
              </Button>
              <Button
                variant="outline-secondary"
                onClick={() => {
                  setOnOff(false);
                  setUpdatePost("");
                }}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePost;
