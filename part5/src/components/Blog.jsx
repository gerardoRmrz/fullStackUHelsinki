import styled from 'styled-components'
import services from '../services/blogs'

import { useState } from 'react'

const Blog = (props) => {

  const [show, setShow] = useState(false)

  const showDetailsHandler = () => {
    setShow( !show )
  }

  const likesHandler = async () => {
    try{
      const updatedBlog = { ...props.blog }

      updatedBlog.likes += 1

      await services.put(updatedBlog)

      const updatedBlogList = await services.getAll()

      props.setNotificationMessage( {text:'blog successfully updated', color: 'green'} )
      
      setTimeout( ()=>{
          props.setNotificationMessage( {text:'', color:''} )
        }, 5000 )

      console.log(updatedBlogList)

      props.setBlogs( updatedBlogList )      

    } catch (error) {
        props.setNotificationMessage( {text:error.message, color: 'red'} )
        setTimeout( ()=>{
          props.setNotificationMessage( {text:'', color:''} )
        }, 5000 )
      
    }
    

  }


  const viewButton = () => (
    <StyledButton type='button' onClick={showDetailsHandler}>view</StyledButton>
  )
  
  const hideButton = () => (
    <StyledButton type='button' onClick={showDetailsHandler}>hide</StyledButton>
  )



  const details = () => (
    <>
      <p>{props.blog.url}</p>
      <p>{props.blog.likes} <StyledButton type='button' onClick={likesHandler}>like</StyledButton></p>
      <p>{props.blog.userId.name} </p>
    </>
  )

  return (
  <StyledDiv>
    <div>
      {props.blog.title} {props.blog.author} {!show? viewButton(): hideButton()}
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