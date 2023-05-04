import User from "../../models/User.js";
import creatErr from "http-errors";
import jwt from "jsonwebtoken";

const loginUser = async (req, res, next) => {
  try {
    const user = await User.login(req.body);
    if (!user) return next(creatErr(401, "Invalid Data"));
    if (!user.verified) return next(creatErr(404, "please conform your email"));
    const token = jwt.sign({ id: user._id }, process.env.SECRET);
    res.cookie("token", token, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    });
    res.send(user);
  } catch (error) {
    next(creatErr(404, error));
  }
};
export { loginUser };
