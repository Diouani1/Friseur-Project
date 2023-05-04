import express from "express";
import dotenv from "dotenv";
import connect from "./lib/DB.js";
import router from "./routes.js";
import cors from "cors";
import logger from "morgan";

dotenv.config();

connect();
const app = express();
app.use(express.json());
app.use(logger("dev"));
app.use(cors({ credentials: true, origin: true }));

// Routers
app.use("/api", router);

app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .send(err || { message: "Something went Wrong!" });
});

const port = process.env.PORT;
app.listen(port, console.log(`Server listening on port....${port}`));
