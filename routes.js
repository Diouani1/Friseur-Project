import express from "express";
import userRouter from "./routers/userRouter.js";
import adminRouter from "./routers/adminRouter.js";
import postRouter from "./routers/postRouter.js";

const router = express.Router();

router.use("/user", userRouter);
router.use("/admin", adminRouter);
router.use("/post", postRouter);

export default router;
