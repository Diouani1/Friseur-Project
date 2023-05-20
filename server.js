import express from "express";
import dotenv from "dotenv";
import connect from "./lib/DB.js";
import router from "./routes.js";
import cors from "cors";
import cookiesParser from "cookie-parser";
import session from "express-session";
import logger from "morgan";
import path from "path";

dotenv.config();

connect();
const app = express();
app.use(express.static(path.resolve("./", "client/build")));

app.use(express.json());
app.use(cookiesParser());
app.use(cors());
app.use(logger("dev"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // Expires in one month
    },
  })
);

// Routers

app.use("/api", router);
app.get("*", (req, res) => {
  const navToLogin = path.resolve("./", "client/build/index.html");

  res.sendFile(navToLogin);
});

app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .send(err || { message: "Something went Wrong!" });
});

const port = process.env.PORT;
app.listen(port, console.log(`Server listening on port....${port}`));
