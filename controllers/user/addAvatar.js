import User from "../../models/User.js";
import creatErr from "http-errors";
import fs from "fs/promises";
import path from "path";

const addAvatar = async (req, res, next) => {
  const oldProfilePicture = req.body.oldProfilePicture;

  if (oldProfilePicture) {
    try {
      await fs.unlink(path.resolve("./", oldProfilePicture));
    } catch (err) {
      console.log(err);
    }
  }
  try {
    const updateUser = await User.findOneAndUpdate(
      { _id: req.userId },
      {
        imgProfile: {
          fieldname: "avatar",
          originalname: "avatar",
          mimetype: "image/jng",
          filename: "default-avatar.jpg",
          path: "uploads/avatar.jpg",
          size: 0,
        },
      },
      { new: true }
    );

    res.send(updateUser);
  } catch (error) {
    next(creatErr(401, error));
  }
};
export { addAvatar };
