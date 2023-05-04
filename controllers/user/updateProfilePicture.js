import User from "../../models/User.js";
import creatErr from "http-errors";
import fs from "fs/promises";
import path from "path";

const updateProfilePicture = async (req, res, next) => {
  if (!req.files["profilePicture"]) {
    next(creatErr(401, "please select the file"));
    return;
  }
  const oldProfilePicture = req.body.oldProfilePicture;

  if (oldProfilePicture) {
    try {
      await fs.unlink(path.resolve("./", oldProfilePicture));
    } catch (err) {
      console.log(err);
    }
  }
  try {
    const updateImg = await User.findOneAndUpdate(
      { _id: req.params.id },
      { imgProfile: req.files["profilePicture"][0] },
      { new: true }
    );

    res.send(updateImg);
  } catch (error) {
    next(creatErr(401, error));
  }
};
export { updateProfilePicture };
