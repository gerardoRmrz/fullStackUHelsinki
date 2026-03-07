import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  errorMessage,
  clearMessage,
  updateMessage,
} from "../reducers/notificationReducer";

import { voteBlog } from "../reducers/blogsReducer";

const BlogById = () => {
  const dispatch = useDispatch();
  const id = useParams().id;
  const blogsList = useSelector((state) => state.blogs);
  const usersList = useSelector((state) => state.usersList);
  const blog = blogsList.find((blog) => blog.id === id);

  if (!blog) {
    return null;
  }

  const blogOwner = usersList.find((user) => user.id === blog.userId.id);
  const likesHandler = async (blog) => {
    try {
      const updatedBlog = { ...blog };

      updatedBlog.likes += 1;

      dispatch(voteBlog(updatedBlog));
      dispatch(updateMessage(updatedBlog.title));

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

  const commentsList = () => {
    return (
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes {"   "}
        <StyledButton type="button" onClick={() => likesHandler(blog)}>
          like
        </StyledButton>
      </p>
      <p>added by {blogOwner.name}</p>
      <h3>comments</h3>
      {commentsList()}
    </>
  );
};

export default BlogById;

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
