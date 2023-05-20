import express from "express";
import userRouter from "./routers/userRouter.js";
import adminRouter from "./routers/adminRouter.js";
import checkAuthAdmin from "./middlewares/checkAuthAdmin.js";
import postRouter from "./routers/postRouter.js";

const router = express.Router();

router.use("/user", userRouter);
router.use("/admin", checkAuthAdmin, adminRouter);
router.use("/post", postRouter);

export default router;
