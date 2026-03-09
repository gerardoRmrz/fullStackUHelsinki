import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { StyledUserLi, StyledH2, StyledH3 } from "../styles/headersStyles";

const UserById = () => {
  const id = useParams().id;
  const usersList = useSelector((state) => state.usersList);
  const blogList = useSelector((state) => state.blogs);
  const userInfo = usersList ? usersList.find((user) => user.id === id) : null;
  const blogUser = blogList.filter((blog) => blog.userId.id == id);

  const userBlogList = () => {
    return (
      <ul>
        {blogUser.map((blog, index) => (
          <StyledUserLi key={index}> {blog.title}</StyledUserLi>
        ))}
      </ul>
    );
  };

  return (
    <>
      <StyledH2>{userInfo?.name}</StyledH2>
      <StyledH3>added blogs</StyledH3>
      {userBlogList()}
    </>
  );
};

export default UserById;
