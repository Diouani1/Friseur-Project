import creatErr from "http-errors";
import Post from "../../models/Post.js";

const addReplyComment = async (req, res, next) => {
  try {
    const { postId, commentId, comment } = req.body;
    const userId = req.userId;
    const post = await Post.findById(postId);
    const comments = post.comments.find((c) => c._id.toString() === commentId);
    const replyComment = {
      author: userId,
      comment: comment,
    };
    comments.replyComments.push(replyComment);

    await post.save();
    res.send(post);
  } catch (error) {
    next(creatErr(404, error));
  }
};
export { addReplyComment };
