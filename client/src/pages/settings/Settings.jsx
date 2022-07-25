import { React, useContext, useState } from "react";
import "./Settings.css";
import SideBar from "../../components/sidebar/SideBar";
import axios from "axios";
import { Context } from "../../context/Context";

export default function Settings() {
  const server = process.env.REACT_APP_SERVER;
  const { user, dispatch } = useContext(Context);
  const [username, setUserName] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [file, setFile] = useState("");
  const [success, setSuccess] = useState();

  const handleUpdate = async (e) => {
    dispatch({ type: "UPDATE_START" });
    e.preventDefault();
    const userUpdated = { username, email, password, userId: user._id };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      userUpdated.profilePic = filename;
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
      .put("http://localhost:3001/user/" + user._id, userUpdated)
      .then((res) => {
        //  window.location.replace("/");
        setSuccess(true);
        dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      })
      .catch((e) => {
        console.log(e);
        dispatch({ type: "UPDATE_FAILTURE" });
      });
  };
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update your Account</span>
          <span className="settingsTitleDelete">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleUpdate}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            {file ? (
              <img src={URL.createObjectURL(file)} alt="" />
            ) : (
              <img src={server + user.profilePic} alt="" />
            )}

            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            required
            minLength={6}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <label>Email</label>
          <input
            type="email"
            value={email}
            required
            minLength={6}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
          {success && (
            <span
              style={{ textAlign: "center", color: "green", marginTop: "2px" }}
            >
              Perfil has been updated
            </span>
          )}
        </form>
      </div>
      <SideBar />
    </div>
  );
}
