import { useState } from 'react'
import styled from 'styled-components'
import services from '../services/blogs'

const Blog = (props) => {

  const [show, setShow] = useState(false)

  const showDetailsHandler = () => {
    setShow( !show )
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

  const details = (id) => (
    <div className='detailsContent'>
      <p>{props.blog.url}</p>
      <p className='likesNum' data-testId={`likesNum-${id}`}>{props.blog.likes} <StyledButton type='button' data-testId={`like-${id}`} onClick={() => props.likesHandler(props.blog) }>like</StyledButton></p>
      <p>{props.blog.userId?.name} </p>
      {props.user?.name.toLowerCase()===props.blog.userId?.name.toLowerCase()
        ? <RemoveButton type="button" onClick={removeBlog} id='removeButton'>remove</RemoveButton>
        : null}
    </div>
  )

  return (
    <StyledDiv className='blog'>
      <div id={props.id}>
        {props.blog.title} {props.blog.author} {!show? viewButton(): hideButton()}
      </div>
      {show? details(props.id): null}
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