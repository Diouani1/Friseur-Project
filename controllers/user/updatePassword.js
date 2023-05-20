import User from "../../models/User.js";
import { hash, compare } from "bcrypt";

// Update password
const updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Check if old password is correct
    const isPasswordCorrect = await compare(oldPassword, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }
    //  check new password length
    if (newPassword.length < 6 || newPassword.length > 20) {
      return res
        .status(400)
        .json({ message: "New password must be between 6 and 20 characters" });
    }

    // by saving its auto hashing password

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export { updatePassword };
