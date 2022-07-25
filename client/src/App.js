import TopBar from "./components/topbar/TopBar";
import Home from "./pages/home/Home";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import MyPosts from "./pages/myPosts/MyPosts";
import CategoryPosts from "./pages/categoryPosts/CategoryPosts";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Context } from "./context/Context";
import { useContext } from "react";
function App() {
  const { user } = useContext(Context);
  return (
    <>
      <BrowserRouter>
        <TopBar />
        <Routes>
          <Route path="/" element={<Home />} />{" "}
          <Route path="register" element={user ? <Home /> : <Register />} />
          <Route path="login" element={user ? <Home /> : <Login />} />
          <Route path="settings" element={user ? <Settings /> : <Register />} />
          <Route path="write" element={user ? <Write /> : <Register />} />
          <Route path="post/:postId" element={<Single />} />
          <Route path="/logout" element={<Home />} />{" "}
          <Route path="/myposts" element={user ? <MyPosts /> : <Home />} />{" "}
          <Route
            path="/category/:category"
            element={user ? <CategoryPosts /> : <Home />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
