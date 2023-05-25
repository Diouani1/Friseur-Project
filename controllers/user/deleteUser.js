import creatErr from "http-errors";
import User from "../../models/User.js";

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.deleteOne({ _id: req.userId });

    res.send({ ok: true });
  } catch (error) {
    next(creatErr(401, error));
  }
};

export { deleteUser };
