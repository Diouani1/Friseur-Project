import creatErr from "http-errors";
import Post from "../../models/Post.js";
import { Storage } from "@google-cloud/storage";

const storage = new Storage({
  projectId: process.env.PROJECT_ID,
  keyFilename: "./google_credentials.json",
});

const bucketName = process.env.BUCKET_NAME;
const bucket = storage.bucket(bucketName);

const deletePost = async (req, res, next) => {
  const { postId, mediaName } = req.body;
  try {
    if (mediaName) {
      const file = bucket.file(mediaName);
      await file.delete();
    }

    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost) return next(creatErr(401, "Post not found"));
    res.send({ message: "Post deleted successfully" });
  } catch (error) {
    next(creatErr(401, error));
  }
};

export { deletePost };
