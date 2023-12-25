import { deleteImageFromFirebase } from "../../firebase/index.js";
import User from "../../models/User.js";
import creatErr from "http-errors";
const deleteEmployer = async (req, res, next) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.body.id });
    try {
      await deleteImageFromFirebase(user.imgProfile.path);
    } catch (error) {
      console.log(error.message);
    }
    res.send(user);
  } catch (error) {
    next(creatErr(404, error));
  }
};
export { deleteEmployer };
