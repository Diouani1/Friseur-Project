import User from "../../models/User.js";
import creatErr from "http-errors";

// # add new employer

const registerEmployer = async (req, res, next) => {
  try {
    req.body.password = "123456";
    req.body.verified = true;
    const newEmployer = await User.create(req.body);
    res.send(newEmployer);
  } catch (error) {
    next(creatErr(401, error));
  }
};

export { registerEmployer };
