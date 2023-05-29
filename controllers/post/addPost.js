import createError from "http-errors";
import Post from "../../models/Post.js";

const addPost = async (req, res, next) => {
  const postPicture = req.files["postPicture"];
  const postVideo = req.files["postVideo"];
  req.body.createdBy = req.createdId;
  let newPost;
  try {
    if (!postPicture && !postVideo) {
      newPost = await Post.create(req.body);
    } else if (postPicture && !postVideo) {
      newPost = await Post.create({
        ...req.body,
        postPicture: req.uploadedFileData,
      });
    } else if (!postPicture && postVideo) {
      newPost = await Post.create({
        ...req.body,
        postVideo: req.uploadedFileData,
      });
    } else {
      newPost = await Post.create({
        ...req.body,
        postPicture: postPicture[0],
        postVideo: postVideo[0],
      });
    }
    res.send(newPost);
  } catch (error) {
    next(createError(401, error));
  }
};

export { addPost };
