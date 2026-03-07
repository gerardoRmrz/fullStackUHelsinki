import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { getUsersList } from "./reducers/usersListReducer";
import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
import BlogById from "./components/BlogById";
import styled from "styled-components";
import Notification from "./components/Notification";
import NewBlogsForm from "./components/NewBlogsForm";
import UserName from "./components/UserName";
import Toggable from "./components/Toggable";
import Users from "./components/Users";
import UserById from "./components/UserById";

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

  const header = (user) => {
    if (!user) {
      return null;
    }
    return (
      <>
        <Link to={"/"}>blogs</Link> <Link to={"/users"}>users</Link>{" "}
        <UserName />
      </>
    );
  };

  return (
    <Router>
      <div>
        {header(user)}
        <StyledH1>Blogs</StyledH1>
        <Notification />
        {user === null && loginForm()}
        <Routes>
          <Route
            path="/"
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

const StyledH1 = styled.h1`
  font-size: 3rem;
  color: green;
`;
const StyledButton = styled.button`
  font-size: 1.5rem;
`;
