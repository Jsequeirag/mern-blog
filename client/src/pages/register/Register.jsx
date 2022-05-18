import React from "react";
import "./Register.css";
import { Link } from "react-router-dom";
export default function Register() {
  return (
    <div className="register">
      <span className="registerTitle">register</span>
      <form className="registerForm">
        <label>Username</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your username"
        />
        <label>Email</label>
        <input
          className="registerInput"
          type="email"
          placeholder="Enter your email"
        />
        <label>Password</label>
        <input
          className="registerInput"
          type="password"
          placeholder="Enter your password"
        />
        <button className="registerButton">register</button>
      </form>
      <button className="registerLoginButton">
        {" "}
        <Link className="link" to="/Login">
          Login
        </Link>
      </button>
    </div>
  );
}
