import creatErr from "http-errors";
import { deleteImageFromFirebase } from "../../firebase/index.js";
import Post from "../../models/Post.js";

const deletePost = async (req, res, next) => {
  const { postId, mediaName } = req.body;
  try {
    if (mediaName) {
      try {
        await deleteImageFromFirebase(mediaName);
      } catch (error) {
        console.log(error.message);
      }
    }
    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost) return next(creatErr(401, "Post not found"));
    res.send({ message: "Post deleted successfully" });
  } catch (error) {
    next(creatErr(401, error.message));
  }
};

export { deletePost };
