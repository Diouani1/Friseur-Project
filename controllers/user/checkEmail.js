import User from "../../models/User.js";
import creatErr from "http-errors";
import crypto from "crypto";
import sendEmail from "../../Mail.js";

const checkEmail = async (req, res, next) => {
  try {
    // Check if user with this email exists in the database
    const user = await User.findOne({ email: req.params.email });

    if (!user) {
      return next(creatErr(401, "No user with that email address"));
    }

    // Generate a unique token for the password reset link
    const randomInt = (crypto.randomBytes(4).readUInt32BE(0) % 99999) + 10000;
    // Store the code in the database along with the user's ID
    user.passwordRandomInt = randomInt;
    user.resetPasswordExpires = Date.now() + 1200000; // The code expires in 20 minutes
    await user.save();
    const sent = await sendEmail(
      req.params.email,
      "Reset your Password",
      `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
       <div style="margin:50px auto;width:70%;padding:20px 0">
       <div style="border-bottom:1px solid #eee">
       <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Friseur Laden</a>
       </div>
       <p style="font-size:1.1em">Hey ${user.fullName},</p>
       <p>Thank you for choosing our laden. Use the following Code to complete your Password Recovery Procedure. code is valid for one time and will expires in 20 minutes</p>
       <h2 style="background:  rgba(14, 199, 206, 0.644);margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${randomInt}</h2>
       <p style="font-size:0.9em;">Best Regards,<br />Friseur Laden</p>
       <hr style="border:none;border-top:1px solid #eee" />
       <div style="padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
       <p>laden straße 56</p>
       <p>1600 Berlin</p>
       <p>Germany</p>
       </div>
       </div>
       </div>`
    );

    res.json({ randomInt });
  } catch (error) {
    next(creatErr(407, error.message));
  }
};

export { checkEmail };
