import creatErr from "http-errors";
import Post from "../../models/Post.js";
import path from "path";

const getPostPicture = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    const postPicture = path.resolve("./", post.postPicture.path);
    res.sendFile(postPicture);
  } catch (error) {
    next(creatErr(404, error));
  }
};
export { getPostPicture };
