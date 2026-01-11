import Blog from "./Blog";
import NewBlogsForm from './NewBlogsForm'
import LogoutButton from './LogoutButton'
import styled from "styled-components";

const BlogList = ({ blogs, user, setUser, newBlog, setNewBlog }) => {
  
  return (
    <>
    <h1>blogs</h1>
      <StyledP>{user.name} logged in <LogoutButton setUser={setUser}>logout</LogoutButton></StyledP>
      <NewBlogsForm newBlog={newBlog} setNewBlog={setNewBlog}></NewBlogsForm>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )
}

export default BlogList

const StyledP = styled.p`
  font-size: 1.5rem;
`