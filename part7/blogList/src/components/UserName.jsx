import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/userReducer";

import styled from "styled-components";

const UserName = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  return (
    <StyledP>
      {user?.name} logged in{" "}
      <LogoutButton type="button" onClick={() => dispatch(logout())}>
        logout
      </LogoutButton>
    </StyledP>
  );
};

export default UserName;

const StyledP = styled.p`
  font-size: 1.5rem;
`;
const LogoutButton = styled.button`
  font-size: 1.5rem;
  &:hover {
    background-color: darkgray;
  }
  &:active {
    background-color: #004085; /* Even darker when clicked */
    transform: translateY(1px); /* Simple press effect */
  }
`;
