import express from "express";
import multer from "multer";
import uploadPostToStorage from "../middlewares/uploadPostToStorage.js";
import checkAuthPost from "../middlewares/checkAuthPost.js";
import checkAuthToken from "../middlewares/checkAuthToken.js";
import { addPost } from "../controllers/post/addPost.js";
import { getAllPost } from "../controllers/post/getAllPost.js";
import { updateLikes } from "../controllers/post/updateLike.js";
import { addComment } from "../controllers/post/addComment.js";
import { authorPicture } from "../controllers/post/authorPicture.js";
import { updateLikeComment } from "../controllers/post/updateLikeComment.js";
import { addReplyComment } from "../controllers/post/addReplyComment.js";
import { updateLikeReplyComment } from "../controllers/post/updateLikeReplyComment.js";
import { deletePost } from "../controllers/post/deletePost.js";
import { deleteReplyComment } from "../controllers/post/deleteReplyComment.js";
import { deleteComment } from "../controllers/post/deleteComment.js";
import { updatePost } from "../controllers/post/updatePost.js";
import { getSharePost } from "../controllers/post/getSharePost.js";
import { getPostMedia } from "../controllers/post/getPostMedia.js";

const router = express.Router();
const upload = multer();

const postMediaMiddleware = upload.fields([
  { name: "postPicture", maxCount: 5 },
  { name: "postVideo", maxCount: 1 },
]);

router.post(
  "/add-post",
  checkAuthPost,
  postMediaMiddleware,
  uploadPostToStorage,
  addPost
);
router.put("/update-post", checkAuthPost, updatePost);
router.get("/get-all-post", getAllPost);
router.get("/get-post-media/:id", getPostMedia);
router.get("/profile-picture/:username", authorPicture);
router.get("/share-post", getSharePost);
router.put("/update-like", checkAuthToken, updateLikes);
router.put("/update-like-comment", checkAuthToken, updateLikeComment);
router.put(
  "/update-like-reply-comment",
  checkAuthToken,
  updateLikeReplyComment
);
router.put("/add-comment", checkAuthToken, addComment);
router.put("/add-reply-comment", checkAuthToken, addReplyComment);
router.delete("/delete-post", checkAuthPost, deletePost);
router.delete("/delete-comment", checkAuthToken, deleteComment);
router.delete("/delete-reply-comment", checkAuthToken, deleteReplyComment);

export default router;
