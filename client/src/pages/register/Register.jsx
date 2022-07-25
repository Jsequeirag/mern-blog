import { React, useState } from "react";
import axios from "axios";
import "./Register.css";
import { Link } from "react-router-dom";
export default function Register() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const [error, setError] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:3001/auth/register", {
        email,
        password,
        username,
      })
      .then((res) => {
        console.log("response", res.data);
        window.location.replace("/login");
      })
      .catch((e) => {
        console.log(e.response.data.message);
        setError(e.response.data.message);
      });
  };
  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        {error && <span id="message">{error} </span>}
        <label>Username</label>
        <input
          className="registerInput"
          type="text"
          required
          minLength={6}
          placeholder="Enter your username"
          onChange={(e) => {
            setUsername(e.target.value);
            console.log(e.target.value);
          }}
        />
        <label>Email</label>
        <input
          className="registerInput"
          type="email"
          required
          placeholder="Enter your email"
          onChange={(e) => {
            setEmail(e.target.value);
            console.log(e.target.value);
          }}
        />
        <label>Password</label>
        <input
          className="registerInput"
          type="password"
          required
          minLength={6}
          placeholder="Enter your password"
          onChange={(e) => {
            setPassword(e.target.value);
            console.log(e.target.value);
          }}
        />
        <button className="registerButton" type="submit">
          register
        </button>
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
