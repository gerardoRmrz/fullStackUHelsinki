import { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  removeBlogMessage,
  errorMessage,
  clearMessage,
} from "../reducers/notificationReducer";

import { clearBlog } from "../reducers/blogsReducer";

const Blog = (props) => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const showDetailsHandler = () => {
    setShow(!show);
  };

  const removeBlog = async () => {
    try {
      dispatch(clearBlog(props.blog.id));

      dispatch(removeBlogMessage(props.blog));

      setTimeout(() => {
        dispatch(clearMessage());
      }, 5000);
    } catch (error) {
      dispatch(errorMessage(error.message));
      setTimeout(() => {
        dispatch(clearMessage());
      }, 5000);
    }
  };

  return (
    <StyledDiv className="blog">
      <div id={props.id}>
        <Link to={`/blogs/${props.id}`}>{props.blog.title}</Link>{" "}
        <strong>{props.blog.author}</strong>
      </div>
    </StyledDiv>
  );
};

export default Blog;

const StyledButton = styled.button`
  font-size: 0.9rem;
  border-radius: 5px;
  &:hover {
    background-color: darkgray;
  }
  &:active {
    background-color: #004085;
    color: white;
    transform: translateY(1px);
  }
`;
const RemoveButton = styled.button`
  font-size: 0.9rem;
  background-color: cyan;
  border-radius: 5px;
  &:hover {
    background-color: blue;
    color: white;
  }
  &:active {
    background-color: #004085;
    color: white;
    transform: translateY(1px);
  }
`;
const StyledDiv = styled.div`
  font-size: 1.5rem;
  border-style: solid;
  padding: 5px;
  margin: 10px;
`;
