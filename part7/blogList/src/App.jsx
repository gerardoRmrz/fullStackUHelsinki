import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getUsersList } from "./reducers/usersListReducer";
import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
import BlogById from "./components/BlogById";
import NewBlogsForm from "./components/NewBlogsForm";
import NavBar from "./components/NavBar";
import Toggable from "./components/Toggable";
import Users from "./components/Users";
import UserById from "./components/UserById";
import Home from "./components/Home";

import { initializeBlogs } from "./reducers/blogsReducer";
import { getUserInfo } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState([]);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  useEffect(() => {
    dispatch(getUsersList());
  }, []);

  const user = useSelector((state) => state.user);

  const loginForm = () => (
    <Toggable
      buttonLabel="login"
      username={username}
      password={password}
      setUserName={setUserName}
      setPassword={setPassword}
    >
      <LoginForm />
    </Toggable>
  );

  const newBlogsForm = () => (
    <Toggable
      buttonLabel="create a new blog"
      setBlogs={setBlogs}
      newBlog={newBlog}
      setNewBlog={setNewBlog}
    >
      <NewBlogsForm />
    </Toggable>
  );

  return (
    <Router>
      <div>
        {user ? <NavBar /> : null}
        {user === null && loginForm()}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/blogs"
            element={<BlogList user={user} newBlogsForm={newBlogsForm} />}
          />
          <Route path="/users" element={<Users />}></Route>
          <Route path="/users/:id" element={<UserById />} />
          <Route path="/blogs/:id" element={<BlogById />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
