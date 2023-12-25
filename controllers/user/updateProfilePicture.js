import User from "../../models/User.js";
import creatErr from "http-errors";
import { deleteImageFromFirebase } from "../../firebase/index.js";

const updateProfilePicture = async (req, res, next) => {
  if (!req.file) {
    next(creatErr(401, "please select the file"));
    return;
  }
  const oldProfilePicture = req.body.oldProfilePicture;

  if (oldProfilePicture) {
    try {
      await deleteImageFromFirebase(oldProfilePicture);
    } catch (error) {
      console.log(error.message);
    }
  }
  try {
    const updateImg = await User.findOneAndUpdate(
      { _id: req.userId },
      { imgProfile: req.uploadedFileData },
      { new: true }
    );

    res.send(updateImg);
  } catch (error) {
    next(creatErr(401, error));
  }
};
export { updateProfilePicture };
