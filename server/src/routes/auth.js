const router = require("express").Router();
const { login, register } = require("../controllers/authController");
/* -------------------------------- register -------------------------------- */
router.post("/register", register);
/* ---------------------------------- login --------------------------------- */
router.post("/login", login);
module.exports = router;
