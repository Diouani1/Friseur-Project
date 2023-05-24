import User from "../models/User.js";
import Email from "../models/Email.js";
import sendEmail from "../Mail.js";
import creatErr from "http-errors";

const sendingEmail = async (req, res, next) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      userName: req.body.userName,
    });
    const key = Math.random().toString(20).substring(2, 18);
    const insertConfirmation = await Email.create({
      userId: user._id,
      key,
    });
    const info = await sendEmail(
      req.body.email,
      "verify Your email",
      `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
      <div style="margin:50px auto;width:70%;padding:20px 0">
      <div style="border-bottom:1px solid #eee">
      <h1 style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Friseur Laden</h1>
      </div>
      <h2 style="font-size:1.1em">Dear "${req.body.fullName}"</h2>
      <h4>This is App of our laden, Thanks for your visit </4>
      <p>
      
      This email '${req.body.email}', is used to register in our app, <br>
      please visit <a style="background:  rgba(14, 199, 206, 0.644);margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;" href="https://barbershop-diouani.onrender.com/api/user/conform-email?userId=${user._id}&key=${key}">this link</a> To verify your email.
      <br>
      If you not the owner, please ignore the message
      
      
      </p>
      <p style="font-size:0.9em;">Best Regards,<br />Herr Maneger</p>
      <hr style="border:none;border-top:1px solid #eee" />
      <div style="padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p> straße name 56</p>
      <p>1600 Berlin</p>
      <p>Germany</p>
      </div>
      </div>
      </div>`
    );
  } catch (error) {
    next(creatErr(401, error.message));
  }
};
export default sendingEmail;
