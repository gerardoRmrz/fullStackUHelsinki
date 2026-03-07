import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
import styled from "styled-components";
import Notification from "./components/Notification";
import NewBlogsForm from "./components/NewBlogsForm";
import UserName from "./components/UserName";
import Toggable from "./components/Toggable";
import Users from "./components/Users";

import { initializeBlogs } from "./reducers/blogsReducer";
import { getUserInfo } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState([]);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  //const [user, setUser] = useState(null);
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  const user = useSelector((state) => state.user);

  const userName = () => <UserName />;

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

  const blogsList = () => {
    return (
      <>
        <BlogList user={user} />
      </>
    );
  };

  return (
    <Router>
      <div>
        <StyledH1>Blogs</StyledH1>
        <Notification />
        {user === null && loginForm()}
        {user !== null && userName()}
        <Routes>
          <Route path="/users" element={<Users />}></Route>
          {/* }
          
          {user !== null && newBlogsForm()}
          {user !== null && blogsList()} */}
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
