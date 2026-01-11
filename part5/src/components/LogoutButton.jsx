import styled from "styled-components";

const LogoutButton = ({ setUser }) => {

  const logOutHandle = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  return (
    <>
      <StyledButton type="button" onClick={logOutHandle}>logout</StyledButton>
    </>
  )
}

export default LogoutButton

const StyledButton = styled.button`
  font-size: 1.5rem;
  margin-left: 10px;
  width: 100px;  
`