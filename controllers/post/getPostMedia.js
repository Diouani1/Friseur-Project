import createError from "http-errors";
import Post from "../../models/Post.js";

const getPostMedia = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      throw createError(404, "Post not found");
    }

    let filePath = "";
    if (post.postPicture && post.postPicture.path) {
      filePath = post.postPicture.path;
    }
    if (post.postVideo && post.postVideo.path) {
      filePath = post.postVideo.path;
    }
    res.send(filePath);
  } catch (error) {
    next(createError(404, error));
  }
};

export { getPostMedia };
