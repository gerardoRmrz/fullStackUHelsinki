import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
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
          <li key={index}> {blog.title} </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <h2>{userInfo?.name}</h2>
      <h3>added blogs</h3>
      {userBlogList()}
    </>
  );
};

export default UserById;
