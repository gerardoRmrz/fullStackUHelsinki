import styled from 'styled-components'
import { useState } from 'react'

const Blog = ({ blog }) => {

  const [show, setShow] = useState(false)

  const showDetails = () => {
    setShow( !show )
  }

  const viewButton = () => (
    <StyledButton type='button' onClick={showDetails}>view</StyledButton>
  )
  
  const hideButton = () => (
    <StyledButton type='button' onClick={showDetails}>hide</StyledButton>
  )


  const details = () => (
    <>
      <p>{blog.url}</p>
      <p>{blog.likes} <StyledButton type='button'>like</StyledButton></p>
      <p>{blog.userId.name} </p>
    </>
  )

  return (
  <StyledDiv>
    <div>
      {blog.title} {blog.author} {!show? viewButton(): hideButton()}
    </div>
    {show? details(): null}
  </StyledDiv>  
)}

export default Blog

const StyledButton = styled.button`
  font-size: 0.9rem;
`

const StyledDiv = styled.div`
  font-size: 1.5rem;
  border-style: solid;
  padding: 5px;
  margin: 10px;
`