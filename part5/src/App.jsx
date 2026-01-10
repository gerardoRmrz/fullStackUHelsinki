import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)



  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const loginForm = () => (
      <LoginForm
        username={username}
        password={password}
        setUserName={setUserName}
        setPassword={setPassword}
        setUser={setUser} >
      </LoginForm>
  )

  const blogsList = () => (
      <>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </>
  )

  return (
    <div>
      {user === null && loginForm() }
      {user !== null && blogsList() }
    </div>
  )
}

export default App