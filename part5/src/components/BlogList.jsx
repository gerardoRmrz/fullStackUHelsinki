import Blog from "./Blog";
import LogoutButton from './LogoutButton'
import styled from "styled-components";

const BlogList = ({ blogs, user, setUser }) => {
  
  return (
    <>
    <h2>blogs</h2>
      <StyledP>{user.name} logged in <LogoutButton setUser={setUser}>logout</LogoutButton></StyledP>
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