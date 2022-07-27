import React, { useState, useEffect } from "react";
import Posts from "../../components/posts/Posts";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import axios from "axios";
import SideBar from "../../components/sidebar/SideBar";
import "./CategoryPosts.css";
export default function CategoryPosts() {
  const { pathname } = useLocation();
  const path = pathname.substring(1);
  const [posts, setPosts] = useState([]);
  const getPostsByCategory = async () => {
    await axios
      .get(`${process.env.REACT_APP_SERVER}post/${path}`)
      .then((res) => {
        setPosts(res.data);
      });
  };
  useEffect(() => {
    getPostsByCategory();
  });
  return (
    <>
      <Header title={"Category Posts"} />
      <div className="MyPosts">
        {posts.length !== 0 ? (
          <Posts posts={posts} />
        ) : (
          <div className="no-result">
            <h1>No result</h1>
          </div>
        )}

        <SideBar />
      </div>
    </>
  );
}
