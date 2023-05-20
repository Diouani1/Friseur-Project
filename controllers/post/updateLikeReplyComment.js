import creatErr from "http-errors";
import Post from "../../models/Post.js";

const updateLikeReplyComment = async (req, res, next) => {
  try {
    const { postId, commentId, like, dislike, replyCommentId } = req.body;
    const userId = req.userId;
    const post = await Post.updateLikesReplyComment(
      postId,
      commentId,
      replyCommentId,
      userId,
      like,
      dislike
    );
    res.send(post);
  } catch (error) {
    next(creatErr(404, error));
  }
};
export { updateLikeReplyComment };
