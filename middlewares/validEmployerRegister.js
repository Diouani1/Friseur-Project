import { body, validationResult } from "express-validator";
import creatErr from "http-errors";
const validEmployerRegister = async (req, res, next) => {
  await body("fullName")
    .exists()
    .withMessage("full name is Required")
    .trim()
    .run(req);
  await body("userName")
    .exists()
    .withMessage("username is Required")
    .trim()
    .run(req);
  await body("email")
    .exists()
    .withMessage("email is Required")
    .normalizeEmail()
    .isEmail()
    .withMessage("Not a valid Email!")
    .trim()
    .run(req);
  await body("telephone")
    .exists()
    .withMessage("telephone is Required")
    .isLength({ min: 11, max: 17 })
    .withMessage("mobile number must have more then 10 numbers.")
    .run(req);

  const err = validationResult(req);
  if (err.isEmpty()) {
    next();
    return;
  }
  next(creatErr(401, err));
};

export default validEmployerRegister;
