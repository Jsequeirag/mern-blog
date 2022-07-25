import React from "react";
import "./Header.css";
import { parallax } from "../utils/functions.js";
export default function Header({ title }) {
  parallax();
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">React & Node</span>
        <span className="headerTitleLg">{title}</span>
      </div>
      <div id="parallax" className="headerImg"></div>
    </div>
  );
}
