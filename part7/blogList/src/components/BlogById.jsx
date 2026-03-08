import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  commentMessage,
  updateMessage,
  clearMessage,
  errorMessage,
} from "../reducers/notificationReducer";

import { addCommentBlog } from "../reducers/blogsReducer";

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

  const commentInput = () => {
    const handleClick = (event) => {
      event.preventDefault();
      const newComment = event.target.comment.value;
      console.log("Click comment button", newComment);
      try {
        dispatch(addCommentBlog(blog, newComment));
        dispatch(commentMessage(newComment));
        setTimeout(() => {
          dispatch(clearMessage());
        }, 5000);
      } catch (error) {
        dispatch(errorMessage(error.message));
        setTimeout(() => {
          dispatch(clearMessage());
        }, 5000);
      }
      event.target.comment.value = "";
    };
    return (
      <form onSubmit={(event) => handleClick(event)}>
        <input type="text" name="comment"></input>
        <button type="submit">add comments</button>
      </form>
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
      {commentInput()}
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
