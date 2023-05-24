import Email from "../../models/Email.js";
import User from "../../models/User.js";

const conformedEmail = async (req, res, next) => {
  try {
    const confirmedEmail = await Email.findOne({
      userId: req.query.userId,
      key: req.query.key,
    });
    if (confirmedEmail.userId) {
      const updateUser = await User.findOneAndUpdate(
        { _id: req.query.userId },
        { verified: true }
      );
      await Email.findOneAndDelete({
        userId: req.query.userId,
        key: req.query.key,
      });
      res.redirect("https://barbershop-diouani.onrender.com");
    }
  } catch (error) {
    next(creatErr(401, error));
  }
};

export { conformedEmail };
