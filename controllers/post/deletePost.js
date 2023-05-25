import creatErr from "http-errors";
import Post from "../../models/Post.js";
import fs from "fs/promises";
import path from "path";

const deletePost = async (req, res, next) => {
  if (req.body.postPicturePath) {
    try {
      await fs.unlink(path.resolve("./", req.body.postPicturePath));
    } catch (err) {
      console.log(err);
    }
  }

  try {
    const deletedPost = await Post.findByIdAndDelete(req.body.postId);
    if (!deletedPost) return next(creatErr(401, "Post not found"));
    res.send({ message: "Post deleted successfully" });
  } catch (error) {
    next(creatErr(401, error));
  }
};

export { deletePost };
