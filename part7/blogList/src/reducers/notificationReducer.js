const notificationReducer = (state = null, action) => {
  //console.log("notificationReducer: ", action);

  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.payload;
    case "CLEAR_NOTIFICATION":
      return null;
    default:
      return state;
  }
};

export const newBlogMessage = (newBlog) => {
  return {
    type: "SET_NOTIFICATION",
    payload: {
      text: `a new ${newBlog.title} by ${newBlog.author} added`,
      color: "green",
    },
  };
};

export const updateMessage = () => {
  return {
    type: "SET_NOTIFICATION",
    payload: {
      text: "blog successfully updated",
      color: "green",
    },
  };
};

export const removeBlogMessage = (blog) => {
  return {
    type: "SET_NOTIFICATION",
    payload: {
      text: `blog ${blog.title} ${blog.author} successfully removed`,
      color: "green",
    },
  };
};

export const errorMessage = (message) => {
  return {
    type: "SET_NOTIFICATION",
    payload: { text: message, color: "red" },
  };
};

export const clearMessage = () => {
  return { type: "CLEAR_NOTIFICATION" };
};

export default notificationReducer;
