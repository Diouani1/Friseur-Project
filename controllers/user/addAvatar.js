import { deleteImageFromFirebase } from "../../firebase/index.js";
import User from "../../models/User.js";
import creatErr from "http-errors";

const addAvatar = async (req, res, next) => {
  const oldProfilePicture = req.body.oldProfilePicture;

  try {
    if (oldProfilePicture) {
      try {
        await deleteImageFromFirebase(oldProfilePicture);
      } catch (error) {
        console.log(error.message);
      }
    }
    const updateUser = await User.findOneAndUpdate(
      { _id: req.userId },
      {
        imgProfile: {
          fieldname: "avatar",
          originalname: "avatar",
          mimetype: "image/jng",
          filename: "avatar.jpg",
          path: "",
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
