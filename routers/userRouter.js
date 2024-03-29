import express from "express";
import multer from "multer";
import validRegisterInfo from "../middlewares/validRegister.js";
import sendingEmail from "../middlewares/sendingEmail.js";
import uploadProfileToStorage from "../middlewares/uploadProfileToStorage.js";
import { loginUser, logoutUser } from "../controllers/user/logUser.js";
import { conformedEmail } from "../controllers/user/conferUserEmail.js";
import { updatePassword } from "../controllers/user/updatePassword.js";
import { checkEmail } from "../controllers/user/checkEmail.js";
import { registerUser } from "../controllers/user/registerUser.js";
import { resetNewPassword } from "../controllers/user/resetPassword.js";
import { updateProfilePicture } from "../controllers/user/updateProfilePicture.js";
import checkAuthToken from "../middlewares/checkAuthToken.js";
import { addAvatar } from "../controllers/user/addAvatar.js";
import { updateName } from "../controllers/user/updateName.js";
import { deleteUser } from "../controllers/user/deleteUser.js";
const router = express.Router();

const upload = multer();

const fotoProfileMiddleWare = upload.single("profilePicture");
router.delete("/delete-acount", checkAuthToken, deleteUser);
router.get("/conform-email", conformedEmail);
router.get("/check-email/:email", checkEmail);
router.get("/logout", logoutUser);
router.post("/login", loginUser);
router.post("/register", validRegisterInfo, registerUser, sendingEmail);
router.post("/reset-password", resetNewPassword);
router.put("/update-password", checkAuthToken, updatePassword);
router.put("/update-names", checkAuthToken, updateName);
router.put(
  "/update-profile-picture",
  checkAuthToken,
  fotoProfileMiddleWare,
  uploadProfileToStorage,
  updateProfilePicture
);
router.put("/delete-profile-picture", checkAuthToken, addAvatar);

export default router;
