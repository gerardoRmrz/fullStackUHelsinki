import { render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import NewBlogsForm from './NewBlogsForm'

const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Lou N. Atick',
      url: 'http://www.some.place.com',
      likes: 2,
      name: 'GRR'
  }

describe( 'Render blog', () => {

  test( 'title and author', () => {

    render( <Blog blog={blog} /> )

    const element = screen.getByText( `${blog.title} ${blog.author}` )

   // screen.debug(element)

    expect(element).toBeDefined()
  })

  test('not url', () => { 
    render(<Blog blog={blog} />)

    const element = screen.queryByText(`${blog.url}`)
    //screen.debug(element)

    expect(element).toBeNull()
  })

  test('not likes', () => { 
    render(<Blog blog={blog} />)

    const element = screen.queryByText(`${blog.likes}`)
    //screen.debug(element)

    expect(element).toBeNull()
  })


})


/* 5.14: Pruebas de Listas de Blogs, paso 2
Realiza una prueba que verifique que la URL del blog y el número de likes se muestran cuando 
se hace clic en el botón que controla los detalles mostrados.
 */

describe( 'Se verifica que la url y el número de likes se muestran cuando se hace clic en el botón correspondiente', () => {

  test('Si se presiona el botón view, se muestran la url', async ()=> {

    render(
      <Blog blog={blog}/>
    )

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const element = screen.queryByText(`${blog.url}`)
    //screen.debug(element)
    expect(element).toBeDefined()
  })

  test('Si se presiona el botón view, se muestran los likes', async ()=> {
  const mockHandler = vi.fn()
  render(
    <Blog blog={blog} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const element = screen.queryByText(`${blog.likes}`)
  //screen.debug(element)
  expect(element).toBeDefined()

})
 //*************************** */     
} )


describe( 'Realiza una prueba que garantice que si se hace clic dos veces en el botón like se llama dos veces al controlador de eventos que el componente recibió como props'
  , () => {
 
  test('Si se se hace clic dos veces en el botón like se llama dos veces al controlador de eventos', async () => {

    const mockHandler = vi.fn()

    render(
      <Blog blog={blog} likesHandler={mockHandler}/>
    )

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)
    
    const likesButton = screen.getByText('like')
    screen.debug(likesButton)

    await user.click(likesButton)
    await user.click(likesButton)

    expect(mockHandler.mock.calls).toHaveLength(2)

  })
} )

test( `Verificar que el formulario llama al controlador de eventos que 
  recibió como props con los detalles correctos cuando se crea un nuevo blog`
  , async () => {

  const newBlog = {
    title: 'The Best JavaScript Blogs for Developers in 2025',  
    author: 'Matthew Warholak',
    url: 'https://draft.dev/learn/javascript-blogs'
  }

  const mockHandler = vi.fn()

  const { container } = render ( 
    <NewBlogsForm 
      newBlog={newBlog}
      handleSubmit={mockHandler}
    /> 
    )
  
  const user = userEvent.setup()
  
  const form = container.querySelector('#newBlogForm')
  const submitButton = container.querySelector('#newBlogSubmitButton')
  
  //screen.debug(submitButton)
  await user.click(submitButton)
  
  const titleInput = container.querySelector('#blog-title')
  const authorInput = container.querySelector('#blog-author')
  const urlInput = container.querySelector('#blog-url')

  screen.debug(titleInput)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(titleInput.value).toBe(newBlog.title)
  expect(authorInput.value).toBe(newBlog.author)
  expect(urlInput.value).toBe(newBlog.url)
  

} )