import styled from "styled-components";
import Blog from "./Blog";

const BlogList = (props) => {
  return (
    <StyledDiv>            
      {
        props
          .blogs
          .map( blog => <Blog 
              key={blog.id} 
              blog={blog} 
              setNotificationMessage={props.setNotificationMessage}
              setBlogs={props.setBlogs}
              /> )
      }
    </StyledDiv>
  )
}

export default BlogList

const StyledDiv= styled.div`
  margin-top: 25px;
`