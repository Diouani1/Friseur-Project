import { compare, hash } from "bcrypt";
import mongoose from "mongoose";
import Post from "./Post.js";

const { Schema, model } = mongoose;

const fotoSchema = new Schema(
  {
    fieldname: { type: String, required: true },
    originalname: { type: String, required: true },
    mimetype: { type: String, required: true },
    filename: { type: String, required: true },
    path: { type: String },
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
        mimetype: "image/jng",
        filename: "avatar.jpg",
        path: "",
        size: 0,
      },
    },

    role: {
      type: String,
      enum: ["user", "admin", "employer"],
      default: "user",
    },
    telephone: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    passwordRandomInt: { type: String },
    reception: {
      type: Boolean,
      default: false,
    },
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

userSchema.pre("deleteOne", async function () {
  const userId = this.getQuery()._id;
  console.log("userId :", userId);
  // Delete all comments by the user
  await Post.updateMany({}, { $pull: { comments: { author: userId } } });

  // Delete all reply comments by the user
  await Post.updateMany(
    { "comments.replyComments.author": userId },
    { $pull: { "comments.$.replyComments": { author: userId } } }
  );

  // // Delete all likes and dislikes from comments by the user
  await Post.updateMany(
    {
      $or: [
        { "comments.likeComment": userId },
        { "comments.dislikeComment": userId },
        { "comments.replyComments.likeReply": userId },
        { "comments.replyComments.dislikeReply": userId },
      ],
    },
    {
      $pull: {
        "comments.$[].likeComment": userId,
        "comments.$[].dislikeComment": userId,
        "comments.$[].replyComments.$[].likeReply": userId,
        "comments.$[].replyComments.$[].dislikeReply": userId,
      },
    }
  );

  // // Delete all likes and dislikes from posts by the user
  await Post.updateMany(
    {},
    {
      $pull: {
        likes: userId,
        path: "gs://profile-jalouka-bucket/avatar.jpg",
        dislikes: userId,
      },
    }
  );
});

userSchema.statics.login = async (loginUser) => {
  const user = await User.findOne({
    email: loginUser.email,
  });
  if (!user) return false;
  const isPasswordCorrect = await compare(loginUser.password, user.password);
  return isPasswordCorrect ? user : false;
};

const User = model("user", userSchema);

export default User;
