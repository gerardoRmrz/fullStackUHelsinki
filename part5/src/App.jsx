import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import BlogList from './components/BlogList'
import styled from 'styled-components'
import Notification from './components/Notification'
import NewBlogsForm from './components/NewBlogsForm'
import UserName from './components/UserName'
import Toggable from './components/Toggable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState( { text:'', color:'' } )
  const [newBlog, setNewBlog] = useState({ title:'', author:'', url:'' })


  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs( blogs )}
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const userName = () => (
    <UserName user={user} setUser={setUser}/>
  )

  const loginForm = () => (
    <Toggable
      buttonLabel='login'
      username={username}
      password={password}
      setUserName={setUserName}
      setPassword={setPassword}
      setUser={setUser}
      notificationMessage={notificationMessage}
      setNotificationMessage={setNotificationMessage}
    >
      <LoginForm/>
    </Toggable>
  )

  const newBlogsForm = () => (
    <Toggable
      buttonLabel='create a new blog'
      setBlogs={setBlogs}
      newBlog={newBlog}
      setNewBlog={setNewBlog}
      setNotificationMessage={setNotificationMessage}
    >
      <NewBlogsForm/>
    </Toggable>
  )

  const blogsList = () => {
    return (
      <>
        <BlogList
          blogs={blogs}
          setNotificationMessage={setNotificationMessage}
          setBlogs={setBlogs}
          user={user}>
        </BlogList>
      </>
    )}

  return (
    <div>
      <StyledH1>Blogs</StyledH1>
      <Notification message={notificationMessage} />
      {user === null && loginForm() }
      {user !== null && userName() }
      {user !== null && newBlogsForm()}
      {user !== null && blogsList() }
    </div>
  )
}

export default App

const StyledH1 = styled.h1`
  font-size: 3.0rem;
  color: green;
`
const StyledButton = styled.button`
  font-size: 1.5rem;
`