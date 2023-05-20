import creatErr from "http-errors";
import Post from "../../models/Post.js";

const addPost = async (req, res, next) => {
  const postPicture = req.files["postPicture"];
  req.body.createdBy = req.createdId;
  let newPost;
  try {
    if (!postPicture) {
      newPost = await Post.create(req.body);
    } else {
      newPost = await Post.create({ ...req.body, postPicture: postPicture[0] });
    }
    res.send(newPost);
  } catch (error) {
    next(creatErr(401, error));
  }
};

export { addPost };
