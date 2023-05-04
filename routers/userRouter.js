import express from "express";
import multer from "multer";
import validRegisterInfo from "../middlewares/validRegister.js";
import sendingEmail from "../middlewares/sendingEmail.js";
import { loginUser } from "../controllers/user/loginUser.js";
import { conformedEmail } from "../controllers/user/conferUserEmail.js";
import { updatePassword } from "../controllers/user/updatePassword.js";
import { checkEmail } from "../controllers/user/checkEmail.js";
import { registerUser } from "../controllers/user/registerUser.js";
import { resetNewPassword } from "../controllers/user/resetPassword.js";
import { profilePicture } from "../controllers/user/profilePicture.js";
import { updateProfilePicture } from "../controllers/user/updateProfilePicture.js";
const router = express.Router();

const upload = multer({ dest: "uploads/" });

const fotoProfileMiddleWare = upload.fields([
  { name: "profilePicture", maxCount: 1 },
]);
router.get("/conform-email", conformedEmail);
router.get("/check-email/:email", checkEmail);
router.get("/profile-picture/:id", profilePicture);
router.post("/login", loginUser);
router.post("/register", validRegisterInfo, registerUser, sendingEmail);
router.post("/reset-password", resetNewPassword);
router.put("/update-password/:id", updatePassword);
router.put(
  "/update-profile-picture/:id",
  fotoProfileMiddleWare,
  updateProfilePicture
);

export default router;
