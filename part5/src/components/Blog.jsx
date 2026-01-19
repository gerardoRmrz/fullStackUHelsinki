import { useState } from 'react'
import styled from 'styled-components'
import services from '../services/blogs'

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

      props.setNotificationMessage( { text:'blog successfully updated', color: 'green' } )

      setTimeout( () => {
        props.setNotificationMessage( { text:'', color:'' } )
      }, 5000 )

      props.setBlogs( updatedBlogList )

    } catch (error) {
      props.setNotificationMessage( { text:error.message, color: 'red' } )
      setTimeout( () => {
        props.setNotificationMessage( { text:'', color:'' } )
      }, 5000 )
    }
  }

  const viewButton = () => (
    <StyledButton type='button' onClick={showDetailsHandler}>view</StyledButton>
  )

  const hideButton = () => (
    <StyledButton type='button' onClick={showDetailsHandler}>hide</StyledButton>
  )

  const removeBlog = async () => {

    try{

      await services.remove(props.blog.id)

      const updatedBlogList = await services.getAll()

      props.setNotificationMessage( { text: `blog ${props.blog.title} ${props.blog.author} successfully removed`, color: 'green' } )

      setTimeout( () => {
        props.setNotificationMessage( { text:'', color:'' } )
      }, 5000 )

      props.setBlogs( updatedBlogList )

    } catch (error){
      props.setNotificationMessage( { text: error.message, color: 'green' } )
      setTimeout( () => {
        props.setNotificationMessage( { text:'', color:'' } )
      }, 5000 )
    }
  }

  const details = () => (
    <div>
      <p>{props.blog.url}</p>
      <p>{props.blog.likes} <StyledButton type='button' onClick={likesHandler}>like</StyledButton></p>
      <p>{props.blog.userId?.name} </p>
      {props.user?.name.toLowerCase()===props.blog.userId?.name.toLowerCase()
        ? <RemoveButton type="button" onClick={removeBlog}>remove</RemoveButton>
        : null}
    </div>
  )

  return (
    <StyledDiv className='blog'>
      <div>
        {props.blog.title} {props.blog.author} {!show? viewButton(): hideButton()}
      </div>
      {show? details(): null}
    </StyledDiv>
  )}

export default Blog

const StyledButton = styled.button`
  font-size: 0.9rem;
  border-radius: 5px;
  &:hover {
    background-color: darkgray;
  }
  &:active {
    background-color: #004085;
    color:white;
    transform: translateY(1px);
  }
`
const RemoveButton = styled.button`
  font-size: 0.9rem;
  background-color: cyan;
  border-radius: 5px;
  &:hover {
    background-color: blue;
    color: white;
  }
  &:active {
    background-color: #004085;
    color:white; 
    transform: translateY(1px); 
  }
`
const StyledDiv = styled.div`
  font-size: 1.5rem;
  border-style: solid;
  padding: 5px;
  margin: 10px;
`