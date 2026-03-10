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

import { StyledButton } from "../styles/buttonStyles";
import {
  StyledH2,
  StyledH3,
  StyledInput,
  StyledComments,
  StyledP,
  StyledA,
} from "../styles/headersStyles";

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
          <StyledComments key={index}>{comment}</StyledComments>
        ))}
      </ul>
    );
  };

  const commentInput = () => {
    const handleClick = (event) => {
      event.preventDefault();
      const newComment = event.target.comment.value;
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
        <StyledInput type="text" name="comment"></StyledInput>
        <StyledButton type="submit">add comments</StyledButton>
      </form>
    );
  };

  return (
    <>
      <StyledH2>
        {blog.title} by {blog.author}
      </StyledH2>
      <StyledA href={blog.url}>{blog.url}</StyledA>
      <StyledP>
        {blog.likes} likes {"   "}
        <StyledButton type="button" onClick={() => likesHandler(blog)}>
          like
        </StyledButton>
      </StyledP>
      <StyledP>added by {blogOwner.name}</StyledP>
      <StyledH3>comments</StyledH3>
      {commentInput()}
      {commentsList()}
    </>
  );
};

export default BlogById;
