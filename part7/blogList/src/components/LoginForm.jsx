import styled from "styled-components";
import { useDispatch } from "react-redux";

import { errorMessage, clearMessage } from "../reducers/notificationReducer";
import { loginUser } from "../reducers/userReducer";

import { StyledH1, StyledInput, StyledLabel } from "../styles/headersStyles";
import { StyledButton } from "../styles/buttonStyles";

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
      <StyledH1>Login</StyledH1>
      <form id="loginform" onSubmit={(e) => handleLogin(e)} style={styledForm}>
        <StyledLabel htmlFor="username">username</StyledLabel>
        <StyledInput
          type="text"
          id="username"
          data-testid="username"
          value={username}
          onChange={({ target }) => setUserName(target.value)}
          name="username"
          style={styledInput}
        ></StyledInput>
        <StyledLabel htmlFor="password">password</StyledLabel>
        <StyledInput
          type="password"
          id="password"
          data-testid="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          style={styledInput}
        ></StyledInput>
        <StyledButton type="submit">login</StyledButton>
      </form>
    </>
  );
};

export default LoginForm;
