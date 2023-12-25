import User from "../../models/User.js";
import creatErr from "http-errors";

const authorPicture = async (req, res, next) => {
  try {
    const user = await User.findOne({ userName: req.params.username });
    res.send(user.imgProfile.path);
  } catch (error) {
    next(creatErr(404, error));
  }
};
export { authorPicture };
