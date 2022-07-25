const categoryModel = require("../models/Category");
/* --------------------------------- create --------------------------------- */
const createCategory = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ name: req.body.name });
    if (category) return res.status(400).json({ message: "category existed" });
    const newCategory = new categoryModel(req.body);
    const categorySaved = await newCategory.save();
    res.status(200).json(categorySaved);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};
/* ----------------------------------- get ---------------------------------- */
const getCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    return res.status(200).json(categories);
  } catch (e) {
    res.status(500).json(e);
  }
};
module.exports = { createCategory, getCategories };
