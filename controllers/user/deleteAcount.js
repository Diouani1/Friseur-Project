import User from "../../models/User.js";
import creatErr from "http-errors";

// delete acount
const deleteAcount = async (req, res, next) => {
  try {
    const deleteAcount = await User.findOneAndDelete({ _id: req.userId });
    res.send(deleteAcount);
  } catch (error) {
    next(creatErr(401, error));
  }
};
export { deleteAcount };
