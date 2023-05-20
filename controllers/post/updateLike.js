import creatErr from "http-errors";
import Post from "../../models/Post.js";

const updateLikes = async (req, res, next) => {
  try {
    const { id, like, dislike } = req.body;
    const post = await Post.updateLikes(id, req.userId, like, dislike);
    res.send(post);
  } catch (error) {
    next(creatErr(404, error));
  }
};
export { updateLikes };

/**
const updatedPost = await Post.updateLikes(postId, userId, true, false); // Add a like for the user
// or
const updatedPost = await Post.updateLikes(postId, userId, false, true); // Add a dislike for the user
// or
const updatedPost = await Post.updateLikes(postId, userId, false, false); // Remove both like and dislike for the user

*/
