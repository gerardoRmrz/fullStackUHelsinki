import styled from 'styled-components'
import services from '../services/blogs'
import blogService from '../services/blogs'

const NewBlogsForm = (props) => {

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await services
        .create(props.newBlog)

      props.setNotificationMessage( { text: `a new ${props.newBlog.title} by ${props.newBlog.author} added`, color:'green' } )

      const newblogslist = await blogService.getAll()
      props.setBlogs(newblogslist)

      setTimeout( () => {
        props.setNotificationMessage( { text:'', color:'' } )
      }, 5000 )

      props.setNewBlog( { title:'', author:'', url:'' } )
      props.setVisible(false)

    } catch (error) {
      props.setNotificationMessage( { text:error.message, color: 'red' } )
      setTimeout( () => {
        props.setNotificationMessage( { text:'', color:'' } )
      }, 5000 )
      props.setNewBlog( { title:'', author: '', url:'' } )
    }
  }

  return (
    <>
      <h2>Create a new note</h2>
      <StyledBlogsForm onSubmit={handleSubmit}>
        <label htmlFor='blog-title'>title:</label>
        <StyledInput id='blog-title'
          type='text'
          value={props.newBlog.title}
          onChange={ ({ target }) => props.setNewBlog( prevBlog => ({ ...prevBlog, title: target.value }) )  }>
        </StyledInput>
        <label htmlFor='blog-author'>author:</label>
        <StyledInput id='blog-author'
          type='text'
          value={props.newBlog.author}
          onChange={ ({ target }) => props.setNewBlog( prevBlog => ({ ...prevBlog, author: target.value }) ) }
        ></StyledInput>
        <label htmlFor='blog-url'>url:</label>
        <StyledInput id='blog-url'
          type='text'
          value={props.newBlog.url}
          onChange={ ({ target }) => props.setNewBlog( prevBlog => ({ ...prevBlog, url: target.value }) ) }
        ></StyledInput>
        <StyledButton type='submit'>create</StyledButton>
      </StyledBlogsForm>
    </>
  )
}

export default NewBlogsForm

const StyledBlogsForm = styled.form`
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  width: 35vh;
  margin-bottom: 35px
`
const StyledInput = styled.input`
  font-size: 1.5rem;
  margin: 15px;
`

const StyledButton = styled.button`
  font-size: 1.5rem;
  margin-left: 10px;
  width: 100px;
  &:hover {
    background-color: darkgray;
  }
  &:active {
    background-color: #004085; 
    color:white;
    transform: translateY(1px); 
  }
`

