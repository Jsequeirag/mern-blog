const router = require("express").Router();
const {
  createCategory,
  getCategories,
} = require("../controllers/categoryController");
/* --------------------------------- create --------------------------------- */
router.post("/", createCategory);
/* ----------------------------------- get ---------------------------------- */
router.get("/", getCategories);
module.exports = router;
