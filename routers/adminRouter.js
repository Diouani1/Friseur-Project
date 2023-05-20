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

const router = express.Router();

router.post("/register-employer", validEmployerRegister, registerEmployer);
router.post("/reception", reception);
router.get("/get-all-employer", getAllEmployer);
router.get("/get-employer-picture/:username", getEmployerPicture);
router.post("/add-receipt", addReceipt);
router.put("/make-as-user", makeAsUser);
router.delete("/delete-employer", deleteEmployer);
router.get("/get-receipts", getReceipt);
router.get("/get-receipts/:id", getEmployerReceipt);

export default router;
