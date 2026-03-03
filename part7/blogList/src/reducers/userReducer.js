import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";

const userSlice = createSlice({
  name: "users",
  initialState: "",
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

const { setUser } = userSlice.actions;

export const getUserInfo = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      dispatch(setUser(user));
    } else {
      dispatch(setUser(null));
    }
  };
};

export const loginUser = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({
      username,
      password,
    });

    window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

    blogService.setToken(user.token);

    dispatch(setUser(user));
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch(setUser(null));
    window.localStorage.removeItem("loggedBlogappUser");
  };
};

export default userSlice.reducer;
