import creatErr from "http-errors";
import User from "../../models/User.js";
import { deleteImageFromFirebase } from "../../firebase/index.js";

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.deleteOne({ _id: req.userId });
    if (user.imgProfile.path) {
      try {
        await deleteImageFromFirebase(user.imgProfile.path);
      } catch (error) {
        console.log(error.message);
      }
    }

    res.send({ ok: true });
  } catch (error) {
    next(creatErr(401, error));
  }
};

export { deleteUser };
