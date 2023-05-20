import creatErr from "http-errors";
import Post from "../../models/Post.js";

const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.body.postId },
      { title: req.body.title, content: req.body.content },
      { new: true }
    );
    res.send(post);
  } catch (error) {
    next(creatErr(401, error));
  }
};
export { updatePost };
