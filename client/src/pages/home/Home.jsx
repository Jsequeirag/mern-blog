import React, { useState, useEffect } from "react";
import "./Home.css";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import SideBar from "../../components/sidebar/SideBar";
import axios from "axios";
import { useLocation } from "react-router-dom";
export default function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  console.log(search);
  useEffect(() => {
    const getPosts = async () => {
      await axios
        .get(`${process.env.REACT_APP_SERVER}post${search}`)
        .then((res) => {
          setPosts(res.data);
        });
    };
    getPosts();
  }, [search]);

  return (
    <>
      <Header title={"Blog"} />
      <div className="home">
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
