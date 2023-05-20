import { compare } from "bcrypt";
import User from "../../models/User.js";
import creatErr from "http-errors";

const reception = async (req, res, next) => {
  try {
    const user = await User.findById(req.adminId);

    const isPassword = await compare(req.body.password, user.password);
    if (!isPassword) return next(creatErr(404, "The password is not match"));
    const reception = await User.findOneAndUpdate(
      { _id: req.adminId },
      { reception: !req.body.reception },
      { new: true }
    );

    res.json(reception);
  } catch (error) {
    next(creatErr(404, error));
  }
};
export { reception };
