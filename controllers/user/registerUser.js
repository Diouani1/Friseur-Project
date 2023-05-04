import User from "../../models/User.js";
import creatErr from "http-errors";

// # add a new user

const registerUser = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    res.send(newUser);
    next();
  } catch (error) {
    next(creatErr(401, error));
  }
};

export { registerUser };
