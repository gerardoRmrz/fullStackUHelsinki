import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/userReducer";
import { useNavigate } from "react-router-dom";

import Notification from "./Notification";

import { StyledButton } from "../styles/buttonStyles";
import { StyledPNav } from "../styles/headersStyles";
import { linkStyle } from "../styles/darkMode";

const NavBar = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const handleLogOut = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <StyledPNav>
        <Link style={linkStyle} to={"/blogs"}>
          blogs
        </Link>{" "}
        <Link style={linkStyle} to={"/users"}>
          users
        </Link>{" "}
        <strong>{user?.name} </strong> logged in <br></br>
        <StyledButton type="button" onClick={handleLogOut}>
          logout
        </StyledButton>
      </StyledPNav>
      <Notification />
    </>
  );
};

export default NavBar;
