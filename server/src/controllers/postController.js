const postModel = require("../models/Post");
const fs = require("fs");
/* --------------------------------- create --------------------------------- */
const createPost = async (req, res) => {
  try {
    console.log(req.body);
    if (req.body.categories.length === 0) {
      return res.status(200).json({ message: "Select a category" });
    }
    if (!req.body.photo) {
      return res.status(200).json({ message: "Select a image" });
    }
    const post = new postModel(req.body);
    await post.save();
    res.status(200).json(post);
  } catch (e) {
    res.status(500).json(e);
  }
};
/* --------------------------------- update --------------------------------- */
const updatePost = async (req, res) => {
  try {
    const updatedPost = await postModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedPost);
  } catch (e) {
    res.status(500).json(e);
  }
};
/* --------------------------------- delete --------------------------------- */
const deletePost = async (req, res) => {
  try {
    const postDeleted = await postModel.findByIdAndDelete(req.params.id);
    var filePath = `src/images/${postDeleted.photo}`;
    fs.unlinkSync(filePath);
    res.status(200).json(postDeleted);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};
/* ------------------------------ get all post ------------------------------ */
const getPosts = async (req, res) => {
  try {
    let posts;
    const username = req.query.username;
    const category = req.query.category;
    console.log(req.query);
    if (username) {
      posts = await postModel.find({ username: username });
      return res.status(200).json(posts);
    } else if (category) {
      posts = await postModel.find({ categories: { $in: [category] } });
      return res.status(200).json(posts);
    } else {
      //get last 6 post
      posts = await postModel.find({}).sort({ createdAt: -1 }); //.limit(6); //---> 1 for asc and -1 for desc
      res.status(200).json(posts);
    }
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};
//GET POST
const getPost = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);
    res.status(200).json(post);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};
/* --------------------------- get posts by username -------------------------- */
const getPostByUsername = async (req, res) => {
  try {
    const post = await postModel
      .find({ username: req.params.username })
      .sort({ createdAt: -1 });
    res.status(200).json(post);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};
/* --------------------------- get posts by username -------------------------- */
const getPostByCategory = async (req, res) => {
  console.log(req.params.categoryname);
  try {
    const post = await postModel
      .find({ categories: { $in: [req.params.categoryname] } })
      .sort({ createdAt: -1 });
    res.status(200).json(post);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  getPosts,
  getPost,
  getPostByUsername,
  getPostByCategory,
};
