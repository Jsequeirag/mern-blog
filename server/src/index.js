/* -------------------------------- packages -------------------------------- */
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
/* ------------------------------- middeware ------------------------------- */
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/image", express.static(path.join(__dirname, "/images")));
/* --------------------------------- routes --------------------------------- */
const authRoute = require("./routes/auth");
app.use("/auth", authRoute);
const categoryRoute = require("./routes/categories");
app.use("/category", categoryRoute);
const postRoute = require("./routes/posts");
app.use("/post", postRoute);
const userRoute = require("./routes/users");
const { env } = require("process");
app.use("/user", userRoute);
/* --------------------------------- multer --------------------------------- */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage: storage });

app.post("/image/upload", upload.single("file"), (req, res) => {
  try {
    res.status(200).json({ message: "File has been uploaded" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e });
  }
});
app.get("/", (req, res) => {
  res.json({ message: "Server running" });
});
/* -------------------------------- database -------------------------------- */
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    /* --------------------------------- server --------------------------------- */
    app.listen(process - env.PORT || "3001", () => {
      console.log("server:3001");
    });
  })
  .catch((e) => {
    console.log(e);
  });
