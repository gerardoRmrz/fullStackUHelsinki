import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Users = () => {
  const dispatch = useDispatch();

  const usersList = useSelector((state) => state.usersList);
  const blogList = useSelector((state) => state.blogs);

  const countBlogPerUser = () => {
    const result = [];
    for (const user of usersList) {
      const blogUser = blogList.filter((blog) => blog.userId.id == user.id);
      result.push([user, blogUser]);
    }
    return (
      <table style={{ textAlign: "left" }}>
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">blogs created</th>
          </tr>
        </thead>
        <tbody>
          {result.map((item, index) => (
            <tr key={index}>
              <td>
                <Link style={padding} to={`/users/${item[0].id}`}>
                  {item[0].name}
                </Link>
              </td>
              <td>{item[1].length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const padding = {
    padding: 5,
  };

  return (
    <>
      <h2>Users</h2>
      {usersList ? countBlogPerUser() : null}
    </>
  );
};

export default Users;
