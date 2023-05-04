import { compare, hash } from "bcrypt";
import mongoose from "mongoose";
import Admin from "./User";

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

const employerSchema = new Schema(
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
    imgProfile: { type: fotoSchema },
    isEmployer: {
      type: Boolean,
      default: true,
    },
    admin: { type: Schema.Types.ObjectId, ref: "admin" },
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
// Hash the password before saving the employer to the database
employerSchema.pre("save", async function () {
  try {
    const hashPassword = await hash(this.password, 10);
    this.password = hashPassword;
  } catch (error) {
    console.log(error);
  }
});
// Add a method to the schema to compare passwords
/*
employerSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    const isMatch = await compare(candidatePassword, this.password);
    return isMatch;
  } catch (error) {
    throw new Error(error);
  }
};
*/
employerSchema.pre("deleteOne", async function () {
  const id = this.getQuery()._id;

  const admin = await Admin.findOne({ employers: id });

  admin.employers = admin.employers.filter(
    (x) => x.toString() !== id.toString()
  );

  await admin.save();
});

// Add a new function to the schema to compare passwords

employerSchema.statics.login = async (loginUser) => {
  const admin = await Employer.findOne({
    userName: loginUser.userName,
    email: loginUser.email,
  });
  if (!admin) return false;
  const isPasswordCorrect = await compare(loginUser.password, admin.password);
  return isPasswordCorrect ? admin : false;
};

const Employer = model("employer", employerSchema);

export default Employer;
