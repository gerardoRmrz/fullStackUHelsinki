import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  StyledH1,
  StyledTd,
  StyledTh,
  StyledTr,
  StyledTable,
} from "../styles/headersStyles";

const Users = () => {
  const usersList = useSelector((state) => state.usersList);
  const blogList = useSelector((state) => state.blogs);

  const padding = {
    padding: 5,
  };

  const countBlogPerUser = () => {
    const result = [];
    for (const user of usersList) {
      const blogUser = blogList.filter((blog) => blog.userId.id == user.id);
      result.push([user, blogUser]);
    }
    return (
      <>
        <StyledH1>Users</StyledH1>
        <StyledTable style={{ textAlign: "left" }}>
          <thead>
            <tr>
              <StyledTh scope="col"></StyledTh>
              <StyledTh scope="col">blogs created</StyledTh>
            </tr>
          </thead>
          <tbody>
            {result.map((item, index) => (
              <StyledTr key={index}>
                <StyledTd>
                  <Link style={padding} to={`/users/${item[0].id}`}>
                    {item[0].name}
                  </Link>
                </StyledTd>
                <StyledTd>{item[1].length}</StyledTd>
              </StyledTr>
            ))}
          </tbody>
        </StyledTable>
      </>
    );
  };

  return <>{usersList ? countBlogPerUser() : null}</>;
};

export default Users;
