import { createSlice } from "@reduxjs/toolkit";

const userListSlice = createSlice({
  name: "usersList",
  initialState: null,
  reducers: {
    getUsers(state, action) {
      return action.payload;
    },
  },
});

const { getUsers } = userListSlice.actions;

export const getUsersList = () => {
  return async (dispatch) => {
    const response = await fetch("http://localhost:3001/api/users");
    if (!response.ok) {
      throw new Error(`HTTP error: Status ${response.status}`);
    }
    const data = await response.json();
    dispatch(getUsers(data));
  };
};

export default userListSlice.reducer;
