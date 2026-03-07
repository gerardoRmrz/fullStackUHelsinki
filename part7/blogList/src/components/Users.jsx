import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersList } from "../reducers/usersListReducer";
const Users = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersList());
  }, []);

  const usersList = useSelector((state) => state.usersList);
  const blogList = useSelector((state) => state.blogs);

  const countBlogPerUser = () => {
    const result = [];
    for (const user of usersList) {
      const blogUser = blogList.filter((blog) => blog.userId.id == user.id);
      result.push([user.name, blogUser.length]);
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
              <td>{item[0]}</td>
              <td>{item[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <>
      <h2>Users</h2>
      {usersList ? countBlogPerUser() : null}
    </>
  );
};

export default Users;
