import User from "../../models/User.js";
import creatErr from "http-errors";
import path from "path";

const profilePicture = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    const fotoProfilePath = path.resolve("./", user.imgProfile.path);
    res.sendFile(fotoProfilePath);
  } catch (error) {
    next(creatErr(404, error));
  }
};

export { profilePicture };
