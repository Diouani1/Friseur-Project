import creatErr from "http-errors";
import Post from "../../models/Post.js";

const deleteComment = async (req, res, next) => {
  try {
    const { postId, commentId } = req.body;
    const post = await Post.findById(postId);
    if (!post) return next(creatErr(401, "Post not found"));
    const comment = post.comments.id(commentId);
    if (!comment) return next(creatErr(401, "Comment not found"));

    comment.remove();
    await post.save();

    res.send({ message: "Comment deleted successfully" });
  } catch (error) {
    next(creatErr(401, error));
  }
};

export { deleteComment };
