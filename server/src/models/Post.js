const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    photo: { type: String, required: true },
    username: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      required: false,
      lowercase: true,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const postModel = model("posts", postSchema);
module.exports = postModel;
