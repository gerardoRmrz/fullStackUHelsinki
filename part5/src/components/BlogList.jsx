import styled from "styled-components";
import Blog from "./Blog";

const BlogList = ({blogs}) => {
  //console.log(blogs)
  return (
    <StyledDiv>            
      {
        blogs.map( blog => <Blog key={blog.id} blog={blog} /> )
      }
    </StyledDiv>
  )
}

export default BlogList

const StyledDiv= styled.div`
  margin-top: 25px;
`