import React from "react";
import "./Post.css";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  const server = process.env.REACT_APP_SERVER_IMAGE;
  console.log(post.photo);
  return (
    <div className="post">
      {post.photo && (
        <img className="postImg" src={server + post.photo} alt="" />
      )}

      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((category) => (
            <span className="postCat"> {category} </span>
          ))}
        </div>
        <Link
          to={`/post/${post._id}`}
          style={{ textDecoration: "none", color: "black", marginTop: "15px" }}
          state={{ nombre: "jose" }}
        >
          <span className="postTitle">{post.title}</span>
        </Link>

        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDesc">{post.desc}</p>
    </div>
  );
}
