import User from "../../models/User.js";
import creatErr from "http-errors";
import jwt from "jsonwebtoken";

const loginUser = async (req, res, next) => {
  try {
    const user = await User.login(req.body);
    if (!user) return next(creatErr(401, "Invalid Data"));
    if (!user.verified) return next(creatErr(404, "please conform your email"));
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.SECRET,
      { expiresIn: "60d" }
    );
    req.session.token = token;

    res.send(user);
  } catch (error) {
    next(creatErr(404, error));
  }
};

const logoutUser = (req, res, next) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        next(creatErr(501, err));
      }
      // Clear the session cookie
      res.clearCookie("connect.sid", {
        path: "/",
        domain: "localhost",
        secure: true,
        httpOnly: true,
      });

      res.send({ ok: true });
    });
  } catch (error) {
    next(creatErr(500, error));
  }
};
export { loginUser, logoutUser };
