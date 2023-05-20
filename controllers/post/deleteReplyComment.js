import creatErr from "http-errors";
import Post from "../../models/Post.js";

const deleteReplyComment = async (req, res, next) => {
  try {
    const { postId, commentId, replyCommentId } = req.body;
    const post = await Post.findById(postId);
    if (!post) return next(creatErr(401, "Post not found"));
    const comment = post.comments.id(commentId);
    if (!comment) return next(creatErr(401, "Comment not found"));
    const replyComment = comment.replyComments.id(replyCommentId);
    if (!replyComment) return next(creatErr(401, "Reply comment not found"));
    replyComment.remove();
    await post.save();

    res.send({ message: "Reply comment deleted successfully" });
  } catch (error) {
    next(creatErr(401, error));
  }
};

export { deleteReplyComment };
