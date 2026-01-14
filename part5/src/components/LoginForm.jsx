import styled from 'styled-components'
import loginService from '../services/login'
import blogServices from '../services/blogs'
import Notification from './Notification'

const loginForm = ({
  username,
  password,
  setUserName,
  setPassword,
  setUser,
  notificationMessage,
  setNotificationMessage
}) => {

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogServices.setToken(user.token)

      setUser(user)
      setUserName('')
      setPassword('')

    } catch (error) {
      setNotificationMessage( { text:error.message, color: 'red' } )
      setTimeout( () => {
        setNotificationMessage( { text: '', color: '' } )
      }, 5000 )
    }

  }

  return (
    <>
      <StyledH2>Login</StyledH2>
      <Notification message={notificationMessage}>{notificationMessage}</Notification>
      <StyledForm onSubmit={ e => handleLogin(e, setUserName, setPassword, setUser) }>
        <label htmlFor='username'>username</label>
        <StyledInput
          type='text'
          id='username'
          value={username}
          onChange={({ target }) => setUserName(target.value)}
          name='username'
        ></StyledInput>
        <label htmlFor='password'>password</label>
        <StyledInput
          type='password'
          id='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
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
  &:hover {
    background-color: darkgray;
  }
  &:active {
    background-color: #004085; /* Even darker when clicked */
    transform: translateY(1px); /* Simple press effect */
  }
`
const StyledH2 = styled.h2`
  font-size: 2.5rem;
  color: black;
`
