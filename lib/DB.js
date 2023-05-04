import mongoose from "mongoose";
import User from "../models/User.js";

const connect = () => {
  mongoose.set("strictQuery", false);

  mongoose
    .connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}${process.env.DB_HOST}/${process.env.DB_NAME}`
    )
    .then(async () => {
      console.log(`[DB] is connected`);
      // Check if admin  exists
      try {
        const admin = await User.findOne({});

        if (!admin) {
          // Manually create admin
          const creatAdmin = await User.create({
            fullName: "Full Name",
            userName: "admin",
            email: "diouanijalouka@gmail.com",
            password: "password",
            role: "admin",
            verified: true,
          });

          console.log(creatAdmin);
          return;
        }
      } catch (err) {
        console.error(err);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export default connect;
