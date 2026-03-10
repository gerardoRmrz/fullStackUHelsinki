import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    createBlog(state, action) {
      return state.concat(action.payload);
    },
  },
});

const { setBlogs, createBlog } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogList = await blogService.getAll();
    dispatch(setBlogs(blogList.data));
  };
};

export const appendBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content);
    dispatch(createBlog(newBlog));
    const blogList = await blogService.getAll();
    dispatch(setBlogs(blogList.data));
  };
};

export const clearBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id);
    const blogList = await blogService.getAll();
    dispatch(setBlogs(blogList.data));
  };
};

export const voteBlog = (updatedBlog) => {
  return async (dispatch) => {
    await blogService.put(updatedBlog);
    const blogList = await blogService.getAll();
    dispatch(setBlogs(blogList.data));
  };
};

export const addCommentBlog = (blogToBeUpdated, newComment) => {
  return async (dispatch) => {
    const comments = blogToBeUpdated.comments.concat(newComment);
    const newBlog = { ...blogToBeUpdated, comments };
    await blogService.put(newBlog);
    const blogList = await blogService.getAll();
    dispatch(setBlogs(blogList.data));
  };
};

export default blogSlice.reducer;
