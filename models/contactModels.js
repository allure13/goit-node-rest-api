import { Schema, model } from "mongoose";

const contacts = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set contact name"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favourite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);
export const Contact = model("contacts", contacts);
