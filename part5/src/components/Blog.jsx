import styled from 'styled-components'

const Blog = ({ blog }) => (
  <StyledDiv>
    {blog.title} {blog.author}
  </StyledDiv>  
)

export default Blog

const StyledDiv = styled.div`
  font-size: 1.5rem;
`