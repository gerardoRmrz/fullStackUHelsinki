import styled from "styled-components"
import loginService from '../services/login'

const loginForm = ({ username, password, setUserName, setPassword, setUser }) => {

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      setUser(user)
      setUserName('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
    }
    
  }

  return (
    <>
    <h1>log in to application</h1>
    <StyledForm onSubmit={ e=> handleLogin(e, setUserName, setPassword, setUser) }>
      <label htmlFor='username'>username</label>
      <StyledInput 
          type='text'
          id='username'  
          value={username} 
          onChange={({target}) => setUserName(target.value)}
      ></StyledInput>
      <label htmlFor="password">password</label>
      <StyledInput 
          type='password'
          id='password'
          value={password}
          onChange={({target}) => setPassword(target.value)}
      ></StyledInput>
      <StyledButton type='submit'>login</StyledButton>
    </StyledForm>
    </>
  )
}

export default loginForm

const StyledForm = styled.form`
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  width: 35vh;
  margin-bottom: 35px
`
const StyledInput = styled.input`
  font-size: 1.5rem;
  margin: 15px;
`

const StyledButton = styled.button`
  font-size: 1.5rem;
`
