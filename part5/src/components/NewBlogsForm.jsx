import styled from "styled-components"
import services from "../services/blogs"

const NewBlogsForm = ({newBlog, setNewBlog}) => {
  
  const handleSubmit = (event) => {
    event.preventDefault()
    services.create(newBlog)
    setNewBlog( {title:'', author:'', url:''} )
  }

  return (
    <>
      <h1>create new</h1>
      <StyledBlogsForm onSubmit={handleSubmit}>
        <label htmlFor="blog-title">title:</label>
        <StyledInput id="blog-title"
          type="text"
          value={newBlog.title} 
          onChange={ ({target}) => setNewBlog( prevBlog => ({...prevBlog, title: target.value}) )  }>
        </StyledInput>  
        <label htmlFor="blog-author">author:</label>
        <StyledInput id="blog-author" 
          type="text" 
          value={newBlog.author} 
          onChange={ ({target}) => setNewBlog( prevBlog => ({ ...prevBlog, author: target.value }) ) }
          ></StyledInput>  
        <label htmlFor="blog-url">url:</label>
        <StyledInput id="blog-url" 
          type="text" 
          value={newBlog.url} 
          onChange={ ({target}) => setNewBlog( prevBlog => ({ ...prevBlog, url: target.value}) ) }
          ></StyledInput>
        <StyledButton type="submit">create</StyledButton>  
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
`

