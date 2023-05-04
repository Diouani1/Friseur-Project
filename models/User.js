import { compare, hash } from "bcrypt";
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const fotoSchema = new Schema(
  {
    fieldname: { type: String, required: true },
    originalname: { type: String, required: true },
    mimetype: { type: String, required: true },
    filename: { type: String, required: true },
    path: { type: String, required: true },
    size: { type: Number, required: true },
  },
  { _id: false }
);

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    imgProfile: {
      type: fotoSchema,
      default: {
        fieldname: "avatar",
        originalname: "avatar",
        mimetype: "image/png",
        filename: "default-avatar.png",
        path: "uploads/avatar.png",
        size: 0,
      },
    },

    role: {
      type: String,
      enum: ["user", "admin", "employer"],
      default: "user",
    },
    verified: {
      type: Boolean,
      default: false,
    },
    passwordRandomInt: { type: String },
    passwordRandomIntExpires: { type: Date },
  },
  {
    toJSON: {
      transform: function (doc, data) {
        delete data.password;
        delete data.__v;
        return data;
      },
    },
    timestamps: true,
  }
);
// Hash the password before saving the admin to the database
userSchema.pre("save", async function () {
  try {
    const hashPassword = await hash(this.password, 10);
    this.password = hashPassword;
  } catch (error) {
    console.log(error);
  }
});
// Add a method to the schema to compare passwords
/*
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    const isMatch = await compare(candidatePassword, this.password);
    return isMatch;
  } catch (error) {
    throw new Error(error);
  }
};
*/

// Add a new function to the schema to compare passwords

userSchema.statics.login = async (loginUser) => {
  const admin = await User.findOne({
    email: loginUser.email,
  });
  if (!admin) return false;
  const isPasswordCorrect = await compare(loginUser.password, admin.password);
  return isPasswordCorrect ? admin : false;
};

const User = model("user", userSchema);

export default User;
