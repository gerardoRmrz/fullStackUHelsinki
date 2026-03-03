import styled from "styled-components";
import services from "../services/blogs";
import Blog from "./Blog";

import { useDispatch, useSelector } from "react-redux";

import {
  errorMessage,
  clearMessage,
  updateMessage,
} from "../reducers/notificationReducer";

import { voteBlog } from "../reducers/blogsReducer";

const BlogList = (props) => {
  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.blogs);

  const likesHandler = async (blog) => {
    try {
      const updatedBlog = { ...blog };

      updatedBlog.likes += 1;

      dispatch(voteBlog(updatedBlog));
      dispatch(updateMessage());

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
    <StyledDiv>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            id={blog.id}
            blog={blog}
            setBlogs={props.setBlogs}
            user={props.user}
            likesHandler={likesHandler}
          />
        ))}
    </StyledDiv>
  );
};

export default BlogList;

const StyledDiv = styled.div`
  margin-top: 25px;
`;
