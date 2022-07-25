const router = require("express").Router();
const {
  createPost,
  updatePost,
  deletePost,
  getPosts,
  getPost,
  getPostByUsername,
  getPostByCategory,
} = require("../controllers/postController");
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.get("/", getPosts);
router.get("/:id", getPost);
router.get("/myposts/:username", getPostByUsername);
router.get("/category/:categoryname", getPostByCategory);
module.exports = router;
