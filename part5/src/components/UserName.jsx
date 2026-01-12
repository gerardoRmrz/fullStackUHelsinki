import styled from "styled-components"

const UserName = ({user, setUser})=>{

  return (
    <StyledP>
      {user?.name} logged in <LogoutButton type='button' onClick={ ()=>setUser(null) }>logout</LogoutButton>
    </StyledP>
  )}

export default UserName

const StyledP = styled.p`
  font-size: 1.5rem;
`
const LogoutButton = styled.button`
  font-size: 1.5rem;
`