// const router = require("express").Router();
import express from "express";
import userRouter from "./routers/userRouter.js";
// import userController from "./controllers/userController.js";

const router = express.Router();

router.use("/user", userRouter);

export default router;
