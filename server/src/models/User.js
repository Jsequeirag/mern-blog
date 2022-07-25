const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: { type: String, required: true },
    profilePic: {
      type: String,
      default: "defaultavatar.png",
    },
  },
  { Timestamp: true, versionKey: false }
);

userSchema.statics.encryptPassword = async (password) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

userSchema.statics.comparePassword = async (userPassword, hashedPassword) => {
  //retorna un boolean

  const compared = await bcrypt.compare(userPassword, hashedPassword);

  return compared;
};
const userModel = model("users", userSchema);

module.exports = userModel;
