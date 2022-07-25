const bcrypt = require("bcrypt");
const userModel = require("../models/User");
const postModel = require("../models/Post");
//update
const updateUser = async (req, res) => {
  console.log(req.body);
  try {
    if (req.body.userId === req.params.id) {
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } else {
        delete req.body.password;
      }

      const userUpdated = await userModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      return res.status(200).json(userUpdated);
    } else {
      return res.status(400).json({ message: "You can't update your account" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};
/* --------------------------------- delete --------------------------------- */
const deleteUser = async (req, res) => {
  try {
    const userDeleted = await userModel.findByIdAndDelete(req.params.id);
    console.log(userDeleted);
    await postModel.deleteMany({ username: userDeleted.username });
    res.status(200).json(userDeleted);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};
/* ----------------------------------- getUser ---------------------------------- */
const getUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    const { password, ...other } = user._doc;
    res.status(200).json(other);
  } catch (e) {
    res.status(500).json(e);
  }
};
module.exports = { updateUser, deleteUser, getUser };
