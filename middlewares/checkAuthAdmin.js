import jwt from "jsonwebtoken";
import creatErr from "http-errors";

const checkAuthAdmin = (req, res, next) => {
  try {
    const token = req.cookies.token;
    // const token = req.session.token;

    if (!token) {
      next(creatErr(401, "you are not allowed"));
      return;
    }
    jwt.verify(token, process.env.SECRET, (err, object) => {
      if (err) {
        next(creatErr(401, err));
        return;
      }
      if (object.role !== "admin") {
        next(creatErr(401, "you are not admin"));
        return;
      }

      req.adminId = object.id;

      next();
    });
  } catch (error) {
    next(creatErr(500, error));
  }
};

export default checkAuthAdmin;
