import styled from 'styled-components'

const UserName = (props) => {

  return (
    <StyledP>
      {props.user?.name} logged in <LogoutButton
        type='button'
        onClick={ () => props.setUser(null) }
      >logout
      </LogoutButton>
    </StyledP>
  )}

export default UserName

const StyledP = styled.p`
  font-size: 1.5rem;
`
const LogoutButton = styled.button`
  font-size: 1.5rem;
  &:hover {
    background-color: darkgray;
  }
  &:active {
    background-color: #004085; /* Even darker when clicked */
    transform: translateY(1px); /* Simple press effect */
  }
`