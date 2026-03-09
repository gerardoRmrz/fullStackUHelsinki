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

import { StyledBlogDiv } from "../styles/headersStyles";

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
    <StyledBlogDiv className="blog">
      <div id={props.id}>
        <Link to={`/blogs/${props.id}`}>{props.blog.title}</Link>{" "}
        <strong>{props.blog.author}</strong>
      </div>
    </StyledBlogDiv>
  );
};

export default Blog;
