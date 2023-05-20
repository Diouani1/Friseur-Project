import creatErr from "http-errors";
import Post from "../../models/Post.js";

const updateLikeComment = async (req, res, next) => {
  try {
    const { postId, commentId, like, dislike } = req.body;
    const userId = req.userId;
    const post = await Post.updateLikesComment(
      postId,
      commentId,
      userId,
      like,
      dislike
    );

    res.send(post);
  } catch (error) {
    next(creatErr(404, error));
  }
};
export { updateLikeComment };
