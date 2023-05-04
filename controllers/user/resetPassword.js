import User from "../../models/User.js";
import creatErr from "http-errors";

const resetNewPassword = async (req, res, next) => {
  try {
    // Check if token is still valid
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Password reset token is invalid or has expired" });
    }
    // Update user's password in the database
    user.password = req.body.password;
    await user.save();
    res.json({ successfull: true });
  } catch (error) {
    next(creatErr(401, error.message));
  }
};

export { resetNewPassword };
