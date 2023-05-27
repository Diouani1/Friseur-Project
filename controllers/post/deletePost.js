import creatErr from "http-errors";
import Post from "../../models/Post.js";
import fs from "fs/promises";
import path from "path";

const deletePost = async (req, res, next) => {
  const { postId, mediaPath } = req.body;

  if (mediaPath && typeof mediaPath === "string") {
    try {
      await fs.unlink(path.resolve("./", mediaPath));
    } catch (err) {
      console.log(err);
    }
  }

  try {
    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost) return next(creatErr(401, "Post not found"));
    res.send({ message: "Post deleted successfully" });
  } catch (error) {
    next(creatErr(401, error));
  }
};

export { deletePost };
