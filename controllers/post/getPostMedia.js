import createError from "http-errors";
import Post from "../../models/Post.js";
import { Storage } from "@google-cloud/storage";

const storage = new Storage({
  projectId: process.env.PROJECT_ID,
  keyFilename: "./google_credentials.json",
});

const bucketName = process.env.BUCKET_NAME;
const bucket = storage.bucket(bucketName);

const getPostMedia = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      throw createError(404, "Post not found");
    }

    let filePath = "";
    let objectName = "";
    if (post.postPicture && post.postPicture.path) {
      filePath = post.postPicture.path;
      objectName = post.postPicture.filename;
    }
    if (post.postVideo && post.postVideo.path) {
      filePath = post.postVideo.path;
      objectName = post.postVideo.filename;
    }

    const file = bucket.file(objectName);
    const fileStream = file.createReadStream();

    fileStream.pipe(res);
  } catch (error) {
    next(createError(404, error));
  }
};

export { getPostMedia };
