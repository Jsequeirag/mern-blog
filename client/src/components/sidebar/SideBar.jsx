import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./SideBar.css";
export default function SideBar() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getCategories = async () => {
      await axios.get(`${process.env.REACT_APP_SERVER}category`).then((res) => {
        setCategories(res.data);
        console.log(res.data);
      });
    };
    getCategories();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src="https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandblog/demo/wp-content/uploads/2015/11/aboutme.jpg"
          alt=""
        />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam magni
          labore excepturi exercitationem? Iure distinctio alias labore nulla.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {categories.map((category) => (
            <Link
              key={category._id}
              to={`/category/${category.name}`}
              className="link"
            >
              <li className="sidebarListItem">{category.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <ul className="sidebarSocial">
          <i className="topIcon fa-brands fa-facebook-square"></i>
          <i className="topIcon fa-brands fa-twitter-square"></i>
          <i className="topIcon fa-brands fa-instagram-square"></i>
          <i className="topIcon fa-brands fa-pinterest-square"></i>
        </ul>
      </div>
    </div>
  );
}
