import { useState } from "react";
import services from "../services/blogs";
import blogService from "../services/blogs";

import { useDispatch } from "react-redux";

const NewBlogsForm = (props) => {
  const dispatch = useDispatch();

  const [createIsHovered, setCreateIsHovered] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await services.create(props.newBlog);

      dispatch({
        type: "SET_NOTIFICATION",
        payload: {
          text: `a new ${props.newBlog.title} by ${props.newBlog.author} added`,
          color: "green",
        },
      });

      const newblogslist = await blogService.getAll();
      props.setBlogs(newblogslist);

      setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" });
      }, 5000);

      props.setNewBlog({ title: "", author: "", url: "" });
      props.setVisible(false);
    } catch (error) {
      dispatch({
        type: "SET_NOTIFICATION",
        payload: { text: error.message, color: "red" },
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" });
      }, 5000);
      props.setNewBlog({ title: "", author: "", url: "" });
    }
  };

  const formStyle = {
    fontSize: "1.5rem",
    display: "flex",
    flexDirection: "column",
    width: "35vh",
    marginBottom: "35px",
  };

  const inputStyle = {
    fontSize: "1.5rem",
    margin: "15px",
  };

  const buttonStyle = {
    fontSize: "1.5rem",
    marginLeft: "10px",
    width: "100px",
  };

  const hoverStyle = {
    backgroundColor: "darkgray",
  };

  if (!props.handleSubmit) {
    props = { handleSubmit, ...props };
  }

  return (
    <>
      <h2>Create a new blog</h2>
      <form onSubmit={props.handleSubmit} style={formStyle} id="newBlogForm">
        <label htmlFor="blog-title">title:</label>
        <input
          id="blog-title"
          data-testid="blog-title"
          style={inputStyle}
          type="text"
          value={props.newBlog.title}
          onChange={({ target }) =>
            props.setNewBlog((prevBlog) => ({
              ...prevBlog,
              title: target.value,
            }))
          }
        ></input>
        <label htmlFor="blog-author">author:</label>
        <input
          style={inputStyle}
          id="blog-author"
          data-testid="blog-author"
          type="text"
          value={props.newBlog.author}
          onChange={({ target }) =>
            props.setNewBlog((prevBlog) => ({
              ...prevBlog,
              author: target.value,
            }))
          }
        ></input>
        <label htmlFor="blog-url">url:</label>
        <input
          id="blog-url"
          data-testid="blog-url"
          style={inputStyle}
          type="text"
          value={props.newBlog.url}
          onChange={({ target }) =>
            props.setNewBlog((prevBlog) => ({ ...prevBlog, url: target.value }))
          }
        ></input>
        <button
          type="submit"
          style={
            createIsHovered ? { ...buttonStyle, ...hoverStyle } : buttonStyle
          }
          onMouseEnter={() => setCreateIsHovered(true)}
          onMouseLeave={() => setCreateIsHovered(false)}
          id="newBlogSubmitButton"
          data-testid="newBlogSubmitButton"
        >
          create
        </button>
      </form>
    </>
  );
};

export default NewBlogsForm;
