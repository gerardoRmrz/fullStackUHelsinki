import styled from "styled-components";
import services from "../services/blogs";
import Blog from "./Blog";

import { useDispatch } from "react-redux";
import notificationReducer from "../reducers/notificationReducer";

const BlogList = (props) => {
  const dispatch = useDispatch();

  const likesHandler = async (blog) => {
    try {
      const updatedBlog = { ...blog };

      updatedBlog.likes += 1;

      await services.put(updatedBlog);

      const updatedBlogList = await services.getAll();

      dispatch({
        type: "SET_NOTIFICATION",
        payload: {
          text: "blog successfully updated",
          color: "green",
        },
      });

      setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" });
      }, 5000);

      props.setBlogs(updatedBlogList);
    } catch (error) {
      dispatch({
        type: "SET_NOTIFICATION",
        payload: { text: error.message, color: "red" },
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" });
      }, 5000);
    }
  };

  return (
    <StyledDiv>
      {props.blogs
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
