import express from "express";
import { registerEmployer } from "../controllers/admin/registerEmployer.js";
import validEmployerRegister from "../middlewares/validEmployerRegister.js";
import { reception } from "../controllers/admin/reception.js";
import { getAllEmployer } from "../controllers/admin/getAllEmployer.js";
import { getEmployerPicture } from "../controllers/admin/getEmployerPicture.js";
import { addReceipt } from "../controllers/admin/addReceipt.js";
import { makeAsUser } from "../controllers/admin/makeAsUser.js";
import { deleteEmployer } from "../controllers/admin/deleteEmployer.js";
import { getReceipt } from "../controllers/admin/getReceipt.js";
import { getEmployerReceipt } from "../controllers/admin/getEmployerReceipt.js";
import checkAuthAdmin from "../middlewares/checkAuthAdmin.js";

const router = express.Router();

router.post(
  "/register-employer",
  checkAuthAdmin,
  validEmployerRegister,
  registerEmployer
);
router.post("/reception", checkAuthAdmin, reception);
router.get("/get-all-employer", getAllEmployer);
router.get(
  "/get-employer-picture/:username",
  checkAuthAdmin,
  getEmployerPicture
);
router.post("/add-receipt", checkAuthAdmin, addReceipt);
router.put("/make-as-user", checkAuthAdmin, makeAsUser);
router.delete("/delete-employer", checkAuthAdmin, deleteEmployer);
router.get("/get-receipts", checkAuthAdmin, getReceipt);
router.get("/get-receipts/:id", checkAuthAdmin, getEmployerReceipt);

export default router;
