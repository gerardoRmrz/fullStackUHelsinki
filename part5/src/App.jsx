import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import BlogList from './components/BlogList'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState({text:'', color:''})

  const [newBlog, setNewBlog] = useState({ title:'', author:'', url:'' })

  useEffect(() => {
    blogService.getAll().then(blogs =>{
      setBlogs( blogs )}
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const loginForm = () => (
      <LoginForm
        username={username}
        password={password}
        setUserName={setUserName}
        setPassword={setPassword}
        setUser={setUser}
        notificationMessage={notificationMessage}
        setNotificationMessage={setNotificationMessage}
        >
      </LoginForm>
  )

  const blogsList = () => {
    return (
      <>  
        <BlogList 
          blogs={blogs} 
          user={user} 
          setUser={setUser} 
          newBlog={newBlog} 
          setNewBlog={setNewBlog}
          notificationMessage={notificationMessage}
          setNotificationMessage={setNotificationMessage}
          >
        </BlogList>
      </>
  )}
  
  return (
    <div>
      {user === null && loginForm() }
      {user !== null && blogsList() }
    </div>
  )
}

export default App