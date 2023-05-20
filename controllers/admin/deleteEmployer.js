import User from "../../models/User.js";
import creatErr from "http-errors";
const deleteEmployer = async (req, res, next) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.body.id });
    res.send(user);
  } catch (error) {
    next(creatErr(404, error));
  }
};
export { deleteEmployer };
