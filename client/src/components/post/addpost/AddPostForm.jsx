// import { useContext, useState } from "react";
// import { useDropzone } from "react-dropzone";
// import { Form, Button } from "react-bootstrap";
// import { PostContext } from "../../../context/post/Post";
// import { UserContext } from "../../../context/user/User";

// const AddPostForm = () => {
//   const {
//     postDispatch,
//     title,
//     setTitle,
//     content,
//     setContent,
//     setUpdate,
//     update,
//   } = useContext(PostContext);
//   const { setComponent, setErrorMessage, setShowError, setOnOff, user } =
//     useContext(UserContext);
//   const [selectedFile, setSelectedFile] = useState("");

//   const handleFileDrop = (acceptedFiles) => {
//     setSelectedFile(acceptedFiles[0]);
//   };
//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop: handleFileDrop,
//     accept: "image/*", // Restrict file types to images only
//     multiple: false, // Allow only a single file to be selected
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     postDispatch({
//       type: "add-post",
//       title,
//       content,
//       setContent,
//       setTitle,
//       setSelectedFile,
//       selectedFile,
//       setErrorMessage,
//       setShowError,
//       setOnOff,
//       setUpdate,
//       update,
//     });
//   };
//   const handleCancel = () => {
//     setShowError(false);
//     return user && user.role === "admin"
//       ? setComponent("adminnav")
//       : setComponent("employer-nav");
//   };

//   return (
//     <div style={{ marginTop: "1rem", color: "darkblue" }}>
//       <div className="d-flex flex-column justify-content-center align-items-center">
//         <div className="p-4 shadow-lg rounded border border-gray-300 bg-white w-100">
//           <h5 className="mb-4 text-center font-weight-bold">Add new Post</h5>
//           <Form onSubmit={handleSubmit}>
//             <Form.Group controlId="formTitle" className="mb-3">
//               <Form.Label>Title</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//               />
//             </Form.Group>

//             <Form.Group controlId="formContent" className="mb-3">
//               <Form.Label>Content</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={3}
//                 placeholder="Enter content"
//                 value={content}
//                 onChange={(e) => setContent(e.target.value)}
//               />
//             </Form.Group>
//             <Form.Group controlId="formFile" className="mb-3">
//               <Form.Label>Upload post's Picture</Form.Label>
//               <div {...getRootProps({ className: "dropzone" })}>
//                 <input {...getInputProps()} />
//                 <div className="d-grid gap-2 ">
//                   {selectedFile ? (
//                     <Button variant="outline-dark">{selectedFile.name}</Button>
//                   ) : (
//                     <Button variant="outline-dark">
//                       Click to select a post
//                     </Button>
//                   )}
//                 </div>
//               </div>
//             </Form.Group>
//             <div className="d-grid gap-2 ">
//               <Button type="submit" variant="outline-primary">
//                 Submit The Post
//               </Button>
//               <Button variant="outline-secondary" onClick={handleCancel}>
//                 Cancel
//               </Button>
//             </div>
//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddPostForm;
import React, { useContext, useState, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { PostContext } from "../../../context/post/Post";
import { UserContext } from "../../../context/user/User";

const AddPostForm = () => {
  const {
    postDispatch,
    title,
    setTitle,
    content,
    setContent,
    setUpdate,
    update,
  } = useContext(PostContext);
  const { setComponent, setErrorMessage, setShowError, setOnOff, user } =
    useContext(UserContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const mediaInputRef = useRef(null);

  const handleMediaChange = (e) => {
    const file = e.target.files[0];

    if (file.type.startsWith("image/")) {
      setSelectedFile(file);
      setSelectedVideo(null);
    } else if (file.type.startsWith("video/")) {
      setSelectedVideo(file);
      setSelectedFile(null);
    } else {
      // File type is not supported
      console.log("Unsupported file type");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postDispatch({
      type: "add-post",
      title,
      content,
      setContent,
      setTitle,
      selectedFile,
      selectedVideo,
      setErrorMessage,
      setShowError,
      setOnOff,
      setUpdate,
      update,
    });
  };

  const handleCancel = () => {
    setShowError(false);
    return user && user.role === "admin"
      ? setComponent("adminnav")
      : setComponent("employer-nav");
  };

  return (
    <div style={{ marginTop: "1rem", color: "darkblue" }}>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="p-4 shadow-lg rounded border border-gray-300 bg-white w-100">
          <h5 className="mb-4 text-center font-weight-bold">Add new Post</h5>
          <Form onSubmit={handleSubmit}>
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

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="d-grid gap-2">
                <Button
                  variant="outline-dark"
                  onClick={() => mediaInputRef.current.click()}
                >
                  {selectedFile
                    ? selectedFile.name
                    : selectedVideo
                    ? selectedVideo.name
                    : "Click to select media"}
                </Button>
              </Form.Label>
              <Form.Control
                type="file"
                accept="image/*,video/*"
                ref={mediaInputRef}
                onChange={handleMediaChange}
                style={{ display: "none" }}
                autoFocus
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button type="submit" variant="outline-primary">
                Submit The Post
              </Button>
              <Button variant="outline-secondary" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddPostForm;
