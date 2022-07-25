const userModel = require("../models/User");
const bcrypt = require("bcrypt");
const register = async (req, res) => {
  try {
    const user = await userModel.findOne({ username: req.body.username });
    if (user) return res.status(400).json({ message: "username existed!" });
    const email = await userModel.findOne({ email: req.body.email });
    if (email) return res.status(400).json({ message: "email existed!" });

    const newUser = await new userModel({
      username: req.body.username,
      email: req.body.email,
      password: await userModel.encryptPassword(req.body.password),
    });
    await newUser.save();
    return res.status(200).json(newUser);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e });
  }
};

const login = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ message: "wrong email!" });
    const passwordValidated = await userModel.comparePassword(
      req.body.password,
      user.password
    );
    if (!passwordValidated)
      return res.status(400).json({ message: "Wrong password!" });
    const { password, ...others } = user._doc;

    res.status(200).json(others);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e });
  }
};

module.exports = { register, login };
