import creatErr from "http-errors";
import Post from "../../models/Post.js";

const deletePost = async (req, res, next) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.body.postId);
    if (!deletedPost) return next(creatErr(401, "Post not found"));
    res.send({ message: "Post deleted successfully" });
  } catch (error) {
    next(creatErr(401, error));
  }
};

export { deletePost };
