import { render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

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

    screen.debug(element)

    expect(element).toBeDefined()
  })

  test('not url', () => { 
    render(<Blog blog={blog} />)

    const element = screen.queryByText(`${blog.url}`)
    screen.debug(element)

    expect(element).toBeNull()
  })

  test('not likes', () => { 
    render(<Blog blog={blog} />)

    const element = screen.queryByText(`${blog.likes}`)
    screen.debug(element)

    expect(element).toBeNull()
  })


})


/* 5.14: Pruebas de Listas de Blogs, paso 2
Realiza una prueba que verifique que la URL del blog y el número de likes se muestran cuando 
se hace clic en el botón que controla los detalles mostrados.
 */

describe( 'Se verifica que la url y el número de likes se muestran cuando se hace clic en el botón correspondiente', () => {

  test('Si se presiona el botón view, se muestran la url', async ()=> {

    const mockHandler = vi.fn()

    render(
      <Blog blog={blog} viewButton={mockHandler}/>
    )

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const element = screen.queryByText(`${blog.url}`)
    screen.debug(element)
    expect(element).toBeDefined()
  })
} )

test('Si se presiona el botón view, se muestran los likes', async ()=> {
  const mockHandler = vi.fn()
  render(
    <Blog blog={blog} viewButton={mockHandler} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const element = screen.queryByText(`${blog.likes}`)
  screen.debug(element)
  expect(element).toBeDefined()

})


/* test( 'render content 2', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Lou N. Atick',
    url: 'http://www.some.place.com'
  }

  const { container } = render( <Blog blog={blog} /> )

  const div = container.querySelector('.blog')

  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
}) */