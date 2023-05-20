import User from "../../models/User.js";
import creatErr from "http-errors";
import path from "path";

const getEmployerPicture = async (req, res, next) => {
  try {
    const employer = await User.findOne({ userName: req.params.username });
    const fotoProfilePath = path.resolve("./", employer.imgProfile.path);
    res.sendFile(fotoProfilePath);
  } catch (error) {
    next(creatErr(404, error));
  }
};

export { getEmployerPicture };
