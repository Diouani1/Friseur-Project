import User from "../../models/User.js";
import creatErr from "http-errors";

const makeAsUser = async (req, res, next) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.body.id },
      { role: "user" },
      { new: true }
    );
    res.send(user);
  } catch (error) {
    next(creatErr(404, error));
  }
};
export { makeAsUser };
