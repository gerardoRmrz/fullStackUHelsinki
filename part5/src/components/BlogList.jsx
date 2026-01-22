import styled from 'styled-components'
import services from '../services/blogs'
import Blog from './Blog'

const BlogList = (props) => {

  const likesHandler = async (blog) => {
    try{
      const updatedBlog = { ...blog }

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

  return (
    <StyledDiv>
      {
        props
          .blogs
          .sort( (a, b) => b.likes - a.likes  )
          .map(
            blog => <Blog
              key={blog.id}
              blog={blog}
              setNotificationMessage={props.setNotificationMessage}
              setBlogs={props.setBlogs}
              user={props.user}
              likesHandler = {likesHandler}
            /> )
      }
    </StyledDiv>
  )
}

export default BlogList

const StyledDiv= styled.div`
  margin-top: 25px;
`