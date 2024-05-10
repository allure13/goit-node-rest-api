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
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);
export const Contact = model("contacts", contacts);
