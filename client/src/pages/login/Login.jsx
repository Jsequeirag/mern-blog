import { useContext, useRef, useState } from "react";
import axios from "axios";
import "./Login.css";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      await axios
        .post(`${process.env.REACT_APP_SERVER}auth/login`, {
          email: userRef.current.value,
          password: passwordRef.current.value,
        })
        .then((res) => {
          dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        })
        .catch((e) => {
          dispatch({ type: "LOGIN_FAILURE" });
          console.log(e);
          setError(e.response.data.message);
          /*  document.getElementById("message").hidden = false;*/
        });
    } catch (e) {}
  };
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        {error && <span id="message">{error}</span>}
        <label>Email</label>
        <input
          className="loginInput"
          type="email"
          required
          placeholder="Enter your email"
          ref={userRef}
        />
        <label>Password</label>
        <input
          className="loginInput"
          type="password"
          required
          minLength={6}
          placeholder="Enter your password"
          ref={passwordRef}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>
          Login
        </button>
      </form>{" "}
      <button className="loginRegisterButton">
        <Link className="link" to="/register">
          Register
        </Link>
      </button>
    </div>
  );
}
