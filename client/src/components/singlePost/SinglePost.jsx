import { React, useContext, useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Context } from "../../context/Context";
import axios from "axios";
import "./SinglePost.css";
export default function SinglePost() {
  const server = process.env.REACT_APP_SERVER;
  const { user } = useContext(Context);
  const [post, setPost] = useState({});
  const { pathname } = useLocation();
  const path = pathname.substring(1);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  useEffect(() => {
    /* -------------------------------- get post -------------------------------- */
    const getPost = () => {
      axios.get(`${server}${path}`).then((res) => {
        setPost(res.data);
        setTitle(res.data.title);
        setDesc(res.data.desc);
      });
    };
    getPost();
  });

  /* ------------------------------- delete post ------------------------------ */
  const handleDelete = async () => {
    await axios
      .delete(`${server}${path}`)
      .then((res) => {
        window.location.replace("/");
      })
      .catch((e) => {
        /* ---------------------------------- modal --------------------------------- */
      });
  };
  /* ----------------------------------update---------------------------------- */

  const handleUpdate = async () => {
    await axios
      .put(`${server}${path}`, {
        title: title,
        desc: desc,
      })
      .then((res) => {
        setUpdateMode(false);
        setPost(res.data);
      })
      .catch((e) => {
        /* ---------------------------------- modal --------------------------------- */
      });
  };
  /* -------------------------------- edit post ------------------------------- */
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img
            src={`${process.env.REACT_APP_SERVER_IMAGE}${post.photo}`}
            className="singlePostImg"
            alt=""
          />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        ) : (
          <h1 className="singlePostTitle">
            {post.title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                  s
                ></i>
              </div>
            )}
          </h1>
        )}

        <div className="singlePostInfo">
          <span>
            <Link to={`/?username=${post.username}`} className="link">
              Author:
              <b className="singlePostAuthor">{post.username}</b>
            </Link>
          </span>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>

        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          />
        ) : (
          <p className="singlePostDesc">{post.desc} </p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}
