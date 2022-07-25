import React, { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import "./Write.css";

export default function Write() {
  const [title, setTitle] = useState("");
  var [categories, setCategory] = useState(["sport"]);
  const [desc, setDesc] = useState("");
  const [file, setfile] = useState("");
  const { user } = useContext(Context);
  const addCheckValue = (value) => {
    const valueToLowerCase = value.toLowerCase();
    const categoryFound = categories.filter((cat) => cat === valueToLowerCase);
    if (categoryFound.length === 0) {
      setCategory([...categories, valueToLowerCase]);
    } else {
      const categoryFilter = categories.filter(
        (cat) => cat !== valueToLowerCase
      );
      setCategory(categoryFilter);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = { username: user.username, title, desc, categories };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      await axios
        .post("http://localhost:3001/image/upload", data)
        .then((res) => {
          console.log(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    await axios
      .post("http://localhost:3001/post/", newPost)
      .then((res) => {
        window.location.replace("/post/" + res.data._id);
      })
      .catch((e) => {
        console.log(e.response.data);
      });
  };
  return (
    <div className="write">
      {file && (
        <img
          className="writeImg"
          src={file && URL.createObjectURL(file)}
          alt=""
        />
      )}

      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fa-solid fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => {
              setfile(e.target.files[0]);
            }}
          />
          <input
            className="writeInput"
            type="check"
            placeholder="Title"
            autoFocus={true}
            required
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="writeFormGroup check-container">
          <span className="category-title">Categories:</span>
          <input
            className="checkbox"
            checked
            type="checkbox"
            name="ossm"
            value="Sport"
            onClick={(e) => {
              alert(e.target.value);
              addCheckValue(e.target.value);
            }}
          />
          <label for="Sport">Sport</label>
          <input
            className="checkbox"
            type="checkbox"
            name="ossm"
            value="Home"
            onClick={(e) => {
              alert(e.target.value);
              addCheckValue(e.target.value);
            }}
          />
          <label for="Home">Home</label>
          <input
            className="checkbox"
            type="checkbox"
            name="ossm"
            value="Gym"
            onClick={(e) => {
              alert(e.target.value);
              addCheckValue(e.target.value);
            }}
          />
          <label for="Gym">Gym</label>
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story"
            type="text"
            required
            className="writeInput
            writeText"
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
