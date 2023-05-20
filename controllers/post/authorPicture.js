import User from "../../models/User.js";
import creatErr from "http-errors";
import path from "path";

const authorPicture = async (req, res, next) => {
  try {
    const user = await User.findOne({ userName: req.params.username });

    const authorPicturePath = path.resolve("./", user.imgProfile.path);
    res.sendFile(authorPicturePath);
  } catch (error) {
    next(creatErr(404, error));
  }
};
export { authorPicture };
