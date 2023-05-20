import mongoose from "mongoose";

const { Schema, model } = mongoose;

const serviceSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { _id: false }
);

const receiptSchema = new Schema(
  {
    services: [serviceSchema],
    employer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    totalePrice: { type: Number, required: true },
    fullName: { type: String, required: true },
  },
  {
    toJSON: {
      transform: function (doc, data) {
        delete data.__v;
        return data;
      },
    },
    timestamps: true,
  }
);

const Receipt = model("receipt", receiptSchema);

export default Receipt;
