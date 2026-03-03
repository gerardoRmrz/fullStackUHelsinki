import styled from "styled-components";
import { useDispatch } from "react-redux";

import { errorMessage, clearMessage } from "../reducers/notificationReducer";
import { loginUser } from "../reducers/userReducer";

const LoginForm = ({ username, password, setUserName, setPassword }) => {
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      dispatch(loginUser(username, password));
      setUserName("");
      setPassword("");
    } catch (error) {
      dispatch(errorMessage(error.message));
      setTimeout(() => {
        dispatch(clearMessage());
      }, 5000);
    }
  };

  const styledInput = {
    fontSize: "1.5rem",
    margin: "15px",
  };

  const styledForm = {
    fontSize: "1.5rem",
    display: "flex",
    flexDirection: "column",
    width: "35vh",
    marginBottom: "35px",
  };
  return (
    <>
      <StyledH2>Login</StyledH2>
      <form id="loginform" onSubmit={(e) => handleLogin(e)} style={styledForm}>
        <label htmlFor="username">username</label>
        <input
          type="text"
          id="username"
          data-testid="username"
          value={username}
          onChange={({ target }) => setUserName(target.value)}
          name="username"
          style={styledInput}
        ></input>
        <label htmlFor="password">password</label>
        <input
          type="password"
          id="password"
          data-testid="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          style={styledInput}
        ></input>
        <StyledButton type="submit">login</StyledButton>
      </form>
    </>
  );
};

export default LoginForm;

/* const StyledForm = styled.form`
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  width: 35vh;
  margin-bottom: 35px;
`;
const StyledInput = styled.input`
  font-size: 1.5rem;
  margin: 15px;
`;
 */
const StyledButton = styled.button`
  font-size: 1.5rem;
  &:hover {
    background-color: darkgray;
  }
  &:active {
    background-color: #004085; /* Even darker when clicked */
    transform: translateY(1px); /* Simple press effect */
  }
`;
const StyledH2 = styled.h2`
  font-size: 2.5rem;
  color: black;
`;
