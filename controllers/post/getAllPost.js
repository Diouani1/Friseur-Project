import creatErr from "http-errors";
import Post from "../../models/Post.js";

const getAllPost = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate(
        "comments.author comments.replyComments.author",
        "_id userName "
      );
    res.send(posts);
  } catch (error) {
    next(creatErr(401, error));
  }
};
export { getAllPost };
