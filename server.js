import express from "express";
import dotenv from "dotenv";
import connect from "./lib/DB.js";
import router from "./routes.js";
import cors from "cors";
import cookiesParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import logger from "morgan";
import path from "path";

dotenv.config();

connect();

const store = MongoStore.create({
  mongoUrl: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}${process.env.DB_HOST}/${process.env.DB_NAME}`,
  collectionName: "sessions",
});

const app = express();
app.use(express.static(path.resolve("./", "client/dist")));

app.use(express.json());
app.use(cookiesParser());
app.use(cors());
app.use(logger("dev"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      maxAge: 2 * 30 * 24 * 60 * 60 * 1000, // Expires in one month
    },
    unset: "destroy",
  })
);

// Routers

app.use("/api", router);
app.get("*", (req, res) => {
  const navToLogin = path.resolve("./", "client/dist/index.html");

  res.sendFile(navToLogin);
});

app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .send(err || { message: "Something went Wrong!" });
});

const port = process.env.PORT;
app.listen(
  port,
  console.log(`Server listening on port... http://localhost:${port}`)
);
