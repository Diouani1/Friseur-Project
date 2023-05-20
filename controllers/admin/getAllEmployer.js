import User from "../../models/User.js";
import creatErr from "http-errors";

const getAllEmployer = async (req, res, next) => {
  try {
    const employers = await User.find({ role: "employer" });
    res.send(employers);
  } catch (error) {
    next(creatErr(404, error));
  }
};

export { getAllEmployer };
