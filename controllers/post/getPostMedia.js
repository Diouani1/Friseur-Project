import creatErr from "http-errors";
import Post from "../../models/Post.js";
import path from "path";

const getPostMedia = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      throw creatErr(404, "Post not found");
    }

    let filePath = "";
    if (post.postPicture && post.postPicture.path) {
      filePath = post.postPicture.path;
    }
    if (post.postVideo && post.postVideo.path) {
      filePath = post.postVideo.path;
    }

    const postFilePath = path.resolve("./", filePath);
    res.sendFile(postFilePath);
  } catch (error) {
    next(creatErr(404, error));
  }
};

export { getPostMedia };
