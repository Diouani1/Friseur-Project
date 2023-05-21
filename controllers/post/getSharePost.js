import creatErr from "http-errors";
import Post from "../../models/Post.js";

const getSharePost = async (req, res, next) => {
  try {
    const post = await Post.find({ _id: req.query.post });

    res.send(post);
  } catch (error) {
    next(creatErr(401, error));
  }
};
export { getSharePost };
