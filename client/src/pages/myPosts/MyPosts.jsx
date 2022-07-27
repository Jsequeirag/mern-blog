import React, { useEffect, useState } from "react";
import axios from "axios";
import Posts from "../../components/posts/Posts";
import Header from "../../components/header/Header";
import SideBar from "../../components/sidebar/SideBar";
import "./MyPosts.css";
export default function MyPosts() {
  const [posts, setPosts] = useState([]);
  const getPostsByUsername = async () => {
    const user = JSON.parse(localStorage.getItem("user")).username;

    await axios
      .get(`${process.env.REACT_APP_SERVER}post/myposts/${user}`)
      .then((res) => {
        setPosts(res.data);
      });
  };
  useEffect(() => {
    getPostsByUsername();
  }, []);

  return (
    <>
      <Header title={"My posts"} />
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
