import { React, useContext } from "react";
import { Context } from "../../context/Context";
import { Link } from "react-router-dom";
import "./TopBar.css";
export default function TopBar() {
  const server = process.env.REACT_APP_SERVER;
  const { user, dispatch } = useContext(Context);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fa-brands fa-facebook-square"></i>
        <i className="topIcon fa-brands fa-twitter-square"></i>
        <i className="topIcon fa-brands fa-instagram-square"></i>
        <i className="topIcon fa-brands fa-pinterest-square"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link
              className="link"
              to="/"
              style={{ TextDecoration: "none", color: "inherit" }}
            >
              HOME
            </Link>
          </li>

          <li className="topListItem">
            <Link
              className="link"
              to="/Myposts"
              style={{ TextDecoration: "none", color: "inherit" }}
            >
              {user && "MY POSTS"}
            </Link>
          </li>
          <li className="topListItem">
            <Link
              className="link"
              to="/write"
              style={{ TextDecoration: "none", color: "inherit" }}
            >
              WRITE
            </Link>
          </li>
          <li className="topListItem">
            <Link
              className="link"
              to="/logout"
              style={{ TextDecoration: "none", color: "inherit" }}
              onClick={handleLogout}
            >
              {user && "LOGOUT"}
            </Link>
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link to="settings">
            <img className="topImg" src={server + user.profilePic} alt="" />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}

        <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
  );
}
