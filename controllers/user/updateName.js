import User from "../../models/User.js";
import creatErr from "http-errors";

// update names
const updateName = async (req, res, next) => {
  try {
    const updateName = await User.findOneAndUpdate(
      { _id: req.userId },
      req.body,
      { new: true }
    );
    res.send(updateName);
  } catch (error) {
    next(creatErr(401, error));
  }
};
export { updateName };
