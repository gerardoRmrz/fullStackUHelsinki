import styled from "styled-components";
import Blog from "./Blog";
import NewBlogsForm from './NewBlogsForm'
import LogoutButton from './LogoutButton'
import Notification from './Notification'


const BlogList = ({ blogs, user, setUser, newBlog, setNewBlog, notificationMessage, setNotificationMessage }) => {
  
  return (
    <>
    <h1>blogs</h1>
      <StyledP>
        {user.name} logged in <LogoutButton setUser={setUser}>logout</LogoutButton>
      </StyledP>
      <Notification message={notificationMessage}>{notificationMessage}</Notification>
      
      <NewBlogsForm newBlog={newBlog} setNewBlog={setNewBlog} setNotificationMessage={setNotificationMessage}/>
      {
        blogs.map( blog => <Blog key={blog.id} blog={blog} /> )
      }
    </>
  )
}

export default BlogList

const StyledP = styled.p`
  font-size: 1.5rem;
`