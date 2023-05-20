import creatErr from "http-errors";
import Post from "../../models/Post.js";

const addComment = async (req, res, next) => {
  try {
    // Assuming you have the post object and the comment you want to add
    const post = await Post.findById(req.body.id);
    const newComment = {
      author: req.userId,
      comment: req.body.comment,
    };

    post.comments.push(newComment);
    await post.save();
    res.send(post);
  } catch (error) {
    next(creatErr(404, error));
  }
};
export { addComment };
